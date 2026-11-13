import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';

export default function PriceBadge({ value, percent }: { value: number; percent: number }) {
  const isPositive = percent >= 0;
  return (
    <View style={[styles.container, { backgroundColor: isPositive ? colors.positive : colors.negative }]}>
      <Text style={styles.text}>
        {isPositive ? '+' : '-'}${Math.abs(value).toFixed(2)} ({Math.abs(percent).toFixed(2)}%)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  text: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
});
