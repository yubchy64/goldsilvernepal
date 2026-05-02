'use client';

import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExecuteFn = (params: any) => Promise<unknown>;

interface Tool {
  name: string;
  description: string;
  inputSchema: object;
  execute: ExecuteFn;
}

const tools: Tool[] = [
  {
    name: 'get_current_prices',
    description: 'Get current gold and silver prices in Nepal',
    inputSchema: {
      type: 'object',
      properties: {},
    },
    execute: async () => {
      const res = await fetch('/api/prices');
      return res.json();
    },
  },
  {
    name: 'get_price_history',
    description: 'Get historical price data for gold or silver',
    inputSchema: {
      type: 'object',
      properties: {
        metal: {
          type: 'string',
          enum: ['gold', 'silver'],
          description: 'The metal type',
        },
        days: {
          type: 'number',
          description: 'Number of days of history (default: 30)',
        },
      },
    },
    execute: async (params: { metal?: string; days?: number }) => {
      const query = new URLSearchParams();
      if (params.metal) query.set('metal', params.metal);
      if (params.days) query.set('days', params.days.toString());
      const res = await fetch(`/api/history?${query.toString()}`);
      return res.json();
    },
  },
  {
    name: 'calculate_investment',
    description: 'Calculate investment value for gold or silver',
    inputSchema: {
      type: 'object',
      properties: {
        metal: {
          type: 'string',
          enum: ['gold', 'silver'],
          description: 'The metal type',
        },
        quantity: {
          type: 'number',
          description: 'Quantity',
        },
        unit: {
          type: 'string',
          enum: ['tola', 'gram'],
          description: 'Unit of measurement',
        },
      },
      required: ['metal', 'quantity', 'unit'],
    },
    execute: async (params: { metal: string; quantity: number; unit: string }) => {
      const res = await fetch('/api/prices');
      const prices = await res.json();
      const priceKey = params.metal === 'gold' ? 'gold' : 'silver';
      const pricePerTola = prices[priceKey]?.per_tola || 0;
      const pricePerGram = prices[priceKey]?.per_gram || 0;
      const quantityInTola = params.unit === 'gram' ? params.quantity / 11.664 : params.quantity;
      const value = quantityInTola * pricePerTola;
      return {
        metal: params.metal,
        quantity: params.quantity,
        unit: params.unit,
        pricePerTola,
        pricePerGram,
        totalValue: value,
        currency: 'NPR',
      };
    },
  },
  {
    name: 'get_investment_guide',
    description: 'Get investment guide for precious metals in Nepal',
    inputSchema: {
      type: 'object',
      properties: {},
    },
    execute: async () => {
      return {
        guide: 'Investment in gold and silver in Nepal is traditionally done through jewelers and banks.',
        tips: [
          'Buy from authorized dealers',
          'Check for hallmark certifications',
          'Consider storage options',
          'Monitor daily price updates',
        ],
        source: '/#guide',
      };
    },
  },
  {
    name: 'get_faq',
    description: 'Get frequently asked questions about precious metals in Nepal',
    inputSchema: {
      type: 'object',
      properties: {},
    },
    execute: async () => {
      return {
        faqs: [
          {
            q: 'What is the current gold price in Nepal?',
            a: 'Check /api/prices for real-time prices',
          },
          {
            q: 'How is gold price determined in Nepal?',
            a: 'Based on international rates plus import duties and margins',
          },
          {
            q: 'Where can I buy gold in Nepal?',
            a: 'Authorized jewelers, banks, and gold trading centers',
          },
        ],
        source: '/#faq',
      };
    },
  },
  {
    name: 'get_historical_analysis',
    description: 'Get historical price analysis and trends',
    inputSchema: {
      type: 'object',
      properties: {
        metal: {
          type: 'string',
          enum: ['gold', 'silver'],
          description: 'The metal type',
        },
        period: {
          type: 'string',
          enum: ['7d', '30d', '90d', '1y'],
          description: 'Time period for analysis',
        },
      },
    },
    execute: async (params: { metal?: string; period?: string }) => {
      const days = params.period === '7d' ? 7 : params.period === '30d' ? 30 : params.period === '90d' ? 90 : 365;
      const query = new URLSearchParams();
      if (params.metal) query.set('metal', params.metal);
      query.set('days', days.toString());
      const res = await fetch(`/api/history?${query.toString()}`);
      const data = await res.json();
      return {
        metal: params.metal || 'all',
        period: params.period || '30d',
        data,
        source: '/#analysis',
      };
    },
  },
];

export default function WebMCPProvider() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'modelContext' in navigator) {
      const toolDefinitions = tools.map(tool => ({
        name: tool.name,
        description: tool.description,
        inputSchema: tool.inputSchema,
        execute: tool.execute,
      }));

      (navigator as unknown as { modelContext: { provideContext: (tools: unknown[]) => void } }).modelContext.provideContext(toolDefinitions);
    }
  }, []);

  return null;
}