import { View, Text, Platform, FlatList } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { useCart } from '@/src/providers/CartProvider';
import CartListItem from '@/src/components/CartListItem';
import Button from '../components/Button';

const CartScreen = () => {
  const { items, total } = useCart();
  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
        keyExtractor={item => item.id}
      />
      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: '400' }}>
        Total: ${total.toFixed(2)}
      </Text>
      <Button text="Checkout" onPress={() => {}} />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default CartScreen;
