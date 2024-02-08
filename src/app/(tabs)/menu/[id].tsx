import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import products from '@/assets/data/products';
import Button from '@/src/components/Button';
import { defaultProductImage } from '@/src/components/ProductListItem';
import { useCart } from '@/src/providers/CartProvider';
import { PizzaSize } from '@/src/types';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailPage = () => {
  const { id } = useLocalSearchParams();
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

  const product = products.find(p => p.id.toString() === id);

  const addToCart = () => {
    if (!product) {
      return;
    }

    addItem(product, selectedSize);
  };

  if (!product) {
    return (
      <View>
        <Stack.Screen options={{ title: 'Product not found' }} />
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultProductImage }}
        style={styles.image}
      />
      <Text>Select Size</Text>
      <View style={styles.sizes}>
        {sizes.map(size => (
          <Pressable
            onPress={() => setSelectedSize(size)}
            key={size}
            style={[
              styles.size,
              {
                backgroundColor: selectedSize === size ? 'gainsboro' : 'white',
              },
            ]}>
            <Text
              style={[
                styles.sizeText,
                { color: selectedSize === size ? 'black' : 'gray' },
              ]}>
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>${product.price}</Text>
      <Button onPress={addToCart} text="Add to Cart" />
    </View>
  );
};

export default ProductDetailPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 'auto',
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  size: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
  },
});
