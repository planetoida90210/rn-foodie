import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import Button from '@/src/components/Button';
import { defaultProductImage } from '@/src/components/ProductListItem';
import Colors from '@/src/constants/Colors';
import { Stack, useLocalSearchParams } from 'expo-router';

const CreateProductScreen = () => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const [image, setImage] = useState<string | null>(null);

  const { id } = useLocalSearchParams();

  const isUpdate = !!id;

  const resetFields = () => {
    setName('');
    setPrice('');
  };

  const validateInput = () => {
    setErrors([]);
    if (!name) {
      setErrors(['Name is required']);
      return false;
    }
    if (!price) {
      setErrors(['Price is required']);
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors(['Price must be a number']);
      return false;
    }
    if (parseFloat(price) <= 0) {
      setErrors(['Price must be greater than 0']);
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    if (isUpdate) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onCreate = () => {
    console.warn('Create');
    if (!validateInput()) {
      return;
    }

    //TODO: save in the database
    resetFields();
  };

  const onUpdate = () => {
    console.warn('Update');
    if (!validateInput()) {
      return;
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdate ? 'Update Product' : 'Create Product' }}
      />
      <Image
        source={{ uri: image || defaultProductImage }}
        style={styles.image}
      />
      <Text onPress={pickImage} style={styles.textButton}>
        Select Image
      </Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="eg. Margharita"
        style={styles.input}
      />
      <Text style={styles.label}>Price</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="eg. 9.99"
        style={styles.input}
        keyboardType="numeric"
      />
      <Text style={{ color: 'red' }}>{errors.join(', ')}</Text>
      <Button onPress={onSubmit} text={isUpdate ? 'Update' : 'Create'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  label: {
    color: 'gray',
    fontSize: 16,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 20,
  },
  image: {
    width: '40%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  textButton: {
    color: Colors.light.tint,
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 20,
    marginVertical: 10,
  },
});

export default CreateProductScreen;
