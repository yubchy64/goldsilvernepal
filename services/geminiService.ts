import { ServiceResponse, PriceData } from "../types";
import { DAILY_PRICES } from "../data/prices";
import { REMOTE_PRICES_URL } from "../constants";

export const fetchLivePrices = async (): Promise<ServiceResponse> => {
  // 1. Try to fetch from remote URL if configured
  if (REMOTE_PRICES_URL) {
    try {
      const response = await fetch(REMOTE_PRICES_URL + '?t=' + new Date().getTime()); // Add timestamp to bust cache
      if (response.ok) {
        const remoteData = await response.json();
        
        // Simple validation to ensure the JSON has correct fields
        if (remoteData.fineGoldPerTola && remoteData.silverPerTola && remoteData.lastUpdated) {
           return {
            data: {
              fineGoldPerTola: Number(remoteData.fineGoldPerTola),
              silverPerTola: Number(remoteData.silverPerTola),
              lastUpdated: String(remoteData.lastUpdated),
            },
            sources: [{ web: { uri: REMOTE_PRICES_URL, title: "Remote Config" } }],
            error: undefined,
          };
        }
      }
    } catch (err) {
      console.warn("Failed to fetch remote prices, falling back to local.", err);
    }
  }

  // 2. Fallback to Local Data (Simulate network delay)
  await new Promise(resolve => setTimeout(resolve, 600));

  return {
    data: {
      fineGoldPerTola: DAILY_PRICES.fineGoldPerTola,
      silverPerTola: DAILY_PRICES.silverPerTola,
      lastUpdated: DAILY_PRICES.lastUpdated,
    },
    sources: [], // No external web sources in manual mode
    error: undefined,
  };
};