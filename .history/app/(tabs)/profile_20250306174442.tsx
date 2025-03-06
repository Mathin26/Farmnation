import React from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGlobalContext } from "@/context/GlobalProvider";
import { logout } from "@/lib/appwrite";
import { router } from "expo-router";

export default function ProfileScreen() {
  const { user, isLoading, setIsLogged, setUser } = useGlobalContext();
  

  const handleLogout = async () => {
    try {
      await logout();
      setIsLogged(false);
      setUser(null);
      router.push("/sign-in");
      Alert.alert("Logged out", "You have been successfully logged out.");
    } catch (error) {
      console.error("Logout Error:", error);
      Alert.alert("Error", "Something went wrong while logging out.");
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#4CAF50" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background px-6 pt-10">
      <View className="p-4 bg-white rounded-lg shadow-md">
        <Text className="text-2xl font-bold text-green-700">Profile</Text>

        {user ? (
          <>
            <Text className="text-lg mt-4"><Text className="font-semibold">Name:</Text> {user.name}</Text>
            <Text className="text-lg"><Text className="font-semibold">Email:</Text> {user.email}</Text>
            <Text className="text-lg"><Text className="font-semibold">Role:</Text> {user.role}</Text>

            {/* Navigate to Add Produce Page */}
            {user.role === "farmer" && (
              <TouchableOpacity 
                onPress={() => router.push('/addProduce')} 
                className="bg-green-700 p-3 rounded mt-6"
              >
                <Text className="text-white text-center font-bold">Add Produce</Text>
              </TouchableOpacity>
            )}

            {/* Logout Button */}
            <TouchableOpacity onPress={handleLogout} className="bg-red-500 p-3 rounded mt-6">
              <Text className="text-white text-center font-bold">Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text className="text-red-500 text-center mt-4">User not found</Text>
        )}
      </View>
    </SafeAreaView>
  );
}
