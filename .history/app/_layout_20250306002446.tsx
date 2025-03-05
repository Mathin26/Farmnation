import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { StatusBar } from 'expo-status-bar';
import '../global.css'
import CustomButton from "@/components/CustomButton";


export default function LandingScreen() {
  return (
    <>
    <View className="flex-1 bg-background items-center justify-center px-6">
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
      <CustomButton
      title="Sign up now"
      handlePress={()=>{}}
      isLoading={false}
      
      />
      
    </View>
    <StatusBar/>
    </>
  );
}
