import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import products from '@/assets/data/products';
import { defaultProductImage } from '@/src/components/ProductListItem';

const ProductDetailPage = () => {
  const { id } = useLocalSearchParams();

  const sizes = ['S', 'M', 'L', 'XL'];

  const product = products.find(p => p.id.toString() === id);

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
          <View key={size} style={styles.size}>
            <Text style={styles.sizeText}>{size}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.price}>${product.price}</Text>
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
  price: { fontSize: 20, fontWeight: 'bold' },
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
