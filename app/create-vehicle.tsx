import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Vehicle } from './types'; // Adjust the path if necessary
import { router } from 'expo-router';
import { VEHICLE_STORAGE_KEY } from '@/constants/Storage';

const CreateVehicleScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri || null);
    }
  };

  const handleSave = async () => {
    if (name.trim() === '') {
      alert('Please enter a vehicle name');
      return;
    }

    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      name,
      image,
    };

    try {
      const storedVehicles = await AsyncStorage.getItem(VEHICLE_STORAGE_KEY);
      const vehicles = storedVehicles ? JSON.parse(storedVehicles) : [];
      vehicles.push(newVehicle);
      await AsyncStorage.setItem(VEHICLE_STORAGE_KEY, JSON.stringify(vehicles));
      // Navigate back to the previous screen
      // For expo-router, use `router.back()` or similar function to navigate back
      console.log('Vehicle saved:', newVehicle, VEHICLE_STORAGE_KEY); // Debug log

      router.back()

    } catch (error) {
      console.error('Failed to save vehicle:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Vehicle</Text>
      <TextInput
        style={styles.input}
        placeholder="Vehicle Name"
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity style={styles.imageButton} onPress={handleSelectImage}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Save Vehicle" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  imageButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
});

export default CreateVehicleScreen;
