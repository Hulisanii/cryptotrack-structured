import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import colors from '../constants/colors';

export default function WatchlistScreen() {
  return (
    <View style={styles.container}>
      <Header title="Watchlist" />
      <View style={styles.empty}>
        <Text style={{ color: colors.textSecondary }}>No coins in watchlist yet.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
