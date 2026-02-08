import { HistoricalDataPoint } from "./types";

export const TOLA_TO_GRAMS = 11.6638;

// OPTIONAL: Paste your GitHub Gist "Raw" URL here to update prices without redeploying.
// Example: "https://gist.githubusercontent.com/your-user/abc123/raw/prices.json"
export const REMOTE_PRICES_URL = "https://gist.githubusercontent.com/yubchy64/eebe394167ab55244231d82f6235a5a7/raw/5f36a224d2d9bd87da764b41f0cd2331611df82a/prices.json"; 

// Helper to format date for chart (e.g., "Feb 15")
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Generate 7 days of history ending today, relative to the provided current prices
export const generateRelativeHistory = (currentGold: number, currentSilver: number): HistoricalDataPoint[] => {
  const points: HistoricalDataPoint[] = [];
  const today = new Date();
  
  // Start with today's actual price
  let lastGold = currentGold;
  let lastSilver = currentSilver;

  // Add Today
  points.push({
      date: formatDate(today),
      gold: currentGold,
      silver: currentSilver
  });

  // Generate previous 6 days backwards
  for (let i = 1; i < 7; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      
      // Simulate daily volatility
      const goldVolatility = lastGold * (Math.random() * 0.015 - 0.0075); // +/- 0.75%
      const silverVolatility = lastSilver * (Math.random() * 0.025 - 0.0125); // +/- 1.25%
      
      lastGold = lastGold - goldVolatility;
      lastSilver = lastSilver - silverVolatility;

      points.push({
          date: formatDate(d),
          gold: Math.round(lastGold),
          silver: Math.round(lastSilver)
      });
  }

  // Reverse so it's chronological (T-6 to Today)
  return points.reverse();
};

// Initial fallback state (approximate market rates if load fails completely)
export const INITIAL_EMPTY_HISTORY = generateRelativeHistory(160000, 1950);
