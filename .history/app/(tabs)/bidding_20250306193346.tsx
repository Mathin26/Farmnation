import { LineChart } from "react-native-chart-kit";
import { View, Text, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";

// Sample data (replace this with your actual data)
const data = [
  {
    Commodity: "Wheat",
    MinimumPrices: 120,
    MaximumPrices: 150,
    ModalPrices: 130,
    Date: "2024-01-01",
  },
  {
    Commodity: "Wheat",
    MinimumPrices: 115,
    MaximumPrices: 140,
    ModalPrices: 125,
    Date: "2024-02-01",
  },
  {
    Commodity: "Wheat",
    MinimumPrices: 110,
    MaximumPrices: 135,
    ModalPrices: 120,
    Date: "2024-03-01",
  },
  // Add more data here
];

const { width } = Dimensions.get("window");

const PriceChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Prepare the data
    const labels = [];
    const minPrices = [];
    const maxPrices = [];
    const modalPrices = [];

    data.forEach((entry) => {
      labels.push(entry.Date.substring(0, 7)); // Using year-month for simplicity
      minPrices.push(entry.MinimumPrices);
      maxPrices.push(entry.MaximumPrices);
      modalPrices.push(entry.ModalPrices);
    });

    setChartData({
      labels,
      datasets: [
        {
          data: minPrices,
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          strokeWidth: 2,
        },
        {
          data: maxPrices,
          color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
          strokeWidth: 2,
        },
        {
          data: modalPrices,
          color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    });
  }, []);

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Commodity Price Trends
      </Text>

      {chartData && (
        <LineChart
          data={chartData}
          width={width - 20} // Screen width minus padding
          height={220}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffdd00",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}
    </View>
  );
};

export default PriceChart;
