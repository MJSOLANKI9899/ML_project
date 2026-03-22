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

@app.route('/', methods=['GET'])
def home():
    return jsonify({"status": "Cardio Disease Prediction API is running!"})

@app.route('/predict', methods=['POST'])
def predict():

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
        
        # 3. Compute Engineered Flags
        ap_hi = int(data['ap_hi'])
        ap_lo = int(data['ap_lo'])
        cholesterol = int(data['cholesterol'])
        smoke = int(data['smoke'])
        active = int(data['active'])

        is_high_bp = 1 if (ap_hi >= 140 or ap_lo >= 90) else 0
        is_high_cholesterol = 1 if (cholesterol >= 2) else 0
        is_high_risk_lifestyle = 1 if (smoke == 1 and active == 0) else 0
        critical_risk_profile = 1 if (is_high_bp == 1 and smoke == 1 and is_high_cholesterol == 1 and active == 0) else 0
        
        # Feature vector construction
        # Order: ['age', 'gender', 'ap_hi', 'ap_lo', 'cholesterol', 'gluc', 'smoke', 'alco', 'active', 'bmi', 'is_high_bp', 'is_high_cholesterol', 'is_high_risk_lifestyle', 'critical_risk_profile']
        
        features = pd.DataFrame([{
            'age': int(data['age']),
            'gender': int(data['gender']),
            'ap_hi': ap_hi,
            'ap_lo': ap_lo,
            'cholesterol': cholesterol,
            'gluc': int(data['gluc']),
            'smoke': smoke,
            'alco': int(data['alco']),
            'active': active,
            'bmi': bmi,
            'is_high_bp': is_high_bp,
            'is_high_cholesterol': is_high_cholesterol,
            'is_high_risk_lifestyle': is_high_risk_lifestyle,
            'critical_risk_profile': critical_risk_profile
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
