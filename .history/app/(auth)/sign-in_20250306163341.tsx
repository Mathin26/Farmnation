import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { router } from "expo-router";
import images from "@/constants/images";
import { signIn } from "@/lib/appwrite";
import { account } from "@/lib/appwrite";
import { Ionicons } from "@expo/vector-icons"; // Import icons for password visibility

// ✅ Define Schema for Validation
const signInSchema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["farmer", "consumer"]),
});

export default function SignInScreen() {
 const { control, handleSubmit, watch, formState: { errors } } = useForm<SignInFormData>({
     resolver: zodResolver(signInSchema),
     defaultValues: { email: "", password: "", role: "consumer" },
   });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const role = watch("role");

  interface SignInFormData {
    email: string;
    password: string;
    role: "farmer" | "consumer";
  }

  const onSubmit = async (data: SignInFormData) => {
    try {
      await account.deleteSession("current"); // Log out the current session
    } catch (error) {
      console.log("No active session found, proceeding with sign-in...");
    }
  
    try {
      await signIn(data.email, data.password);
      Alert.alert("Success", "You have successfully signed in");
      router.push('/(tabs)/home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background px-6 pt-10">
      <ScrollView contentContainerStyle={{ justifyContent: "center", alignContent: "center", flexGrow: 1 }}>
        <View className="items-center justify-center p-3">
          <Image source={images.logo} className="w-48 h-48 rounded-full" resizeMode="contain" />
        </View>

        <Text className="text-2xl font-bold text-center text-green-700">Sign In</Text>

        {/* Email Field */}
        <View className="mt-4">
          <Text className="font-semibold">Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Enter email"
                className="border p-3 rounded mt-2"
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}
        </View>

        {/* Password Field */}
        <View className="mt-2">
          <Text className="font-semibold">Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="flex-row items-center border p-3 rounded mt-2">
                <TextInput
                  placeholder="Enter password"
                  className="flex-1"
                  secureTextEntry={!passwordVisible}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                  <Ionicons name={passwordVisible ? "eye" : "eye-off"} size={20} color="gray" />
                </TouchableOpacity>
              </View>
            )}
          />
          {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}
        </View>

        {/* Role Selection */}
        <Text className="mt-4 font-semibold">Select Role</Text>
        <Controller
          control={control}
          name="role"
          render={({ field: { onChange, value } }) => (
            <View className="flex-row mt-2">
              <TouchableOpacity
                onPress={() => onChange("consumer")}
                className={`p-3 border rounded ${value === "consumer" ? "bg-green-500" : "bg-gray-200"}`}
              >
                <Text className={value === "consumer" ? "text-white" : "text-black"}>Consumer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onChange("farmer")}
                className={`ml-2 p-3 border rounded ${value === "farmer" ? "bg-green-500" : "bg-gray-200"}`}
              >
                <Text className={value === "farmer" ? "text-white" : "text-black"}>Farmer</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        {/* Sign In Button */}
        <TouchableOpacity onPress={handleSubmit(onSubmit)} className="bg-green-700 p-3 rounded mt-6">
          <Text className="text-white text-center font-bold">Sign In</Text>
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity onPress={() => router.push("/forgot-password")} className="mt-4">
          <Text className="text-gray-500 text-center">Forgot Password?</Text>
        </TouchableOpacity>

        {/* Sign Up Link for New Users */}
        <TouchableOpacity onPress={() => router.push("/sign-up")} className="mt-2">
          <Text className="text-green-700 text-center font-bold">New user? Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
