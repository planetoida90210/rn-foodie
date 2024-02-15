import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, Alert } from 'react-native';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';

import products from '@/assets/data/products';
import Button from '@/src/components/Button';
import { defaultProductImage } from '@/src/components/ProductListItem';
import { useCart } from '@/src/providers/CartProvider';
import { PizzaSize } from '@/src/types';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailPage = () => {
  const { id } = useLocalSearchParams();
  const { addItem } = useCart();

  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

  const product = products.find(p => p.id.toString() === id);

  const addToCart = () => {
    if (!product) {
      return;
    }

    addItem(product, selectedSize);
    Alert.alert(
      'Added to Cart',
      'Do you want to continue shopping or go to the cart?',
      [
        {
          text: 'Continue Shopping',
          onPress: () => console.log('Continuing shopping'),
        },
        {
          text: 'Go to Cart',
          onPress: () => router.push('/cart'),
        },
      ],
    );
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
      <Stack.Screen
        options={{
          title: 'Menu',
          headerRight: () => (
            //@ts-ignore
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultProductImage }}
        style={styles.image}
      />

      <Text style={styles.price}>{product.name}</Text>
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
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
