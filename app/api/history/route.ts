import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { HistoricalDataPoint } from '../../../lib/types';

export const dynamic = 'force-dynamic';

const HISTORY_FILE = path.join(process.cwd(), 'public', 'data', 'price-history.json');

/**
 * Load price history from JSON file
 */
async function loadHistory(): Promise<HistoricalDataPoint[]> {
  try {
    const data = await fs.readFile(HISTORY_FILE, 'utf-8');
    const history = JSON.parse(data);
    return history.map((h: any) => ({
      date: h.date,
      gold: h.gold,
      silver: h.silver
    }));
  } catch (error) {
    console.error('Failed to load price history:', error);
    return [];
  }
}

/**
 * Generate simulated historical data for missing days
 */
function generateSimulatedHistory(
  baseGold: number,
  baseSilver: number,
  daysNeeded: number
): HistoricalDataPoint[] {
  const points: HistoricalDataPoint[] = [];
  const today = new Date();

  for (let i = 1; i <= daysNeeded; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);

    // Simulate daily volatility
    const goldVolatility = baseGold * (Math.random() * 0.015 - 0.0075); // +/- 0.75%
    const silverVolatility = baseSilver * (Math.random() * 0.025 - 0.0125); // +/- 1.25%

    const dayGold = Math.round(baseGold - goldVolatility * i);
    const daySilver = Math.round(baseSilver - silverVolatility * i);

    points.unshift({
      date: d.toISOString().split('T')[0],
      gold: dayGold,
      silver: daySilver
    });
  }

  return points;
}

/**
 * Merge real and simulated history to ensure we have 7 days
 */
function mergeHistory(
  realHistory: HistoricalDataPoint[],
  currentGold: number,
  currentSilver: number
): HistoricalDataPoint[] {
  const today = new Date().toISOString().split('T')[0];
  const last7Days: HistoricalDataPoint[] = [];

  // Build last 7 days
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];

    // Check if we have real data for this date
    const realEntry = realHistory.find(h => h.date === dateStr);

    if (realEntry) {
      last7Days.push(realEntry);
    } else if (dateStr === today) {
      // Use current prices for today
      last7Days.push({
        date: today,
        gold: currentGold,
        silver: currentSilver
      });
    }
    // For missing past days, we'll fill them below
  }

  // Fill gaps with simulated data
  const completeHistory: HistoricalDataPoint[] = [];
  let lastKnownGold = currentGold;
  let lastKnownSilver = currentSilver;

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];

    const existing = last7Days.find(h => h.date === dateStr);
    if (existing) {
      completeHistory.push(existing);
      lastKnownGold = existing.gold;
      lastKnownSilver = existing.silver;
    } else {
      // Generate simulated data working backwards from last known price
      const simulatedGold = Math.round(lastKnownGold * (1 + (Math.random() * 0.01 - 0.005)));
      const simulatedSilver = Math.round(lastKnownSilver * (1 + (Math.random() * 0.02 - 0.01)));

      completeHistory.push({
        date: dateStr,
        gold: simulatedGold,
        silver: simulatedSilver
      });

      lastKnownGold = simulatedGold;
      lastKnownSilver = simulatedSilver;
    }
  }

  return completeHistory;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '7', 10);

    // Load real history
    const realHistory = await loadHistory();

    // Get current prices (use last known if available)
    const latestEntry = realHistory[realHistory.length - 1];
    const currentGold = latestEntry?.gold || 297100;
    const currentSilver = latestEntry?.silver || 4975;

    // Merge real and simulated data
    const completeHistory = mergeHistory(realHistory, currentGold, currentSilver);

    // Return only requested number of days
    const result = completeHistory.slice(-days);

    return NextResponse.json({
      data: result,
      meta: {
        daysReturned: result.length,
        realEntries: result.filter(r => realHistory.some(h => h.date === r.date)).length,
        simulatedEntries: result.filter(r => !realHistory.some(h => h.date === r.date)).length
      }
    });
  } catch (error) {
    console.error('History API error:', error);
    return NextResponse.json(
      { data: [], error: 'Failed to fetch price history', meta: {} },
      { status: 500 }
    );
  }
}
