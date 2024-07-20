import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Add this import
import { useRouter } from 'expo-router';
import styles from './styles';
import { DEFAULT_IMAGE, VEHICLE_STORAGE_KEY } from '@/constants/Storage';

// Define the type for vehicle
type Vehicle = {
  id: string;
  name: string;
  image: string | null;
};

const VehicleCard: React.FC<{ vehicle: Vehicle; onPress: () => void }> = ({ vehicle, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={vehicle.image ? { uri: vehicle.image } : DEFAULT_IMAGE} style={styles.image} />
    <Text style={styles.text}>{vehicle.name}</Text>
  </TouchableOpacity>
);

const Index: React.FC = () => {
  const [vehicleData, setVehicleData] = useState<Vehicle[]>([]);
  const router = useRouter();

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
  const handlePress = (vehicle: Vehicle) => {
    router.push(`/vehicle-details/${vehicle.id}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={vehicleData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <VehicleCard vehicle={item} onPress={() => handlePress(item)} />}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={localStyles.button} onPress={() => router.push('/create-vehicle')}>
        <Text style={localStyles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};


const localStyles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
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
