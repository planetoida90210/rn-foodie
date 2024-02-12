import { View, Text, StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import Button from '@/src/components/Button';

const CreateProductScreen = () => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);

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
  const onCreate = () => {
    console.warn('Create');
    if (!validateInput()) {
      return;
    }

    //TODO: save in the database
    resetFields();
  };

  return (
    <View style={styles.container}>
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
      <Button onPress={onCreate} text="Create" />
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
});

export default CreateProductScreen;
