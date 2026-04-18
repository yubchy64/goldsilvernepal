import { HistoricalDataPoint } from './types';

export const TOLA_TO_GRAMS = 11.6638;

export const LIVE_PRICES_URL = "https://raw.githubusercontent.com/yubchy64/goldsilvernepal/main/data/live-prices.json";

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const generateRelativeHistory = (currentGold: number, currentSilver: number): HistoricalDataPoint[] => {
  const points: HistoricalDataPoint[] = [];
  const today = new Date();
  
  let lastGold = currentGold;
  let lastSilver = currentSilver;

  points.push({
      date: formatDate(today),
      gold: currentGold,
      silver: currentSilver
  });

  for (let i = 1; i < 7; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      
      const goldVolatility = lastGold * (Math.random() * 0.015 - 0.0075);
      const silverVolatility = lastSilver * (Math.random() * 0.025 - 0.0125);
      
      lastGold = lastGold - goldVolatility;
      lastSilver = lastSilver - silverVolatility;

      points.push({
          date: formatDate(d),
          gold: Math.round(lastGold),
          silver: Math.round(lastSilver)
      });
  }

  return points.reverse();
};

export const INITIAL_EMPTY_HISTORY = generateRelativeHistory(160000, 1950);