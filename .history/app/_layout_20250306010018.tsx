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
    "Lato-Black": require("../assets/fonts/Lato-Black.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
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


