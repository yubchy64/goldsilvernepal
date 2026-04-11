// ==========================================
// DAILY PRICE CONFIGURATION (FALLBACK)
// ==========================================
//
// This is the last-resort fallback if the live prices
// from the FENEGOSIDA scraper are unavailable.
//
// Live prices are auto-updated via GitHub Actions
// and stored in data/live-prices.json
//
// ==========================================

export const DAILY_PRICES = {
    fineGoldPerTola: 296900,    // Fine Gold Price (NPR per Tola)
    silverPerTola: 4960,        // Silver Price (NPR per Tola)
    lastUpdated: "2026-04-11"   // Date (YYYY-MM-DD)
  };
