import React, { useState, useEffect } from 'react';
import { SectionList, Text, View, StyleSheet, ActivityIndicator, Button } from 'react-native';

const MenuItems = ({ addToCart }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('https://66fab32a8583ac93b4098581.mockapi.io/menuItems');
        const data = await response.json();
        setMenuItems(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <SectionList
      sections={menuItems}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={styles.itemInfo}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </View>
          <Button title="+" onPress={() => addToCart(item)} color="#2A9D8F" />
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    backgroundColor: '#2A9D8F', 
    padding: 10,
    color: '#ffffff',
    marginLeft: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#ffffff', 
    borderRadius: 8, 
    marginVertical: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemInfo: {
    flex: 1, 
    marginRight: 10, 
  },
  itemText: {
    fontSize: 18,
    color: '#2A9D8F', 
    fontWeight: '500', 
  },
  itemPrice: {
    fontSize: 16,
    color: '#007bff',
  },
});

export default MenuItems;
