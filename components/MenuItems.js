//MenuItems.js
import React, { useState, useEffect } from 'react';
import { SectionList, Text, View, StyleSheet, ActivityIndicator } from 'react-native';

const MenuItems = () => {
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
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
      <SectionList style={styles.container}
          sections={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
              <View style={styles.item}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.itemText}>{item.price}</Text>
              </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.header}>{title}</Text>
          )}
      />
  );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#220045'
  },
  header: {
      fontSize: 24,
      fontWeight: 'bold',
      backgroundColor: '#220045',
      padding: 5,
      color: 'white',
      marginLeft:30
  },
  item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
      borderBottomWidth: 2,
      borderBottomColor: '#220045',
      backgroundColor:'#dcf8f5',
      marginHorizontal: 5
  },
  itemText: {
      fontSize: 18,
      color: '#220045'
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default MenuItems;
