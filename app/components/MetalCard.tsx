'use client';

import { TOLA_TO_GRAMS } from '@/lib/constants';

interface MetalCardProps {
  metalName: 'Gold' | 'Silver';
  pricePerTola: number;
  colorClass: string;
  icon: React.ReactNode;
}

export default function MetalCard({ metalName, pricePerTola, colorClass, icon }: MetalCardProps) {
  const pricePer10g = (pricePerTola / TOLA_TO_GRAMS) * 10;
  const pricePer1g = pricePerTola / TOLA_TO_GRAMS;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-NP', {
      style: 'currency',
      currency: 'NPR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const isGold = metalName === 'Gold';

  return (
    <div className="card p-4 sm:p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4 sm:mb-5">
        <div className="flex items-center gap-2 sm:gap-3">
            <div className={`p-2 sm:p-2.5 rounded-lg text-lg ${isGold ? 'text-primary' : 'text-gray-500'}`}>
                <div className="w-5 h-5 sm:w-6 sm:h-6">
                    {icon}
                </div>
            </div>
            <h2 className={`text-xl sm:text-2xl font-semibold tracking-tight ${isGold ? 'text-primary' : 'text-gray-600'}`}>
              {metalName}
            </h2>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-gray-700">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Live
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2 sm:pb-3 border-b border-gray-100">
          <span className="text-xs sm:text-sm font-medium text-gray-500">1 Tola</span>
          <span className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight leading-tight">
            {formatCurrency(pricePerTola)}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2 sm:pb-3 border-b border-gray-100">
          <span className="text-xs sm:text-sm font-medium text-gray-500">10 Grams</span>
          <span className="text-base sm:text-lg font-medium text-gray-800 tracking-tight leading-tight">
            {formatCurrency(pricePer10g)}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <span className="text-xs sm:text-sm font-medium text-gray-500">1 Gram</span>
          <span className="text-sm sm:text-base font-medium text-gray-600 tracking-tight leading-tight">
            {formatCurrency(pricePer1g)}
          </span>
        </div>
      </div>
      
      <div className="mt-4 sm:mt-5 text-[10px] sm:text-xs text-gray-500 text-center font-medium">
        1 Tola = {TOLA_TO_GRAMS}g
      </div>
    </div>
  );
}