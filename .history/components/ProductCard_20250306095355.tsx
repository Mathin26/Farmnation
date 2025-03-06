import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Star } from "lucide-react-native";

interface Product {
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
    <View className="flex-1 flex-row bg-white p-4 rounded-2xl shadow-lg w-44 mx-2">
      <Image
        source={}
        className="w-full h-28 rounded-lg"
        resizeMode="contain"
      />
      <Text className="text-black-100 font-lbold mt-2" numberOfLines={2}>
        {product.title}
      </Text>
      <Text className="text-black-200 text-xs mt-1" numberOfLines={2}>
        {product.description}
      </Text>
      <View className="flex-row items-center mt-2">
        <Text className="text-primary-200 font-lbold text-lg">
          ₹{product.price}
        </Text>
        {product.discount && (
          <Text className="text-secondary-100 text-xs ml-2 line-through">
            ₹{product.originalPrice}
          </Text>
        )}
      </View>
      <View className="flex-row items-center mt-1">
        <Star size={14} color="#FFA001" />
        <Text className="text-black-100 text-xs ml-1">{product.rating} ({product.reviews} reviews)</Text>
      </View>
      <TouchableOpacity className="bg-primary-100 p-2 rounded-lg mt-3">
        <Text className="text-white text-center font-lbold">Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;
