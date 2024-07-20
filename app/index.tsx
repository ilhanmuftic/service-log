import React, { useState, useEffect } from 'react';
import { Text, View, Image, FlatList, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Vehicle } from './types'; // Adjust the path as necessary
import styles from './styles'; // Adjust the path as necessary
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import VEHICLE_STORAGE_KEY from '@/constants/Storage';
import { useFocusEffect } from '@react-navigation/native'; // Add this import


// Define the props type for the VehicleCard component
interface VehicleCardProps {
  vehicle: Vehicle;
}

// VehicleCard component
const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => (
  <View style={styles.card}>
    <Image source={vehicle.image ? { uri: vehicle.image } : require('./default-image.jpeg')} style={styles.image} />
    <Text style={styles.text}>{vehicle.name}</Text>
  </View>
);

// Index component
const Index: React.FC = () => {
  const [vehicleData, setVehicleData] = useState<Vehicle[]>([]);

  const loadVehicles = async () => {
    try {
      const storedVehicles = await AsyncStorage.getItem(VEHICLE_STORAGE_KEY);
      const vehicles = storedVehicles ? JSON.parse(storedVehicles) : [];
      setVehicleData(vehicles);
    } catch (error) {
      console.error('Failed to load vehicles from storage:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadVehicles();
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={vehicleData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <VehicleCard vehicle={item} />}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={localStyles.button} onPress={() => router.push('/create-vehicle')}>
        <Text style={localStyles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const localStyles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007bff', // Blue color
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  buttonText: {
    fontSize: 30,
    color: '#fff',
  }, 
});

export default Index;
function loadVehicles() {
  throw new Error('Function not implemented.');
}

