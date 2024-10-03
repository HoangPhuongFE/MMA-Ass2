import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

export default function Header({ navigation, cartCount }) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Assignment 2</Text>

      {/* Icon giỏ hàng */}
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <FontAwesome name="shopping-cart" size={24} color="white" />
        {cartCount > 0 && <View style={styles.cartBadge}>
          <Text style={styles.cartCount}>{cartCount}</Text>
        </View>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#365486',  
    paddingVertical: 12,         
    paddingHorizontal: 20,     
    minHeight: 80,               
    justifyContent: 'space-between',    
    alignItems: 'center',        
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 26,             
    color: '#E1F7F5',           
    fontWeight: 'bold',        
  },
  cartBadge: {
    position: 'absolute',
    right: -10,
    top: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  cartCount: {
    color: 'white',
    fontSize: 12,
  },
});
