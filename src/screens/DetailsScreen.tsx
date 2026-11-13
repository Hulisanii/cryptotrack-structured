import { RouteProp, useRoute } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import PriceBadge from '../components/PriceBadge';
import colors from '../constants/colors';
import { RootStackParamList } from '../navigation';
import { fetchCoinMarketChart } from '../services/api';

type DetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function DetailsScreen() {
  const route = useRoute<DetailsRouteProp>();
  const { id } = route.params;
  const [priceNow, setPriceNow] = useState<number>(0);
  const [chartData, setChartData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        // 1 day chart as initial; CoinGecko returns prices [[ts, price], ...]
        const res: any = await fetchCoinMarketChart(id, 1);
        const prices = (res.prices || []).slice(-60); // last n points
        setChartData(prices.map((p: any) => p[1]));
        setLabels(prices.map((p: any, i: number) => (i % 10 === 0 ? new Date(p[0]).toLocaleTimeString() : '')));
        if (prices.length) setPriceNow(prices[prices.length - 1][1]);
      } catch (err) {
        console.warn('chart error', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const delta = useMemo(() => {
    if (chartData.length < 2) return { abs: 0, pct: 0 };
    const start = chartData[0];
    const end = chartData[chartData.length - 1];
    const abs = +(end - start).toFixed(2);
    const pct = +(abs / start * 100).toFixed(2);
    return { abs, pct };
  }, [chartData]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>{id.toUpperCase()}</Text>
          <Text style={styles.sub}>Live price</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.price}>${priceNow.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
          <PriceBadge value={delta.abs} percent={delta.pct} />
        </View>
      </View>

      <View style={{ marginTop: 12 }}>
        <LineChart
          data={{
            labels: labels.length ? labels : [''],
            datasets: [{ data: chartData.length ? chartData : [0] }],
          }}
          width={SCREEN_WIDTH - 32}
          height={260}
          withInnerLines={false}
          withVerticalLines={false}
          chartConfig={{
            backgroundGradientFrom: colors.background,
            backgroundGradientTo: colors.background,
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(122,111,255, ${opacity})`,
            labelColor: () => colors.textSecondary,
          }}
          bezier
          style={{ marginHorizontal: 16, borderRadius: 12 }}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]}>
          <Text style={styles.buttonText}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.card }]}>
          <Text style={styles.buttonText}>Sell</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.card }]}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingTop: 8 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, alignItems: 'center' },
  title: { color: colors.textPrimary, fontSize: 20, fontWeight: '800' },
  sub: { color: colors.textSecondary, fontSize: 12, marginTop: 4 },
  price: { color: colors.textPrimary, fontSize: 28, fontWeight: '800' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginTop: 18 },
  button: { flex: 1, marginHorizontal: 6, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: colors.textPrimary, fontWeight: '700' },
});
