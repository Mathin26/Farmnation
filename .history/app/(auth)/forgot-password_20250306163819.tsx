import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { sendPasswordReset } from "@/lib/appwrite";
import { Stack } from "expo-router"; // Import the function

export default function ForgotPasswordScreen() {
    
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }

    try {
      await sendPasswordReset(email);
      Alert.alert("Success", "Password reset link sent to your email.");
      router.push("/sign-in"); // Redirect to sign-in after sending email
    } catch (error) {
      Alert.alert("Error", "Failed to send reset link. Please try again.");
      console.error("Reset Password Error:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background px-6 pt-10">
      <View className="flex-1 justify-center">
        <Text className="text-2xl font-bold text-center text-green-700">
          Forgot Password
        </Text>

        {/* Email Input */}
        <TextInput
          className="border p-3 rounded mt-6"
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-green-700 p-3 rounded mt-4"
          onPress={handleResetPassword}
        >
          <Text className="text-white text-center font-bold">
            Reset Password
          </Text>
        </TouchableOpacity>

        {/* Back to Sign In */}
        <TouchableOpacity onPress={() => router.push("/sign-in")} className="mt-4">
          <Text className="text-green-700 text-center font-bold">
            Back to Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
