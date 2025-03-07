/** @type {import('tailwindcss').Config} */
module.exports = {
 
 content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
   extend: {
  colors: {
    primary: {
      DEFAULT: "#2E7D32", // Deep Green (Main brand color)
      100: "#388E3C", // Lighter Green (Hover states, highlights)
      200: "#1B5E20", // Darker Green (Buttons, headers)
    },
    secondary: {
      DEFAULT: "#A5D6A7", // Soft Green (Background, subtle accents)
      100: "#C8E6C9",
      200: "#E8F5E9",
    },
    black: {
      DEFAULT: "#263238", // Charcoal Gray for text
      100: "#37474F",
      200: "#455A64",
    },
    gray: {
      100: "#F5F5F5", // Light Gray for backgrounds
      200: "#E0E0E0",
    },
  },
  fontFamily: {
    pthin: ["Poppins-Thin", "sans-serif"],
    pextralight: ["Poppins-ExtraLight", "sans-serif"],
    plight: ["Poppins-Light", "sans-serif"],
    pregular: ["Poppins-Regular", "sans-serif"],
    pmedium: ["Poppins-Medium", "sans-serif"],
    psemibold: ["Poppins-SemiBold", "sans-serif"],
    pbold: ["Poppins-Bold", "sans-serif"],
    pextrabold: ["Poppins-ExtraBold", "sans-serif"],
    pblack: ["Poppins-Black", "sans-serif"],
  },
},

  },
  plugins: [],
}