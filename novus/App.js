import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import * as SecureStore from 'expo-secure-store';
import ProtectedScreens from './Utils/ProtectedScreens';

// Function to load fonts
const fetchFonts = () => {
  return Font.loadAsync({
    'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'poppins-semibold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'poppins-italic': require('./assets/fonts/Poppins-Italic.ttf'),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      const isSignedIn = await SecureStore.getItemAsync('isSignedIn');
      if (!isSignedIn) {
        await SecureStore.setItemAsync('isSignedIn', 'false');
      }
      
      // Load fonts after secure store handling
      await fetchFonts();
      setFontsLoaded(true);
    };

    initializeApp();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return <ProtectedScreens />;
}
