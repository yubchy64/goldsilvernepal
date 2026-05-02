import React from 'react';
import { HistoricalDataPoint } from '../../types';
import { TOLA_TO_GRAMS } from '../../constants';

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

  const isGold = metalName === 'Gold';

  const StackedMetalsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" className="w-16 h-16 flex-shrink-0 -ml-2">
      <defs>
        <linearGradient id="silverGrad0" x1="8.605" x2="247.4" y1="162.3" y2="162.3" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#96999E"/>
          <stop offset="12%" stopColor="#B2B5BB"/>
          <stop offset="27%" stopColor="#CECFD3"/>
          <stop offset="39%" stopColor="#E0E1E4"/>
          <stop offset="47%" stopColor="#E7E8EA"/>
          <stop offset="57%" stopColor="#D7D9DC"/>
          <stop offset="78%" stopColor="#AFB1B6"/>
          <stop offset="100%" stopColor="#828387"/>
        </linearGradient>
        <linearGradient id="silverGrad1" x1="133.8" x2="247.4" y1="164.8" y2="164.8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7C7D81"/>
          <stop offset="100%" stopColor="#B8BAC0"/>
        </linearGradient>
        <linearGradient id="silverGrad2" x1="27.95" x2="224.5" y1="129.3" y2="129.3" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A9ADB2"/>
          <stop offset="16%" stopColor="#CED0D4"/>
          <stop offset="31%" stopColor="#E9EAEC"/>
          <stop offset="40%" stopColor="#F2F3F4"/>
          <stop offset="51%" stopColor="#E6E8E9"/>
          <stop offset="70%" stopColor="#C7C9CD"/>
          <stop offset="95%" stopColor="#95989E"/>
          <stop offset="100%" stopColor="#8A8D94"/>
        </linearGradient>
        <linearGradient id="silverGrad3" x1="48.84" x2="74.7" y1="162.3" y2="219.5" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#94979D"/>
          <stop offset="99%" stopColor="#ECEDEF"/>
        </linearGradient>
        <linearGradient id="silverGrad4" x1="27.95" x2="224.5" y1="175.4" y2="175.4" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A4A8AE"/>
          <stop offset="52%" stopColor="#F8FBFE"/>
          <stop offset="58%" stopColor="#F5F8FB"/>
          <stop offset="65%" stopColor="#E8EAED"/>
          <stop offset="71%" stopColor="#D4D6D9"/>
          <stop offset="77%" stopColor="#B8BABF"/>
          <stop offset="82%" stopColor="#96989D"/>
          <stop offset="85%" stopColor="#82858B"/>
        </linearGradient>
        <linearGradient id="goldGrad5" x1="3.293" x2="238.5" y1="87.53" y2="87.53" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D7A250"/>
          <stop offset="51%" stopColor="#F1B036"/>
          <stop offset="100%" stopColor="#CA872F"/>
        </linearGradient>
        <linearGradient id="goldGrad6" x1="66.95" x2="77" y1="62.98" y2="128.1" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FCE797"/>
          <stop offset="100%" stopColor="#EBB54C"/>
        </linearGradient>
        <linearGradient id="goldGrad7" x1="19.09" x2="213.8" y1="74.78" y2="74.78" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF09A"/>
          <stop offset="48%" stopColor="#fe9"/>
          <stop offset="66%" stopColor="#FEE693"/>
          <stop offset="79%" stopColor="#FBD788"/>
          <stop offset="90%" stopColor="#F6C178"/>
          <stop offset="100%" stopColor="#F1A965"/>
        </linearGradient>
        <linearGradient id="goldGrad8" x1="19.09" x2="146.8" y1="53.62" y2="53.62" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E49938"/>
          <stop offset="51%" stopColor="#FCE37A"/>
          <stop offset="100%" stopColor="#D79339"/>
        </linearGradient>
        <linearGradient id="goldGrad9" x1="93.69" x2="238.5" y1="93.68" y2="93.68" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C26E2A"/>
          <stop offset="52%" stopColor="#CB8531"/>
          <stop offset="100%" stopColor="#D99D37"/>
        </linearGradient>
        <linearGradient id="goldGrad10" x1="3.047" x2="68.68" y1="88.73" y2="88.73" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C7893A"/>
          <stop offset="100%" stopColor="#BC742A"/>
        </linearGradient>
      </defs>
      
      {isGold ? (
        <>
          <path d="m146.2 25-127.2 36.71-15.67 54.02 90.62 34.33 144.6-70.08-24.67-42.39-67.67-12.59z" fill="url(#goldGrad5)"/>
          <path d="m19.09 61.74 64.9 20.97 16.19-0.5 113.6-44.91-110.4 48.92-9.71 63.84-12.51-63.41-12.44-3.94-49.72-20.97z" fill="url(#goldGrad6)"/>
          <path d="m213.8 37.31-110.4 48.91-21.55 0.52-62.84-25 64.9 20.97 16.19-0.5 113.6-44.9z" fill="url(#goldGrad7)"/>
          <path d="m146 25-46.16 56.79-15.83 0.42-64.9-20.47 126.9-36.74z" fill="url(#goldGrad8)"/>
          <path d="m213.8 37.31 24.68 42.69-144.8 70.06 10-63.85 110.1-48.9z" fill="url(#goldGrad9)"/>
          <path d="m19.09 61.74-10.81 30.99-5.23 23 65.63-33.04-49.59-20.95z" fill="url(#goldGrad10)"/>
        </>
      ) : (
        <>
          <path d="m247.4 146.8-23.03-41.08 0.06-0.03-0.19-0.35-28.24-4.62-154.8 29.13-13.31 4.72-19.34 54.07 92.16 35.24 146.6-77.08z" fill="url(#silverGrad0)"/>
          <path d="m224.5 105.7 22.96 41.12-146.6 77.07 123.7-118.2z" fill="url(#silverGrad1)"/>
          <path d="m224.4 105.7-119.3 52.27-13.52 0.32-63.69-23.1 13.27-4.72 154.8-29.74 28.42 4.97z" fill="url(#silverGrad2)"/>
          <path d="m100.8 223.9-91.75-35.48 67.16-30.67 12.3 5.99 12.29 60.16z" fill="url(#silverGrad3)"/>
          <path d="m27.95 135.2 63.91 23.24 13.35-0.41 119.2-52.32-114.4 57.28-9.26 60.91-12.2-60.19-12.11-6-48.51-22.51z" fill="url(#silverGrad4)"/>
        </>
      )}
    </svg>
  );

  return (
    <div
      className="card relative overflow-hidden p-6 md:p-8 animate-fade-in"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.04)' }}
    >
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className={`flex items-center gap-3 ${isGold ? 'text-primary' : 'text-[#9ca3af]'}`}>
            <StackedMetalsIcon />
            <h2 className={`text-2xl sm:text-3xl font-bold heading-tight ${isGold ? 'text-primary' : 'text-[#262626]'}`}>
                {metalName}
            </h2>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-[#262626]">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Live
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 border-b border-gray-100">
          <span className="text-sm font-medium text-[#9ca3af]">1 Tola</span>
          <span className="text-2xl sm:text-3xl font-bold heading-tight text-[#262626] leading-tight tracking-tight">
            {formatCurrency(pricePerTola)}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 border-b border-gray-100">
          <span className="text-sm font-medium text-[#9ca3af]">10 Grams</span>
          <span className="text-lg sm:text-xl font-bold text-[#262626] heading-tight leading-tight tracking-tight">
            {formatCurrency(pricePer10g)}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-4">
          <span className="text-sm font-medium text-[#9ca3af]">1 Gram</span>
          <span className="text-base sm:text-lg font-bold text-[#262626] heading-tight leading-tight tracking-tight">
            {formatCurrency(pricePer1g)}
          </span>
        </div>
      </div>

      <div className="mt-6 text-xs text-[#9ca3af] text-center font-medium">
        1 Tola = {TOLA_TO_GRAMS}g
      </div>
    </div>
  );
};

export default MetalCard;