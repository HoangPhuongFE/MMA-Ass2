// Footer.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.container}>
      <Text style={styles.footerText}>&copy;HOÀNG</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#365486',
    padding: 10,
    alignItems: 'center'
  },
  footerText: {
    fontSize: 16,
    color: '#DFCF21'
  }
});
