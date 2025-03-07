<<<<<<< HEAD
# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).


Mobile App for Direct Market Access for Farmers

Objective

The idea addresses the problem of middlemen exploitation and market inefficiencies in the agricultural supply chain. Farmers often struggle to get fair prices for their produce due to multiple intermediaries, lack of price transparency, and limited direct access to buyers.

Target Audience:

Small and medium-scale farmers

Farmer Producer Organizations (FPOs)

Wholesale buyers, retailers, exporters

Government agencies and NGOs supporting agriculture


Concept and Approach

The app acts as a direct marketplace connecting farmers with buyers, eliminating intermediaries and ensuring fair pricing, transparency, and efficiency in transactions.

How It Works:

1. Farmer Registration: Farmers sign up, verify their identity (Aadhaar-based or FPO validation), and list their produce with price, quantity, and availability.


2. Real-Time Market Prices: Farmers receive live updates on commodity prices from APMCs, government sources, and buyer demand analytics to make informed pricing decisions.


3. AI-Driven Price Prediction: AI-powered recommendations help farmers set optimal prices based on historical trends and demand forecasting.


4. Buyer Connection & Bidding: Verified buyers (retailers, wholesalers, exporters) can either place direct orders or bid on produce.


5. Logistics & Payment Integration:

Farmers can choose logistics partners or self-deliver.

UPI, digital wallets, and escrow-based payments ensure secure transactions.



6. Quality Assurance & Grading: AI-based image processing can assess produce quality using mobile cameras.


7. Government & Subsidy Integration: Farmers can apply for subsidies, schemes, and grants directly from the platform.


8. Language & Voice Support: The app supports multiple Indian languages and voice-to-text features to ensure accessibility.



Impact

Fair Pricing & Income Growth: Farmers get better prices by bypassing middlemen.

Market Efficiency: Direct sales reduce post-harvest losses and transaction delays.

Financial Inclusion: Digital payments ensure timely earnings and reduce cash dependency.

Data-Driven Decision Making: Farmers make informed choices based on AI-driven insights.

Sustainability & Food Security: Reducing wastage and improving supply chain efficiency benefits overall food security.


Feasibility & Implementation

Resources Needed:

Technical Team: Mobile developers, AI/ML engineers, blockchain developers (for secure transactions).

Agriculture Experts: To guide farmers on best practices and market trends.

Government & NGO Collaboration: For farmer outreach and subsidy integration.

Logistics & Payment Partners: To facilitate seamless supply chain operations.


Implementation Phases:

1. MVP Development: Core marketplace, farmer onboarding, and price tracking.


2. Pilot Program: Implement in select agricultural hubs, refine based on feedback.


3. Scaling: Expand to multiple regions, add AI-driven insights, logistics, and financing features.



Tech Stack

Frontend: React Native (for cross-platform mobile development)

Backend: Node.js with Express.js

Database: PostgreSQL / Firebase for real-time updates

AI/ML: Python (TensorFlow/PyTorch) for price prediction and quality analysis

Blockchain: Smart contracts for transparent payments (optional)

Cloud: AWS/GCP for scalability

Payment Integration: UPI, Razorpay, Paytm, or government-backed payment systems


Sustainability & Growth

Farmer Education & Training: Workshops and tutorials for digital literacy.

Partnerships: Collaborate with AgriTech startups, logistics providers, and financial institutions.

Subscription & Transaction Fees: Generate revenue through premium features, transaction fees, and partnerships with large-scale buyers.

Expansion: Integrate IoT sensors for crop monitoring and blockchain for traceability.


Differentiation

AI-Driven Pricing & Quality Analysis: Unlike existing platforms, it provides real-time pricing insights and AI-powered quality assessment.

Multi-Language & Voice Support: Enhances accessibility for non-tech-savvy farmers.

Secure, Transparent Payments: Uses escrow-based and blockchain transactions for reliability.

Government & Subsidy Integration: Direct access to government schemes and benefits.


This app empowers farmers with direct market access, financial security, and data-driven decision-making, revolutionizing India’s agricultural landscape.
=======
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
>>>>>>> 2d775a1b697ce08904c5d74ea744345ddd05549f
