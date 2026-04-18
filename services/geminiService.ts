import { ServiceResponse } from "../types";
import { DAILY_PRICES } from "../data/prices";
import { LIVE_PRICES_URL } from "../constants";
import fs from "fs";
import path from "path";

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
            nepaliDate: data.nepaliDate ? String(data.nepaliDate) : undefined,
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

  // 2. Try local live-prices.json (works in dev / server-side)
  try {
    const filePath = path.join(process.cwd(), 'data', 'live-prices.json');
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(fileData);
      if (data.fineGoldPerTola && data.silverPerTola && data.lastUpdated) {
        return {
          data: {
            fineGoldPerTola: Number(data.fineGoldPerTola),
            silverPerTola: Number(data.silverPerTola),
            lastUpdated: String(data.lastUpdated),
            nepaliDate: data.nepaliDate ? String(data.nepaliDate) : undefined,
          },
          sources: [{ web: { uri: "https://fenegosida.org/", title: "FENEGOSIDA (Local Sync)" } }],
          error: undefined,
        };
      }
    }
  } catch (err) {
    console.warn("Failed to read local live-prices.json via fs");
  }

  // 3. Fallback to hardcoded data
  await new Promise(resolve => setTimeout(resolve, 300));

  return {
    data: {
      fineGoldPerTola: DAILY_PRICES.fineGoldPerTola,
      silverPerTola: DAILY_PRICES.silverPerTola,
      lastUpdated: DAILY_PRICES.lastUpdated,
      nepaliDate: DAILY_PRICES.nepaliDate,
    },
    sources: [],
    error: undefined,
  };
};
