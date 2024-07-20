import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Vehicle } from '../types'; // Adjust the path as necessary
import { DEFAULT_IMAGE } from '@/constants/Storage';
import { useNavigation } from 'expo-router';

const VEHICLE_STORAGE_KEY = 'VEHICLES';

const VehicleDescription: React.FC = () => {
  const { id } = useLocalSearchParams() as { id?: string };
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  navigator = useNavigation()
  useEffect(() => {
    const fetchVehicleData = async () => {
      if (id) {
        try {
          const jsonValue = await AsyncStorage.getItem(VEHICLE_STORAGE_KEY);
          if (jsonValue != null) {
            const vehicles: Vehicle[] = JSON.parse(jsonValue);
            const foundVehicle = vehicles.find(v => v.id === id);
            if (foundVehicle) {
              setVehicle(foundVehicle);
            } else {
              console.error('Vehicle not found');
            }
          } else {
            console.error('No vehicles found in storage');
          }
        } catch (error) {
          console.error('Error fetching vehicle data:', error);
        }
      }
    };

    fetchVehicleData();
  }, [id]);

  if (!vehicle) {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>Vehicle data not available</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={vehicle.image ? { uri: vehicle.image } : DEFAULT_IMAGE}
        style={styles.image}
      />
      <Text style={styles.name}>{vehicle.name}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
});

export default VehicleDescription;
