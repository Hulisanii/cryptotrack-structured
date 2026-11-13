import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../constants/colors';
import type { RootStackParamList } from '../navigation';

type Crypto = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap_rank?: number;
};

export default function CryptoItem({ coin }: { coin: Crypto }) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Details', { id: coin.id, symbol: coin.symbol })}
      style={styles.row}
    >
      <View style={styles.left}>
        <View style={styles.iconWrap}>
          <Image source={{ uri: coin.image }} style={styles.icon} />
        </View>
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.symbol}>{coin.symbol.toUpperCase()} {coin.market_cap_rank ? ` · #${coin.market_cap_rank}` : ''}</Text>
          <Text style={styles.name}>{coin.name}</Text>
        </View>
      </View>

      <View style={styles.right}>
        <Text style={styles.price}>${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
        <Text style={[styles.change, { color: coin.price_change_percentage_24h >= 0 ? colors.positive : colors.negative }]}>
          {coin.price_change_percentage_24h !== null ? coin.price_change_percentage_24h.toFixed(2) + '%' : '—'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
  },
  left: { flexDirection: 'row', alignItems: 'center' },
  iconWrap: {
    width: 48,
    height: 48,
    backgroundColor: colors.card,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { width: 34, height: 34 },
  symbol: { color: colors.textPrimary, fontWeight: '700', fontSize: 16 },
  name: { color: colors.textSecondary, fontSize: 13, marginTop: 2 },
  right: { alignItems: 'flex-end' },
  price: { color: colors.textPrimary, fontWeight: '700', fontSize: 16 },
  change: { marginTop: 6, fontSize: 12, fontWeight: '700' },
});
