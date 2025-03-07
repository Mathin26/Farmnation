import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import '../global.css';
import { Stack,SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Lato-Black": require("../assets/fonts/Lato-Black.ttf"),
    "Lato-Bold": require("../assets/fonts/Lato-Bold.ttf"),
    "Lato-BlackItalic": require("../assets/fonts/Lato-BlackItalic.ttf"),
    "Lato-BoldItalic": require("../assets/fonts/Lato-BoldItalic.ttf"),
    "Lato-Italic": require("../assets/fonts/Lato-Italic.ttf"),
    "Lato-Light": require("../assets/fonts/Lato-Light.ttf"),
    "Lato-LightItalic": require("../assets/fonts/Lato-LightItalic.ttf"),
    "Lato-Regular": require("../assets/fonts/Lato-Regular.ttf"),
    "Lato-Thin": require("../assets/fonts/Lato-Thin.ttf"),
    "Lato-ThinItalic": require("../assets/fonts/Lato-ThinItalic.ttf"),
  });

  useEffect(() =>{
    if(error) throw error;

    if(fontsLoaded){
        SplashScreen.hideAsync();
    }
 } ,[error,fontsLoaded])
 if(!fontsLoaded && !error) return null;

  return (
    <Stack>
     <Stack.Screen name='index'/>

    </Stack>
  )
}

export default RootLayout


