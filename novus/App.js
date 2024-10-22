// App.js
import React, { useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home/Home';

const Stack = createNativeStackNavigator();

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
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await fetchFonts();
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen component={Home} name='Home' />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
