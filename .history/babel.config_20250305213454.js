export default function (api) {
    api.cache(true);
    return {
      presets: [
        ["babel-preset-expo", { jsxImportSource: "nativewind" }],
        "nativewind/babel",
      ],
      plugins: [
        "react-native-reanimated/plugin", // 👈 Must be at the END
      ],
    };
  };