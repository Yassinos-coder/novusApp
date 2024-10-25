import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SecureStore from 'expo-secure-store';
import Ionicons from '@expo/vector-icons/Ionicons';

// Screens Import
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import SettingsScreen from '../Screens/SettingsScreen/SettingsScreen';
import LoginScreen from '../Screens/LoginScreen/LoginScreen';
import { Auth0Provider } from 'react-native-auth0';
import { AuthConfig } from '../auth0-configuration';

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
    // Return null or a loading indicator while checking sign-in status
    return null;
  }

  return (
    <Auth0Provider
      domain={AuthConfig.domain}
      clientId={AuthConfig.clientId}
      redirectUri={`exp://192.168.3.13:8081/`}  // Ensure this is set correctly
    >
      <NavigationContainer>
        {isSignedIn ? (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused
                    ? 'home'
                    : 'home';
                } else if (route.name === 'Settings') {
                  iconName = focused ? 'home' : 'home';
                }

                // Return the appropriate icon
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        ) : (
          <Tab.Navigator initialRouteName='Login'
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused
                    ? 'home'
                    : 'home';
                } else if (route.name === 'Settings') {
                  iconName = focused ? 'home' : 'home';
                }

                // Return the appropriate icon
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name="Login" component={LoginScreen} />
          </Tab.Navigator>
        )}
      </NavigationContainer>

    </Auth0Provider>
  );
};

export default ProtectedScreens;
