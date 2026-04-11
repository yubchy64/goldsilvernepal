import { ServiceResponse } from "../types";
import { DAILY_PRICES } from "../data/prices";
import { LIVE_PRICES_URL } from "../constants";

/**
 * Try fetching prices from a given URL
 */
const fetchPricesFromURL = async (url: string, sourceTitle: string): Promise<ServiceResponse | null> => {
  try {
    const response = await fetch(url + '?t=' + new Date().getTime(), {
      signal: AbortSignal.timeout(8000),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.fineGoldPerTola && data.silverPerTola && data.lastUpdated) {
        return {
          data: {
            fineGoldPerTola: Number(data.fineGoldPerTola),
            silverPerTola: Number(data.silverPerTola),
            lastUpdated: String(data.lastUpdated),
          },
          sources: [{ web: { uri: "https://fenegosida.org/", title: sourceTitle } }],
          error: undefined,
        };
      }
    }
  } catch {
    console.warn(`Failed to fetch from ${url}`);
  }
  return null;
};

/**
 * Main function: Fetch live prices with cascading fallbacks
 *
 * 1. GitHub-hosted JSON (auto-updated from FENEGOSIDA by GitHub Actions)
 * 2. Local /data/live-prices.json (same repo, works in dev without push)
 * 3. Hardcoded fallback data (data/prices.ts)
 */
export const fetchLivePrices = async (): Promise<ServiceResponse> => {
  // 1. Try GitHub-hosted live prices
  const liveResult = await fetchPricesFromURL(LIVE_PRICES_URL, "FENEGOSIDA");
  if (liveResult?.data) return liveResult;

  // 2. Try local live-prices.json (works in dev / same-origin)
  const localResult = await fetchPricesFromURL('/data/live-prices.json', "FENEGOSIDA");
  if (localResult?.data) return localResult;

  // 3. Fallback to hardcoded data
  await new Promise(resolve => setTimeout(resolve, 300));

  return {
    data: {
      fineGoldPerTola: DAILY_PRICES.fineGoldPerTola,
      silverPerTola: DAILY_PRICES.silverPerTola,
      lastUpdated: DAILY_PRICES.lastUpdated,
    },
    sources: [],
    error: undefined,
  };
};
