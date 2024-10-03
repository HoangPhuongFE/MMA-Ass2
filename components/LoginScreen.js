import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        navigation.replace('Home');
      }
    };
    checkLogin();
  }, []);

  const handleLogin = async () => {
    try {
      // Giả lập việc fetch từ mock API
      const response = await fetch('https://66fab32a8583ac93b4098581.mockapi.io/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
          
        const mockToken = 'mockToken123';  // Token giả lập
  
        await AsyncStorage.setItem('userToken', mockToken);  // Lưu token giả lập
        navigation.replace('Home');
      } else {
        Alert.alert('Error', data.message || 'Login failed. Please check your username and password.');
      }
    } catch (error) {
      console.error('Login Error: ', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
