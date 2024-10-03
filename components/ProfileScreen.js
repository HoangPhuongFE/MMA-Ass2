import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState({
    username: 'admin',
    email: 'hoangnpse161446@fpt.edu.vn',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStY0HhY_9trOQegXB8s8yJdL6WoL9LnYWSeQ&s'
  });

  return (
    <View style={styles.container}>
      <Image source={{ uri: userData.avatar }} style={styles.avatar} />
      <Text style={styles.usernameText}>Username: {userData.username}</Text>
      <Text style={styles.emailText}>Email: {userData.email}</Text>
      
      {/* Nút chuyển đến Home */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  avatar: {
    width: 120, 
    height: 120,
    borderRadius: 60, 
    marginBottom: 20,
  },
  usernameText: {
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 10,
    color: '#333', 
  },
  emailText: {
    fontSize: 16,
    color: '#666', 
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10, 
    alignItems: 'center',
    marginTop: 20,
    width: '80%',
  },
  buttonText: {
    fontSize: 18,
    color: 'white', 
    fontWeight: 'bold',
  }
});
