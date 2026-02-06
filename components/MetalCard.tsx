import React from 'react';
import { TOLA_TO_GRAMS } from '../constants';

interface MetalCardProps {
  metalName: 'Gold' | 'Silver';
  pricePerTola: number;
  colorClass: string;
  icon: React.ReactNode;
}

const MetalCard: React.FC<MetalCardProps> = ({ metalName, pricePerTola, colorClass, icon }) => {
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

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 sm:p-6 shadow-lg transition-all hover:shadow-xl hover:border-gray-300`}>
      <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-10 ${colorClass}`}></div>
      
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
            <div className={`p-2 sm:p-3 rounded-lg bg-gray-100 ${colorClass.replace('bg-', 'text-')}`}>
                <div className="w-5 h-5 sm:w-6 sm:h-6">
                    {icon}
                </div>
            </div>
            <h2 className={`text-lg sm:text-2xl font-bold ${metalName === 'Gold' ? 'gold-gradient' : 'silver-gradient'}`}>
            {metalName}
            </h2>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {/* Tola */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2 sm:pb-3 border-b border-gray-100">
          <span className="text-xs sm:text-base text-gray-500 font-medium">1 Tola</span>
          <span className="text-lg sm:text-2xl font-bold text-gray-900 tracking-tight leading-tight">
            {formatCurrency(pricePerTola)}
          </span>
        </div>

        {/* 10 Grams */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2 sm:pb-3 border-b border-gray-100">
          <span className="text-xs sm:text-base text-gray-500 font-medium">10 Grams</span>
          <span className="text-base sm:text-xl font-semibold text-gray-800 tracking-tight leading-tight">
            {formatCurrency(pricePer10g)}
          </span>
        </div>

        {/* 1 Gram */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <span className="text-xs sm:text-base text-gray-500 font-medium">1 Gram</span>
          <span className="text-sm sm:text-lg font-semibold text-gray-700 tracking-tight leading-tight">
            {formatCurrency(pricePer1g)}
          </span>
        </div>
      </div>
      
      <div className="mt-4 sm:mt-6 text-[10px] sm:text-xs text-gray-400 text-center">
        1 Tola = {TOLA_TO_GRAMS}g
      </div>
    </div>
  );
};

export default MetalCard;