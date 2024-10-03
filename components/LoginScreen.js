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
      const response = await fetch('https://66fab32a8583ac93b4098581.mockapi.io/login', {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

     
      if (response.ok) {
       
        const user = data.find(user => user.username === username && user.password === password);
        
        if (user) {
          const mockToken = 'mockToken123'; 
          await AsyncStorage.setItem('userToken', mockToken); 
          navigation.replace('Home');
        } else {
          Alert.alert('Lỗi', 'Tên đăng nhập hoặc mật khẩu không chính xác.');
        }
      } else {
        Alert.alert('Lỗi', data.message || 'Đăng nhập thất bại. Vui lòng thử lại sau.');
      }
    } catch (error) {
      console.error('Lỗi đăng nhập: ', error);
      Alert.alert('Lỗi', 'Có gì đó không đúng. Vui lòng thử lại sau.');
    }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Đăng Nhập" onPress={handleLogin} />
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
