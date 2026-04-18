import { NextResponse } from 'next/server';
import { fetchLivePrices } from '../../../services/geminiService';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const response = await fetchLivePrices();
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to fetch prices', sources: [] },
      { status: 500 }
    );
  }
}