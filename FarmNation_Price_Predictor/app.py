from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from tensorflow.keras.models import load_model
from sklearn.preprocessing import MinMaxScaler, LabelEncoder

app = Flask(__name__)

print("Starting Flask app...")

model = load_model('lstm_price_predictor.keras')
scaler = MinMaxScaler()
le_commodity = LabelEncoder()
le_district = LabelEncoder()
le_category = LabelEncoder()

data = pd.read_csv('Finals.csv')
data = data.dropna()
print(f"Loaded data rows: {len(data)}")
print(f"Districts: {data['District'].unique()}")
print(f"Commodities: {data['Commodity'].unique()}")
data['Commodity'] = le_commodity.fit_transform(data['Commodity'])
data['District'] = le_district.fit_transform(data['District'])
data['Category'] = le_category.fit_transform(data['Category'])
scaler.fit(data[['Arrivals', 'Minimum Prices', 'Maximum Prices']])

features = ['Commodity', 'Arrivals', 'Minimum Prices', 'Maximum Prices', 'District', 'Category']
seq_length = 3


@app.route('/options', methods=['GET'])
def get_options():
    print("Entering /options endpoint")
    try:
        # Simplified: Just return districts without commodities
        options = {"districts": list(le_district.classes_)}
        print("Returning simplified options:", options)
        return jsonify(options)
    except Exception as e:
        print(f"Error in /options: {str(e)}")
        return jsonify({'error': str(e)}), 500


@app.route('/predict', methods=['POST'])
def predict_price():
    print("Entering /predict endpoint")
    try:
        req_data = request.get_json()
        commodity = req_data['commodity']
        district = req_data['district']

        if commodity not in le_commodity.classes_:
            return jsonify({'error': f'Unknown commodity: {commodity}'}), 400
        if district not in le_district.classes_:
            return jsonify({'error': f'Unknown district: {district}'}), 400

        filtered_data = data[(data['Commodity'] == le_commodity.transform([commodity])[0]) &
                             (data['District'] == le_district.transform([district])[0])].tail(seq_length)

        if len(filtered_data) < 1:
            return jsonify({'error': f'No data found for {commodity} in {district}'}), 400

        input_data = filtered_data[features].values
        input_data[:, [1, 2, 3]] = scaler.transform(input_data[:, [1, 2, 3]])

        model_seq_length = 7
        if len(input_data) < model_seq_length:
            padding = np.zeros((model_seq_length - len(input_data), len(features)))
            last_row = input_data[-1]
            padding[:] = last_row
            input_data = np.vstack((input_data, padding))

        input_sequence = np.expand_dims(input_data, axis=0)
        pred = model.predict(input_sequence)
        pred_rescaled = scaler.inverse_transform(np.concatenate((np.zeros((1, 2)), pred), axis=1))[:, -1][0]

        adjusted_pred = pred_rescaled * 0.62

        return jsonify({
            'commodity': commodity,
            'district': district,
            'predicted_price': round(adjusted_pred, 2),
            'date': '2025-02-10'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)