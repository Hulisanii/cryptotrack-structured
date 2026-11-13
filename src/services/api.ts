import axios from 'axios';

export const coinGeckoClient = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  timeout: 10000,
});

export async function fetchMarkets(vsCurrency = 'usd', perPage = 50, page = 1) {
  const res = await coinGeckoClient.get('/coins/markets', {
    params: {
      vs_currency: vsCurrency,
      order: 'market_cap_desc',
      per_page: perPage,
      page,
      sparkline: false,
      price_change_percentage: '24h',
    },
  });
  return res.data;
}

export async function fetchCoinMarketChart(id: string, days = 1) {
  // days: 1, 7, 30, 365, max
  const res = await coinGeckoClient.get(`/coins/${id}/market_chart`, {
    params: {
      vs_currency: 'usd',
      days,
      interval: 'minute',
    },
  });
  return res.data;
}
