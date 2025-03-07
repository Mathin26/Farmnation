import { View, Text, FlatList, RefreshControl, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import ProductCard from "@/components/ProductCard";
import images from "@/constants/images"; // Ensure this contains your local image imports

// Mock Data for Market Prices & Products
const marketPrices = [
  { id: "1", crop: "Wheat", price: "₹2100/quintal" },
  { id: "2", crop: "Rice", price: "₹2900/quintal" },
  { id: "3", crop: "Corn", price: "₹1750/quintal" },
  { id: "4", crop: "Barley", price: "₹1850/quintal" },
  { id: "5", crop: "Soybean", price: "₹3200/quintal" },
];

const productListings = [
  {
    id: "101",
    title: "Organic Tomatoes",
    description: "Fresh organic tomatoes from Green Fields Farms",
    price: "₹35/kg",
    originalPrice: "₹40/kg",
    image:{},
    seller: "Green Fields Farms",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: "102",
    title: "Fresh Potatoes",
    description: "High-quality fresh potatoes from Sunrise Agro",
    price: "₹28/kg",
    originalPrice: "₹32/kg",
    image: '/assets/images/potato.webp', // Using imported images
    seller: "Sunrise Agro",
    rating: 4.2,
    reviews: 95,
  },
  {
    id: "103",
    title: "Organic Carrots",
    description: "Delicious organic carrots from Farm Fresh Produce",
    price: "₹50/kg",
    originalPrice: "₹55/kg",
    image: '/assets/images/carrot.jpg', // Using imported images
    seller: "Farm Fresh Produce",
    rating: 4.7,
    reviews: 150,
  },
  {
    id: "104",
    title: "Premium Onions",
    description: "Top-quality premium onions from Golden Harvest",
    price: "₹42/kg",
    originalPrice: "₹45/kg",
    image: '/assets/images/onions.jpeg', // Using imported images
    seller: "Golden Harvest",
    rating: 4.3,
    reviews: 110,
  },
];

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000); // Simulating data fetch delay
  };

  return (
    <SafeAreaView className="bg-background h-full px-4">
     <FlatList
  data={productListings}
  keyExtractor={(item) => item.id}
  key={`flatlist-${2}`} // Ensures a fresh render when numColumns changes
  renderItem={({ item }) => <ProductCard product={item} />}
  numColumns={2} // Display products in 2 columns
  columnWrapperStyle={{ gap: 16 }} // Add gap between columns
  contentContainerStyle={{ gap: 16 }} // Add gap between rows
  ListHeaderComponent={() => (
    <View className="my-6 space-y-6">
      <Text className="text-2xl font-lbold text-primary">Welcome to FarmNation</Text>
      <SearchInput initialQuery="" />

      {/* Market Prices Section */}
      <View className="bg-primary-200 p-4 mt-4 rounded-xl">
        <Text className="text-lg text-white font-semibold mb-2">Market Prices</Text>
        {marketPrices.map((item) => (
          <View key={item.id} className="flex-row justify-between py-1">
            <Text className="text-white">{item.crop}</Text>
            <Text className="text-yellow-400">{item.price}</Text>
          </View>
        ))}
      </View>
    </View>
  )}
  ListEmptyComponent={() => (
    <EmptyState title="No Products Available" subtitle="Wanna see some Analytics about the Commodities price" />
  )}
  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
/>

    </SafeAreaView>
  );
};

export default Home;
