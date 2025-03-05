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
      DEFAULT: "#A5D6A7", // Soft Green (Subtle highlights, cards)
      100: "#C8E6C9",
      200: "#E8F5E9",
    },
    background: {
      DEFAULT: "#F5F5F5", // Light Gray (Main background)
      100: "#E0E0E0", // Slightly darker gray (Alternate sections)
    },
    black: {
      DEFAULT: "#263238", // Charcoal Gray for text
      100: "#37474F",
      200: "#455A64",
    },
  },
  fontFamily: {
  lthin: ["Lato-Thin", "sans-serif"],
  lthinitalic: ["Lato-ThinItalic", "sans-serif"],
  llight: ["Lato-Light", "sans-serif"],
  llightitalic: ["Lato-LightItalic", "sans-serif"],
  lregular: ["Lato-Regular", "sans-serif"],
  litalic: ["Lato-Italic", "sans-serif"],
  lbold: ["Lato-Bold", "sans-serif"],
  lbolditalic: ["Lato-BoldItalic", "sans-serif"],
  lblack: ["Lato-Black", "sans-serif"],
  lblackitalic: ["Lato-BlackItalic", "sans-serif"],
},

},

  },
  plugins: [],
}