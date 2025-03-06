import React from "react";
import { View, Text, Image } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { MotiView } from 'moti';
import CustomButton from "@/components/CustomButton";
import images from "@/constants/images";
import { Link, Redirect } from "expo-router";

export default function LandingScreen() {
  return (

    
    <>
    <Link href='/('
      <View className="flex-1 bg-background items-center justify-center px-6">
       <View>
        <Text className="text-2xl font-lbold text-green-700">
          FarmNation
        </Text>
       </View>

        <MotiView 
          from={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
        >
          <View className="rounded-full p-3">
          <Image
            source={images.logo} 
            className="w-64 h-64 mb-6 rounded-full"
            resizeMode="cover"
          />
          </View>
        </MotiView>
        
        <Text className="text-3xl font-lbold text-center text-green-700">
          Empowering Farmers, Connecting Markets
        </Text>
        
        <Text className="text-center font-llight text-gray-600 mt-3">
          Sell directly, get fair prices, and access real-time market insights.
        </Text>

        {/* CTA Button */}
        <CustomButton
          title="Sign up now"
          handlePress={() => {}}
          isLoading={false}
          containerStyle='w-full mt-6'
          textStyles='text-lg'
        />
      </View>
      <StatusBar />
    </>
  );
}
