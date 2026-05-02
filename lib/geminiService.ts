import { ServiceResponse } from "./types";
import { DAILY_PRICES } from "./prices";
import { LIVE_PRICES_URL } from "./constants";

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

export const fetchLivePrices = async (): Promise<ServiceResponse> => {
  const liveResult = await fetchPricesFromURL(LIVE_PRICES_URL, "FENEGOSIDA");
  if (liveResult?.data) return liveResult;

  const localResult = await fetchPricesFromURL('/data/live-prices.json', "FENEGOSIDA");
  if (localResult?.data) return localResult;

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