import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// Replace with your friend's IP from their Flask console
const API_URL = 'http://172.16.45.234:5000';  

export default function App() {
  const [district, setDistrict] = useState<string>('');
  const [commodity, setCommodity] = useState<string>('');
  const [price, setPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<Record<string, string[]>>({});

  useEffect(() => {
    fetch(`${API_URL}/options`)
      .then(response => response.json())
      .then(data => setOptions(data))
      .catch(err => setError('Failed to load options—check network or Flask'));
  }, []);

  const districtOptions = Object.keys(options).map(d => ({ key: d, value: d }));
  const commodityOptions = district
    ? (options[district] || []).map(c => ({ key: c, value: c }))
    : [];

  const fetchPrice = async () => {
    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commodity, district }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setPrice(null);
      } else {
        setPrice(data.predicted_price);
        setError(null);
      }
    } catch (err) {
      setError('Failed to fetch price—check network or Flask');
      setPrice(null);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="flex-1 justify-center p-5" style={{ paddingTop: Constants.statusBarHeight }}>
        <Text className="text-3xl font-bold text-center text-blue-600 mb-6">
          FarmNation Price Predictor
        </Text>

        <View className="mb-4">
          <Text className="text-lg font-semibold text-gray-700 mb-2">Select District</Text>
          <SelectList
            setSelected={setDistrict}
            data={districtOptions}
            placeholder="Choose a district"
            boxStyles={styles.box}
            dropdownStyles={styles.dropdown}
            search={true}
            notFoundText="District not found"
            onSelect={() => setCommodity('')}
          />
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold text-gray-700 mb-2">Select Commodity</Text>
          {district ? (
            <SelectList
              setSelected={setCommodity}
              data={commodityOptions}
              placeholder="Choose a commodity"
              boxStyles={styles.box}
              dropdownStyles={styles.dropdown}
              search={true}
              notFoundText="Commodity not found"
            />
          ) : (
            <View style={{ ...styles.box, opacity: 0.5 }}>
              <Text style={{ color: '#9ca3af' }}>Choose a district first</Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          className={`bg-blue-500 p-3 rounded-lg ${!district || !commodity ? 'opacity-50' : ''}`}
          onPress={fetchPrice}
          disabled={!district || !commodity}
        >
          <Text className="text-white text-center font-semibold text-lg">Get Feb 10 Price</Text>
        </TouchableOpacity>

        {price && (
          <Text className="text-xl text-green-600 mt-6 text-center">
            Predicted Price: ₹{price} (Feb 10, 2025)
          </Text>
        )}
        {error && (
          <Text className="text-lg text-red-500 mt-6 text-center">{error}</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db', // gray-300
    borderRadius: 8,
    padding: 12,
  },
  dropdown: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
  },
});