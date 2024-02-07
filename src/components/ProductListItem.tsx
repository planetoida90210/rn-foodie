import { StyleSheet, View, Text, Image } from 'react-native';


import Colors from '@/src/constants/Colors';
import { Product } from '@/src/types';

type ProductListItemProps = {
    product: Product;
}

export const defaultProductImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

 const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <View style={styles.container}>
    <Image source={{uri: product.image || defaultProductImage }} style={styles.image} />
    <Text style={styles.title}>{product.name}</Text>
    <Text style={styles.price}>${product.price}</Text>
  </View>
  )
}

export default ProductListItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    aspectRatio: 1
  }
  
});
