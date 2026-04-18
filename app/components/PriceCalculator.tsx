'use client';

import { useState, useEffect } from 'react';
import { TOLA_TO_GRAMS } from '@/lib/constants';

interface PriceCalculatorProps {
  goldPricePerTola: number;
  silverPricePerTola: number;
}

export default function PriceCalculator({ goldPricePerTola, silverPricePerTola }: PriceCalculatorProps) {
  const [metal, setMetal] = useState<'Gold' | 'Silver'>('Gold');
  const [quantity, setQuantity] = useState<string>('1');
  const [unit, setUnit] = useState<'Tola' | 'Gram'>('Tola');
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const qty = parseFloat(quantity);
    if (isNaN(qty) || qty < 0) {
      setTotalPrice(0);
      return;
    }

    const pricePerTola = metal === 'Gold' ? goldPricePerTola : silverPricePerTola;

    let calculatedPrice = 0;
    if (unit === 'Tola') {
      calculatedPrice = qty * pricePerTola;
    } else {
      const pricePerGram = pricePerTola / TOLA_TO_GRAMS;
      calculatedPrice = qty * pricePerGram;
    }

    setTotalPrice(calculatedPrice);
  }, [metal, quantity, unit, goldPricePerTola, silverPricePerTola]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-NP', {
      style: 'currency',
      currency: 'NPR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const isGold = metal === 'Gold';

  return (
    <div className="card p-5 sm:p-6 h-full flex flex-col">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="p-2 rounded-lg bg-gray-100 text-[#9ca3af]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.202a.75.75 0 001.5 0v-.008c0-.218.276-.52.597-.716.446-.273.818-.62 1.121-.992 1.251-1.529 1.115-3.666-.34-4.903zM12 15.75a.75.75 0 100 1.5.75.75 0 000-1.5z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold heading-tight text-[#262626]">Calculator</h3>
      </div>

      <div className="flex flex-col gap-5 flex-grow">
        <div role="group" aria-label="Select metal type" className="flex p-1 bg-gray-100/80 rounded-xl">
          <button
            onClick={() => setMetal('Gold')}
            aria-pressed={isGold}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              isGold
                ? 'bg-primary text-white shadow-sm'
                : 'text-[#262626] hover:text-[#262626] hover:bg-gray-50'
            }`}
          >
            Gold
          </button>
          <button
            onClick={() => setMetal('Silver')}
            aria-pressed={!isGold}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              !isGold
                ? 'bg-primary text-white shadow-sm'
                : 'text-[#262626] hover:text-[#262626] hover:bg-gray-50'
            }`}
          >
            Silver
          </button>
        </div>

        <div className="flex gap-3">
          <div className="flex-grow">
            <label htmlFor="quantity" className="block text-xs font-medium text-[#9ca3af] mb-1.5 ml-1">Quantity</label>
            <input
              id="quantity"
              type="number"
              min="0"
              step="any"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="input w-full px-4 py-3 text-[#262626] placeholder-[#9ca3af]"
              placeholder="0.00"
              aria-describedby="quantity-desc"
            />
            <span id="quantity-desc" className="sr-only">Enter the amount of gold or silver in tola or grams</span>
          </div>
          <div className="w-24">
             <label htmlFor="unit" className="block text-xs font-medium text-[#9ca3af] mb-1.5 ml-1">Unit</label>
            <select
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value as 'Tola' | 'Gram')}
              className="input w-full px-4 py-3 text-[#262626]"
            >
              <option value="Tola">Tola</option>
              <option value="Gram">Gram</option>
            </select>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col items-center justify-center text-center mt-auto">
            <span className="text-xs font-medium text-[#9ca3af] mb-1">Estimated Total</span>
            <span className="text-2xl sm:text-3xl font-semibold heading-tight text-[#262626] break-all">
                {formatCurrency(totalPrice)}
            </span>
        </div>
      </div>
    </div>
  );
}