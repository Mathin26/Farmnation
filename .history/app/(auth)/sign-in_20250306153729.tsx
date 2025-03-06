import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { router } from "expo-router";
import images from "@/constants/images";
import { signIn } from "@/lib/appwrite";

const signInSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["farmer", "consumer"]),
});

export default function SignInScreen() {
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: { email:"", password:"" role: "consumer" },
  });

  const role = watch("role");

  interface SignInFormData {
    email: string;
    password: string;
    role: "farmer" | "consumer";
  }

  const onSubmit = async (data: SignInFormData) => {
    try{
       await signIn(data.email, data.password);
       Alert.alert("Success", "You have successfully signed in");
        router.push(`/${data.role}/dashboard`);
       
    }catch(error){
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background px-6 pt-10">
      <ScrollView 
        contentContainerStyle={{ justifyContent: 'center', alignContent: 'center', flexGrow: 1 }}
      >
        <View className="items-center justify-center p-3">
          <Image
            source={images.logo} 
            className="w-48 h-48 rounded-full"
            resizeMode="contain"
          />
        </View>

        <Text className="text-2xl font-bold text-center text-green-700">Sign In</Text>

        {/* Email Field */}
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextInput {...field} placeholder="Email" className="border p-3 rounded mt-4" keyboardType="email-address" />
          )}
        />
        {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}

        {/* Password Field */}
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextInput {...field} placeholder="Password" className="border p-3 rounded mt-4" secureTextEntry />
          )}
        />
        {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}

        {/* Role Selection */}
        <Text className="mt-4 font-semibold">Select Role</Text>
        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <View className="flex-row mt-2">
              <TouchableOpacity onPress={() => field.onChange("consumer")} className={`p-3 border rounded ${field.value === "consumer" ? "bg-green-500" : "bg-gray-200"}`}>
                <Text>Consumer</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => field.onChange("farmer")} className={`ml-2 p-3 border rounded ${field.value === "farmer" ? "bg-green-500" : "bg-gray-200"}`}>
                <Text>Farmer</Text>
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
