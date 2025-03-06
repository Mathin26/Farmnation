import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Star } from "lucide-react-native";
import { router } from "expo-router";

interface Product {
  id: string;
  image: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  discount?: boolean;
  rating: number;
  reviews: number;
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <View className="flex-1 bg-white p-3 rounded-xl shadow-sm border border-secondary-200 m-1">
      <Image
        source={{ uri: product.image }}
        className="w-full h-32 rounded-lg mb-2"
        resizeMode="contain"
      />
      <Text className="text-black-100 font-lbold text-sm" numberOfLines={2}>
        {product.title}
      </Text>
      <Text className="text-black-200 text-xs mt-1" numberOfLines={2}>
        {product.description}
      </Text>
      <View className="flex-row items-center mt-2">
        <Text className="text-primary-200 font-lbold text-lg">
          {product.price}
        </Text>
        {product.originalPrice && (
          <Text className="text-secondary-100 text-xs ml-2 line-through">
            {product.originalPrice}
          </Text>
        )}
      </View>
      <View className="flex-row items-center mt-1">
        <Star size={14} color="#FFA001" fill="#FFA001" />
        <Text className="text-black-100 text-xs ml-1">
          {product.rating} ({product.reviews} reviews)
        </Text>
      </View>
      <TouchableOpacity 
      onPress={() =>{ alert("Added to Cart")
        router.push('/app/(tabs)/cart' as any)
      }}
      className="bg-primary-200 p-2 rounded-lg mt-3">
        <Text className="text-white text-center font-lbold text-sm">
          Add to Cart
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;