import React, { useState, useEffect } from 'react';
import { TOLA_TO_GRAMS } from '../constants';

interface PriceCalculatorProps {
  goldPricePerTola: number;
  silverPricePerTola: number;
}

const PriceCalculator: React.FC<PriceCalculatorProps> = ({ goldPricePerTola, silverPricePerTola }) => {
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
      // Unit is Gram
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

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 p-6 shadow-lg h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-700">
          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.202a.75.75 0 001.5 0v-.008c0-.218.276-.52.597-.716.446-.273.818-.62 1.121-.992 1.251-1.529 1.115-3.666-.34-4.903zM12 15.75a.75.75 0 100 1.5.75.75 0 000-1.5z" clipRule="evenodd" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-900">Price Calculator</h3>
      </div>

      <div className="flex flex-col gap-6 flex-grow">
        {/* Metal Selection */}
        <div className="flex p-1 bg-gray-100 rounded-xl">
          <button
            onClick={() => setMetal('Gold')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              metal === 'Gold'
                ? 'bg-white text-yellow-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Gold
          </button>
          <button
            onClick={() => setMetal('Silver')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              metal === 'Silver'
                ? 'bg-white text-slate-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Silver
          </button>
        </div>

        {/* Inputs */}
        <div className="flex gap-3">
          <div className="flex-grow">
            <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">Quantity</label>
            <input
              type="number"
              min="0"
              step="any"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all"
              placeholder="0.00"
            />
          </div>
          <div className="w-1/3 min-w-[100px]">
             <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">Unit</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as 'Tola' | 'Gram')}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all appearance-none cursor-pointer"
            >
              <option value="Tola">Tola</option>
              <option value="Gram">Gram</option>
            </select>
          </div>
        </div>

        {/* Result */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col items-center justify-center text-center mt-auto">
            <span className="text-sm text-gray-500 font-medium mb-1">Estimated Total</span>
            <span className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight break-all">
                {formatCurrency(totalPrice)}
            </span>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;