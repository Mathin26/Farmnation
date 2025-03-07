import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { router } from "expo-router";
import { createUser } from "@/lib/appwrite";
import images from "@/constants/images";
import CustomButton from "@/components/CustomButton";
import { MaterialIcons } from "@expo/vector-icons";

const signUpSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["farmer", "consumer"]),
  farmerId: z.string().optional(),
  location: z.string().optional(),
});

export default function SignUpScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "", role: "consumer", farmerId: "", location: "" },
  });

  const role = watch("role");

  interface SignUpFormData {
    name: string;
    email: string;
    password: string;
    role: "farmer" | "consumer";
    farmerId?: string;
    location?: string;
  }

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const user = await createUser(data);
      console.log("User Created Successfully", user);
      Alert.alert("User Created Successfully", `Welcome ${data.name}!`);
      router.push("/(tabs)/home");
    } catch (e) {
      console.error("Error Creating User", e);
      const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred";
      Alert.alert("Error Creating User", errorMessage);
    }
  };

  return (
    <ScrollView 
      contentContainerStyle={{ justifyContent: 'center', alignContent: 'center', flex: 1 }}
      className="flex-1 bg-background px-6 pt-10"
    >
      <View className="rounded-full items-center justify-center p-3">
        <Image source={images.logo} className="w-64 h-64 rounded-full" resizeMode="contain" />
      </View>

      <Text className="text-2xl font-lbold text-center text-green-700">Sign Up</Text>

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput placeholder="Name" onBlur={onBlur} onChangeText={onChange} value={value} className="border p-3 rounded mt-4" />
        )}
      />
      {errors.name && <Text className="text-red-500">{errors.name.message}</Text>}

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput placeholder="Email" onBlur={onBlur} onChangeText={onChange} value={value} className="border p-3 rounded mt-4" keyboardType="email-address" />
        )}
      />
      {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput placeholder="Password" onBlur={onBlur} onChangeText={onChange} value={value} className="border p-3 rounded mt-4" secureTextEntry />
          <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-7"
            >
              <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={24} color="gray" />
            </TouchableOpacity>
        )}
      />
      {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}

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

      {role === "farmer" && (
        <View>
          <Controller
            control={control}
            name="farmerId"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput placeholder="Farmer ID (Govt. Issued)" onBlur={onBlur} onChangeText={onChange} value={value} className="border p-3 rounded mt-4" />
            )}
          />
          {errors.farmerId && <Text className="text-red-500">{errors.farmerId.message}</Text>}

          <Controller
            control={control}
            name="location"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput placeholder="Farm Location" onBlur={onBlur} onChangeText={onChange} value={value} className="border p-3 rounded mt-4" />
            )}
          />
          {errors.location && <Text className="text-red-500">{errors.location.message}</Text>}
        </View>
      )}

      <CustomButton title="Sign Up" handlePress={handleSubmit(onSubmit)} isLoading={false} containerStyle='w-full mt-6' />

      <TouchableOpacity onPress={() => router.push("/sign-in")} className="mt-4">
        <Text className="text-green-700 text-center font-bold">Already a user? Sign In</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
