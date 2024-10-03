import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Assignment 2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#365486',  
    paddingVertical: 12,         
    paddingHorizontal: 20,     
    minHeight: 80,               
    justifyContent: 'center',    
    alignItems: 'center',        
    borderBottomWidth: 2,        
    borderBottomColor: '#1F2D3D',
    elevation: 2,              
    shadowColor: '#000',         
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,          
    shadowRadius: 2,
  },
  headerText: {
    fontSize: 26,             
    color: '#E1F7F5',           
    fontWeight: 'bold',        
  }
});
