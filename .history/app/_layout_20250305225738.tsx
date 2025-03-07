import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { StatusBar } from 'expo-status-bar';
import '../global.css'

export default function LandingScreen() {
  return (
    <>
    <View className="flex-1 bg-black-00 items-center justify-center px-6">
      {/* Hero Section */}
      <Image
        source={require("../assets/images/react-logo.png")} // Replace with your image
        className="w-64 h-64 mb-6"
        resizeMode="contain"
      />
      
      <Text className="text-3xl font-bold text-center text-green-700">
        Empowering Farmers, Connecting Markets
      </Text>
      
      <Text className="text-center text-gray-600 mt-3">
        Sell directly, get fair prices, and access real-time market insights.
      </Text>

      {/* CTA Button */}
      <TouchableOpacity className="mt-6 bg-green-600 py-3 px-6 rounded-lg">
        <Text className="text-white font-bold text-lg">Get Started</Text>
      </TouchableOpacity>
    </View>
    <StatusBar/>
    </>
  );
}
