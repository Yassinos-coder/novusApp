import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useAuth0 } from 'react-native-auth0';

const LoginScreen = () => {
  const { authorize } = useAuth0();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLoginWithEmail = async () => {
    try {
      await authorize({ 
        scope: 'openid profile email', 
        email, 
        password 
      });
    } catch (error) {
      console.log('Email login error:', error);
    }
  };

  const onLoginWithApple = async () => {
    try {
      await authorize({ 
        connection: 'apple' 
      });
    } catch (error) {
      console.log('Apple login error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Log In with Email" onPress={onLoginWithEmail} />
      <Button title="Log In with Apple" onPress={onLoginWithApple} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default LoginScreen;
