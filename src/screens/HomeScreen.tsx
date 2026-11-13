import React from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import CryptoItem from '../components/CryptoItem';
import Header from '../components/Header';
import colors from '../constants/colors';
import { usePriceFeed } from '../hooks/usePriceFeed';

export default function HomeScreen() {
  const { markets, refresh } = usePriceFeed(10000);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Header title="Markets" />
      <FlatList
        data={markets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CryptoItem coin={item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.textPrimary} />}
        // separators to mimic card list:
        ItemSeparatorComponent={() => <View style={{ height: 0.5, backgroundColor: '#1F1F24', marginLeft: 16 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
});
