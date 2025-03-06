# Farmnation
Project for Hacknight25
Conducted on March 5-6 2025

# FarmNation Price Predictor

A hackathon project to predict commodity prices for Feb 10, 2025, using an LSTM model.

## Overview
- **Backend**: Flask API (`app.py`) predicts prices based on 9 days of data (Feb 1–Feb 9) from `Finals.csv`.
- **Model**: LSTM trained in `FinalModel.ipynb`, saved as `lstm_price_predictor.keras`.
- **Frontend**: React Native app (not included here) connects to the API for user-friendly price predictions.

## Files
- `app.py`: Flask API with `/options` (district-commodity pairs) and `/predict` (price prediction).
- `Finals.csv`: Dataset with 377 rows of commodity data across 12 districts.
- `lstm_price_predictor.keras`: Pre-trained LSTM model.
- `FinalModel.ipynb`: Jupyter notebook for model training.

## Setup
1. **Install Dependencies**:
   ```bash
   pip install flask tensorflow pandas numpy scikit-learn

2. Run Flask:
  Place all files in the same directory.
  python app.py
  API runs at http://localhost:5000 or http://<your-ip>:5000 (e.g., 172.16.45.234).

Test with Postman:
  GET http://localhost:5000/options: Lists districts and commodities.
  POST http://localhost:5000/predict: Send {"commodity": "Tomato", "district": "Vaniyampadi"}, expect ~2500 Rs/Quintal.
  
Integration
  Frontend (React Native) fetches /options for dropdowns and /predict for prices—see team’s repo for JS code.

*Notes
Adjust adjusted_pred scaling (0.62) in app.py to match real Feb 10 data.
(Since more data has to be collected and preprocessed for better results)
The dataset was manually collected from agramarket website.
Expand Finals.csv for more districts/commodities as needed.
