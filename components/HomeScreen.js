import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import MenuItems from './MenuItems';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [cart, setCart] = useState([]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.replace('Login');
  };

  const addToCart = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Load the cart from AsyncStorage when the component mounts
  useEffect(() => {
    const loadCart = async () => {
      const savedCart = await AsyncStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    };
    loadCart();
  }, []);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} cartCount={cart.length} />
      <MenuItems addToCart={addToCart} />

      {/* Container for buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.smallTabButton} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.smallTabText}>Go to Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallTabButton} onPress={handleLogout}>
          <Text style={styles.smallTabText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallTabButton} onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.smallTabText}>Giỏ hàng</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  smallTabButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  smallTabText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});
