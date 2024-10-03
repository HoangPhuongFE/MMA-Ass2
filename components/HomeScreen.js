import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import MenuItems from './MenuItems';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.replace('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Header />
      <MenuItems />

      {/* Container cho các nút */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.smallTabButton} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.smallTabText}>Go to Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallTabButton} onPress={handleLogout}>
          <Text style={styles.smallTabText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between', // Để bố cục cuộn được
  },
  buttonContainer: {
    flexDirection: 'row',            // Đặt các nút cạnh nhau
    justifyContent: 'center',        // Căn giữa theo chiều ngang
    alignItems: 'center',            // Căn giữa theo chiều dọc
    marginVertical: 10,              // Khoảng cách giữa nút và nội dung khác
  },
  smallTabButton: {
    backgroundColor: '#f5f5f5',      // Màu nền xám nhạt cho nút
    paddingVertical: 8,              // Giảm padding dọc để nút nhỏ hơn
    paddingHorizontal: 15,           // Giảm padding ngang để nút nhỏ hơn
    borderRadius: 15,                // Bo góc nhỏ hơn cho nút
    marginHorizontal: 8,             // Giảm khoảng cách giữa các nút
    borderWidth: 1,                  // Thêm viền mỏng
    borderColor: '#ddd',             // Màu viền xám nhạt
  },
  smallTabText: {
    fontSize: 14,                    // Giảm kích thước chữ cho gọn hơn
    color: '#333',                   // Màu chữ đậm
    fontWeight: '500',               // Độ đậm vừa phải cho chữ
  },
});
