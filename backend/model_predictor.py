# model_predictor.py

import numpy as np
import joblib  # or pickle
# Load your trained model
model = joblib.load("FinalMinor.pkl")  # load the saved model

def predict(features):
    input_array = np.asarray(features).reshape(1, -1)
    prediction = model.predict(input_array)
    return prediction[0]
