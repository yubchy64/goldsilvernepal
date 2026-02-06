export interface PriceData {
  fineGoldPerTola: number;
  silverPerTola: number;
  lastUpdated: string;
}

export interface ConvertedPrice {
  unit: string;
  gold: number;
  silver: number;
}

export interface HistoricalDataPoint {
  date: string;
  gold: number;
  silver: number;
}

export interface GroundingSource {
  web?: {
    uri: string;
    title: string;
  };
}

export interface ServiceResponse {
  data: PriceData | null;
  sources: GroundingSource[];
  error?: string;
}
