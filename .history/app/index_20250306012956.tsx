import React from "react";
import { View, Text, Image } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { MotiView } from 'moti';
import CustomButton from "@/components/CustomButton";
import images from "@/constants/images";

export default function LandingScreen() {
  return (
    <>
      <View className="flex-1 bg-background items-center justify-center px-6">
        {/* Hero Section with Animation */}
        <MotiView 
          from={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
        >
          <Image
            source={images.logo} 
            className="w-64 h-64 mb-6"
            resizeMode="contain"
          />
        </MotiView>
        
        <Text className="text-3xl font-lbold text-center text-green-700">
          Empowering Farmers, Connecting Markets
        </Text>
        
        <Text className="text-center text-gray-600 mt-3">
          Sell directly, get fair prices, and access real-time market insights.
        </Text>

        {/* CTA Button */}
        <CustomButton
          title="Sign up now"
          handlePress={() => {}}
          isLoading={false}
          containerStyle=''
        />
      </View>
      <StatusBar />
    </>
  );
}
