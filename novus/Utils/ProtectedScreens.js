import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SecureStore from 'expo-secure-store';

// Screens Import
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import SettingsScreen from '../Screens/SettingsScreen/SettingsScreen';

const Tab = createBottomTabNavigator();

const ProtectedScreens = () => {
  const [isSignedIn, setIsSignedIn] = useState(null); // State for handling sign-in status

  useEffect(() => {
    const checkSignInStatus = async () => {
      const signedInStatus = await SecureStore.getItemAsync('isSignedIn');
      setIsSignedIn(signedInStatus === 'true');
    };

    checkSignInStatus();
  }, []);

  if (isSignedIn === null) {
    // Return loading indicator while checking sign-in status
    return null;
  }

  return (
    <NavigationContainer>
      {isSignedIn ? (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default ProtectedScreens;
