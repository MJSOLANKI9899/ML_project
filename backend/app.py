from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load model
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'model.pkl')

if os.path.exists(MODEL_PATH):
    model = joblib.load(MODEL_PATH)
    print("Model loaded successfully.")
else:
    print("Error: Model file not found.")
    model = None

@app.route('/predict', methods=['POST'])
def predict():
    if not model:
        return jsonify({'error': 'Model not loaded'}), 500

    try:
        data = request.get_json()
        
        # Expected features:
        # age (years), gender (1: women, 2: men), height (cm), weight (kg), 
        # ap_hi, ap_lo, cholesterol (1, 2, 3), gluc (1, 2, 3), 
        # smoke (0/1), alco (0/1), active (0/1)
        
        # Preprocessing
        # 1. Age is already in years from frontend.
        # 2. BMI calculation
        height = float(data['height'])
        weight = float(data['weight'])
        
        height_m = height / 100
        bmi = weight / (height_m ** 2)
        
        # Feature vector construction
        # Order: ['age', 'gender', 'ap_hi', 'ap_lo', 'cholesterol', 'gluc', 'smoke', 'alco', 'active', 'bmi']
        
        features = pd.DataFrame([{
            'age': int(data['age']),
            'gender': int(data['gender']),
            'ap_hi': int(data['ap_hi']),
            'ap_lo': int(data['ap_lo']),
            'cholesterol': int(data['cholesterol']),
            'gluc': int(data['gluc']),
            'smoke': int(data['smoke']),
            'alco': int(data['alco']),
            'active': int(data['active']),
            'bmi': bmi
        }])
        
        prediction = model.predict(features)[0]
        probability = model.predict_proba(features)[0][1] # Probability of class 1 (Cardio Disease)
        
        return jsonify({
            'prediction': int(prediction),
            'probability': float(probability)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
