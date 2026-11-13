import { useEffect, useRef, useState } from 'react';
import { fetchMarkets } from '../services/api';

/**
 * usePriceFeed
 * - Provides list of market data and simple live updates via polling fallback.
 * - Also demonstrates a WebSocket stub: you can replace with a production WebSocket/your backend.
 *
 * NOTE: Mobile apps should connect to your backend WebSocket gateway (not exchanges directly) for auth & scale.
 */

export function usePriceFeed(pollIntervalMs = 10000) {
  const [markets, setMarkets] = useState<any[]>([]);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const load = async () => {
    try {
      const data = await fetchMarkets('usd', 100, 1);
      setMarkets(data);
    } catch (err) {
      console.warn('fetchMarkets error', err);
    }
  };

  useEffect(() => {
    load();
    timer.current = setInterval(load, pollIntervalMs);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [pollIntervalMs]);

  // Basic utility: update single coin price locally (if you get WS message)
  const updateCoinPrice = (id: string, price: number, changePct24h?: number) => {
    setMarkets(prev =>
      prev.map((c: any) =>
        c.id === id ? { ...c, current_price: price, price_change_percentage_24h: changePct24h ?? c.price_change_percentage_24h } : c
      )
    );
  };

  return { markets, updateCoinPrice, refresh: load };
}
