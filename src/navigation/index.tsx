import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from '../constants/colors';
import DetailsScreen from '../screens/DetailsScreen';
import HomeScreen from '../screens/HomeScreen';
import WatchlistScreen from '../screens/WatchListScreen';

export type RootStackParamList = {
  Home: undefined;
  Details: { id: string; symbol: string };
  Watchlist: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Markets' }} />
      <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Coin' }} />
      <Stack.Screen name="Watchlist" component={WatchlistScreen} options={{ title: 'Watchlist' }} />
    </Stack.Navigator>
  );
}
