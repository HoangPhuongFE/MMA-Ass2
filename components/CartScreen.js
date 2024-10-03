import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartScreen({ navigation }) {
  const [cart, setCart] = useState([]);

  
  useEffect(() => {
    const loadCart = async () => {
      const savedCart = await AsyncStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    };
    loadCart();
  }, []);

  
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0).toFixed(2);
  };

  
  const handleCheckout = async () => {
    Alert.alert('Thông báo', 'Thanh toán thành công! Tổng giá trị đơn hàng: $' + calculateTotal(), [
      { text: 'OK', onPress: async () => {
          setCart([]); // Xóa giỏ hàng trong state
          await AsyncStorage.removeItem('cart'); // Xóa giỏ hàng khỏi AsyncStorage
          navigation.navigate('Home'); // Quay lại màn hình Home
        }
      }
    ]);
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng của bạn</Text>
      {cart.length > 0 ? (
        <FlatList
          data={cart}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemText}>{item.price}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyCart}>Giỏ hàng trống</Text>
      )}

      <Text style={styles.totalText}>Tổng: ${calculateTotal()}</Text>
      
      {cart.length > 0 && (
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Thanh toán</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'right',
  },
  emptyCart: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#999',
  },
  checkoutButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
