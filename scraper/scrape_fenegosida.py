"""
Scrape today's gold and silver prices from FENEGOSIDA
and save as a JSON file for the web app to consume.

The FENEGOSIDA rate-history.php page always shows today's prices
in the header section. We simply GET the page and parse the prices.
"""

import json
import re
import requests
from datetime import datetime

# URLs to try (in order of preference)
URLS_TO_TRY = [
    "https://fenegosida.org/rate-history.php",
    "https://www.fenegosida.org/rate-history.php",
]

OUTPUT_FILE = "data/live-prices.json"
HISTORY_FILE = "public/data/price-history.json"
MAX_HISTORY_DAYS = 30


def fetch_page():
    """GET the FENEGOSIDA rate-history page, trying multiple URLs."""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    }

    last_error = None
    for url in URLS_TO_TRY:
        try:
            print(f"  Trying URL: {url}")
            response = requests.get(url, headers=headers, timeout=30, allow_redirects=True)
            print(f"  Status: {response.status_code}, Final URL: {response.url}, Length: {len(response.text)}")

            if response.status_code == 200 and len(response.text) > 2000:
                return response.text
            else:
                print(f"  Response too short or wrong status, trying next...")
        except requests.exceptions.ConnectionError as e:
            print(f"  Connection error: {e}")
            last_error = e
        except requests.exceptions.Timeout as e:
            print(f"  Timeout: {e}")
            last_error = e
        except Exception as e:
            print(f"  Failed: {e}")
            last_error = e

    raise last_error if last_error else Exception("All URLs failed")


def extract_price(div_text):
    """Extract the numeric price from a div's <b> tag."""
    match = re.search(r'<b>([^<]+)</b>', div_text)
    if match:
        return float(match.group(1).replace(',', ''))
    return None


def parse_todays_prices(html):
    """
    Parse today's prices from the FENEGOSIDA page header.

    The page header has two vtab sections:
    - Tab 1 (gms): per 10 gram prices
    - Tab 2 (tola): per 1 tola prices

    Only divs with class "post" have today's live prices.
    Divs without "post" are for query results and are empty.

    Gold divs order: [0]=Fine Gold per 10gm, [1]=Tejabi per 10gm,
                     [2]=Fine Gold per tola, [3]=Tejabi per tola
    Silver divs order: [0]=Silver per 10gm, [1]=Silver per tola

    Date is in:
      <div class="rate-date-day">29</div>
      <div class="rate-date-month">Chaitra</div>
      <div class="rate-date-year">2082</div>
    """
    # Find all rate-gold post divs
    gold_divs = re.findall(r'<div class="rate-gold post">(.*?)</div>', html, re.DOTALL)

    # Find all rate-silver post divs
    silver_divs = re.findall(r'<div class="rate-silver post">(.*?)</div>', html, re.DOTALL)

    print(f"  Found {len(gold_divs)} gold divs, {len(silver_divs)} silver divs")

    if len(gold_divs) < 2 or len(silver_divs) < 2:
        raise ValueError(f"Expected at least 2 gold and 2 silver divs, got {len(gold_divs)} and {len(silver_divs)}")

    gold_tola = extract_price(gold_divs[2])
    silver_tola = extract_price(silver_divs[1])
    gold_10gm = extract_price(gold_divs[0])
    silver_10gm = extract_price(silver_divs[0])

    # Extract the Nepali date
    day_match = re.search(r'rate-date-day[^>]*>(\d+)<', html)
    month_match = re.search(r'rate-date-month[^>]*>([^<]+)<', html)
    year_match = re.search(r'rate-date-year[^>]*>([^<]+)<', html)

    if not gold_tola or not silver_tola:
        raise ValueError(f"Could not parse prices: gold_tola={gold_tola}, silver_tola={silver_tola}")

    result = {
        'fineGoldPerTola': gold_tola,
        'silverPerTola': silver_tola,
        'fineGoldPer10Gram': gold_10gm,
        'silverPer10Gram': silver_10gm,
        'nepaliDay': day_match.group(1) if day_match else None,
        'nepaliMonth': month_match.group(1).strip() if month_match else None,
        'nepaliYear': year_match.group(1).strip() if year_match else None,
    }

    return result


def load_history():
    """Load existing price history from file."""
    try:
        with open(HISTORY_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []


def save_history(history):
    """Save price history to file, keeping only last MAX_HISTORY_DAYS entries."""
    # Sort by date (oldest first)
    history.sort(key=lambda x: x['date'])
    # Keep only last N days
    if len(history) > MAX_HISTORY_DAYS:
        history = history[-MAX_HISTORY_DAYS:]
    with open(HISTORY_FILE, 'w', encoding='utf-8') as f:
        json.dump(history, f, indent=2, ensure_ascii=False)


def update_history(gold_price, silver_price, date_str):
    """Update price history with today's prices."""
    history = load_history()

    # Check if entry for today already exists
    existing_entry = next((h for h in history if h['date'] == date_str), None)

    new_entry = {
        "date": date_str,
        "gold": int(gold_price),
        "silver": int(silver_price),
        "source": "FENEGOSIDA"
    }

    if existing_entry:
        # Update existing entry
        existing_entry.update(new_entry)
        print(f"  Updated existing entry for {date_str}")
    else:
        # Add new entry
        history.append(new_entry)
        print(f"  Added new entry for {date_str}")

    save_history(history)
    print(f"  History saved to {HISTORY_FILE} ({len(history)} entries)")


def main():
    print("Scraping FENEGOSIDA for today's gold & silver prices...")

    html = fetch_page()
    result = parse_todays_prices(html)

    today_str = datetime.now().strftime('%Y-%m-%d')

    output = {
        "fineGoldPerTola": result['fineGoldPerTola'],
        "silverPerTola": result['silverPerTola'],
        "fineGoldPer10Gram": result['fineGoldPer10Gram'] or round(result['fineGoldPerTola'] / 11.6638 * 10, 2),
        "silverPer10Gram": result['silverPer10Gram'] or round(result['silverPerTola'] / 11.6638 * 10, 2),
        "lastUpdated": today_str,
        "source": "FENEGOSIDA",
        "nepaliDate": f"{result['nepaliYear']} {result['nepaliMonth']} {result['nepaliDay']}"
    }

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    print(f"\nSuccess! Prices saved to {OUTPUT_FILE}")
    print(f"  Fine Gold (per tola):  NPR {output['fineGoldPerTola']:,.0f}")
    print(f"  Silver (per tola):     NPR {output['silverPerTola']:,.0f}")
    print(f"  Fine Gold (per 10gm):  NPR {output['fineGoldPer10Gram']:,.0f}")
    print(f"  Silver (per 10gm):     NPR {output['silverPer10Gram']:,.2f}")
    print(f"  Last Updated:          {output['lastUpdated']}")
    print(f"  Nepali Date:           {output['nepaliDate']}")

    # Update price history
    print("\nUpdating price history...")
    update_history(result['fineGoldPerTola'], result['silverPerTola'], today_str)


if __name__ == "__main__":
    main()
