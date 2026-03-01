import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

# Define paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, '../cleanedForTree_cardio.csv')
MODEL_PATH = os.path.join(BASE_DIR, 'model.pkl')

def train():
    print("Loading data...")
    if not os.path.exists(DATA_PATH):
        print(f"Error: Data file not found at {DATA_PATH}")
        return

    df = pd.read_csv(DATA_PATH)
    
    # Feature columns based on analysis of notebooks
    # The columns in cleanedForTree_cardio.csv are:
    # age, gender, ap_hi, ap_lo, cholesterol, gluc, smoke, alco, active, cardio, bmi
    
    X = df.drop('cardio', axis=1)
    y = df['cardio']
    
    print(f"Features: {list(X.columns)}")
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
    
    # Train model
    print("Training Random Forest model...")
    rf = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42)
    rf.fit(X_train, y_train)
    
    # Evaluate
    train_score = rf.score(X_train, y_train)
    test_score = rf.score(X_test, y_test)
    print(f"Train Accuracy: {train_score:.4f}")
    print(f"Test Accuracy: {test_score:.4f}")
    
    # Save model
    print(f"Saving model to {MODEL_PATH}...")
    joblib.dump(rf, MODEL_PATH)
    print("Done.")

if __name__ == '__main__':
    train()
