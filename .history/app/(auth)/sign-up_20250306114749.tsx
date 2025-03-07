import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { router } from "expo-router";

const signUpSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["farmer", "consumer"]),
  farmerId: z.string().optional(),
  location: z.string().optional(),
});

export default function SignUpScreen() {
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: { role: "consumer" },
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

  const onSubmit = (data: SignUpFormData) => {
    console.log("User Data:", data);
    alert("Sign-Up Successful!");
    router.push("/sign-in");
  };

  return (
   
    <ScrollView 
    contentContainerStyle={{justifyContent:'center',flex:1}}
    className="flex-1 bg-background  px-6 pt-10">
      <
      <Text className="text-2xl font-bold text-center text-green-700">Sign Up</Text>
      
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextInput {...field} placeholder="Name" className="border p-3 rounded mt-4" />
        )}
      />
      {errors.name && <Text className="text-red-500">{errors.name.message}</Text>}

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextInput {...field} placeholder="Email" className="border p-3 rounded mt-4" keyboardType="email-address" />
        )}
      />
      {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <TextInput {...field} placeholder="Password" className="border p-3 rounded mt-4" secureTextEntry />
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
            render={({ field }) => (
              <TextInput {...field} placeholder="Farmer ID (Govt. Issued)" className="border p-3 rounded mt-4" />
            )}
          />
          {errors.farmerId && <Text className="text-red-500">{errors.farmerId.message}</Text>}

          <Controller
            control={control}
            name="location"
            render={({ field }) => (
              <TextInput {...field} placeholder="Farm Location" className="border p-3 rounded mt-4" />
            )}
          />
          {errors.location && <Text className="text-red-500">{errors.location.message}</Text>}
        </View>
      )}

      <TouchableOpacity onPress={handleSubmit(onSubmit)} className="bg-green-700 p-3 rounded mt-6">
        <Text className="text-white text-center font-bold">Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
    
  );
}
