"""
Scrape today's gold and silver prices from FENEGOSIDA
and save as a JSON file for the web app to consume.

Based on the approach from: https://github.com/ChandanShakya/goldmandu
"""

import json
import re
import requests
from datetime import datetime

FENEGOSIDA_URL = "https://www.fenegosida.org/rate-history.php"
OUTPUT_FILE = "data/live-prices.json"

# Nepali month names used by FENEGOSIDA
NEPALI_MONTHS = [
    "Baisakh", "Jestha", "Ashad", "Shrawan",
    "Bhadra", "Ashoj", "Kartik", "Mansir",
    "Poush", "Magh", "Falgun", "Chaitra"
]

# Nepali New Year is around mid-April
# Rough mapping: AD month -> likely BS month index (0-based)
AD_TO_BS_MONTH_APPROX = {
    1: 9,   # Jan  -> Poush
    2: 10,  # Feb  -> Magh
    3: 10,  # Mar  -> Falgun
    4: 0,   # Apr  -> Chaitra/Baisakh (transition)
    5: 0,   # May  -> Baisakh/Jestha
    6: 1,   # Jun  -> Jestha/Ashad
    7: 2,   # Jul  -> Ashad/Shrawan
    8: 3,   # Aug  -> Shrawan/Bhadra
    9: 4,   # Sep  -> Bhadra/Ashoj
    10: 5,  # Oct  -> Ashoj/Kartik
    11: 6,  # Nov  -> Kartik/Mansir
    12: 8,  # Dec  -> Mansir/Poush
}


def get_current_nepali_year():
    """Approximate current Nepali year (BS ~ AD + 57)."""
    now = datetime.now()
    return now.year + 57


def scrape_fenegosida(year, month):
    """POST to FENEGOSIDA rate-history page and return HTML."""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    payload = {
        'year': str(year),
        'month': month,
        'submit': 'Submit'
    }

    response = requests.post(FENEGOSIDA_URL, data=payload, headers=headers, timeout=30)
    response.raise_for_status()
    return response.text


def parse_tola_table(html):
    """Extract per-tola prices from the first table_rate_month in HTML."""
    pattern = r'<th>(\d+)</th><td>FINE GOLD \(9999\):\s*<b>([\d,]+\.?\d*)</b>.*?Silver:\s*<b>([\d,]+\.?\d*)</b>'
    matches = re.findall(pattern, html, re.DOTALL)

    results = []
    for day, gold_str, silver_str in matches:
        gold = float(gold_str.replace(',', ''))
        silver = float(silver_str.replace(',', ''))
        results.append({
            'day': int(day),
            'fineGoldPerTola': gold,
            'silverPerTola': silver,
        })

    return results


def get_latest_prices():
    """
    Smart scraping: start from the current Nepali month and work backwards
    until we find data. Returns the most recent day's prices.
    """
    nepali_year = get_current_nepali_year()
    start_month_idx = AD_TO_BS_MONTH_APPROX.get(datetime.now().month, 0)

    # Try current and previous months in both current and previous years
    attempts = []
    for year_offset in range(2):
        year = nepali_year - year_offset
        # Start from likely current month, go backwards
        for offset in range(12):
            month_idx = (start_month_idx - offset) % 12
            # If we wrapped around to a higher index, we're in the previous year
            actual_year = year if (start_month_idx - offset) >= 0 else year - 1
            if actual_year != year:
                continue  # Skip, will be covered by year_offset loop
            attempts.append((actual_year, NEPALI_MONTHS[month_idx]))

    for year, month in attempts:
        try:
            print(f"  Trying {year} {month}...")
            html = scrape_fenegosida(year, month)
            prices = parse_tola_table(html)
            if prices:
                latest = max(prices, key=lambda x: x['day'])
                latest['month'] = month
                latest['year'] = year
                return latest
        except Exception as e:
            print(f"  Failed: {e}")
            continue

    return None


def main():
    print("Scraping FENEGOSIDA for latest gold & silver prices...")

    result = get_latest_prices()
    if not result:
        print("ERROR: Could not scrape any prices!")
        exit(1)

    today_str = datetime.now().strftime('%Y-%m-%d')

    output = {
        "fineGoldPerTola": result['fineGoldPerTola'],
        "silverPerTola": result['silverPerTola'],
        "fineGoldPer10Gram": round(result['fineGoldPerTola'] / 11.6638 * 10, 2),
        "silverPer10Gram": round(result['silverPerTola'] / 11.6638 * 10, 2),
        "lastUpdated": today_str,
        "source": "FENEGOSIDA",
        "nepaliDate": f"{result['year']} {result['month']} {result['day']}"
    }

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    print(f"\nSuccess! Prices saved to {OUTPUT_FILE}")
    print(f"  Fine Gold (per tola): NPR {output['fineGoldPerTola']:,.0f}")
    print(f"  Silver (per tola):    NPR {output['silverPerTola']:,.0f}")
    print(f"  Last Updated:         {output['lastUpdated']}")
    print(f"  Nepali Date:          {output['nepaliDate']}")


if __name__ == "__main__":
    main()
