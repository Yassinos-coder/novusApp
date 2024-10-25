import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import * as SecureStore from 'expo-secure-store';
import ProtectedScreens from './Utils/ProtectedScreens';
import { Auth0Provider } from 'react-native-auth0';


// Load custom fonts
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

      await fetchFonts();
      setFontsLoaded(true);
    };

    initializeApp();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <Auth0Provider domain={"dev-now7hblt0ihoun10.eu.auth0.com"} clientId={"pOXz7SugFq921eh0TUMIOGuqPLZ4hI12"}>
      <ProtectedScreens />
    </Auth0Provider>

  );
}
