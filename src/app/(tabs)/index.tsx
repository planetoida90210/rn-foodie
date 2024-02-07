import { StyleSheet, View, Text } from 'react-native';


import EditScreenInfo from '@/src/components/EditScreenInfo';
import Colors from '@/src/constants/Colors';


export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pizza Pepperoni</Text>
      <Text style={styles.price}>$12.99</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
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

  
});
