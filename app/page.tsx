import { fetchLivePrices } from '../services/geminiService';
import AppClient from './AppClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gold Price Nepal: Today Gold Rate Per Tola (NRs 160,500) | Live 24K Silver Price',
  description: 'Gold price Nepal today: Check live gold rate per tola in NPR. Get current 24K gold price and silver rate in Nepal per tola and gram. Daily updated from FENEGOSIDA.',
};

export const dynamic = 'force-dynamic';

export default async function Home() {
  const response = await fetchLivePrices();

  return (
    <AppClient
      initialData={response.data ? { data: response.data, sources: response.sources } : undefined}
    />
  );
}