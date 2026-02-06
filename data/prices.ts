// ==========================================
// DAILY PRICE CONFIGURATION (FALLBACK)
// ==========================================
//
// HOW TO UPDATE PRICES SECURELY:
// 
// Option 1 (Easy): Edit this file directly in your source code and redeploy. 
// The public cannot edit this file; they only download the result.
//
// Option 2 (Advanced): Create a JSON file on GitHub Gist (raw) or JSONBin.
// Paste the URL into `constants.ts` (REMOTE_PRICES_URL).
// Then you can edit the Gist online, and the app updates automatically.
//
// ==========================================

export const DAILY_PRICES = {
    fineGoldPerTola: 160500,  // Current Fine Gold Price
    silverPerTola: 1925,      // Current Silver Price
    lastUpdated: "2024-05-25" // Today's Date (YYYY-MM-DD)
  };