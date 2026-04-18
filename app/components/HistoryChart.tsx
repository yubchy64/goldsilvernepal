'use client';

import { HistoricalDataPoint } from '@/lib/types';

interface HistoryChartProps {
  data: HistoricalDataPoint[];
}

export default function HistoryChart({ data }: HistoryChartProps) {
  const width = 100;
  const height = 50;
  const padding = 10;

  const goldValues = data.map(d => d.gold);
  const silverValues = data.map(d => d.silver);
  const allValues = [...goldValues, ...silverValues];
  
  const minVal = Math.min(...allValues) * 0.98;
  const maxVal = Math.max(...allValues) * 1.02;
  const range = maxVal - minVal;

  const getX = (index: number) => padding + (index / (data.length - 1)) * (width - padding * 2);
  const getY = (value: number) => height - padding - ((value - minVal) / range) * (height - padding * 2);

  const goldPath = data.map((d, i) => 
    `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.gold)}`
  ).join(' ');

  const silverPath = data.map((d, i) => 
    `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.silver)}`
  ).join(' ');

  const formatPrice = (val: number) => {
    if (val >= 100000) return `${(val / 1000).toFixed(0)}k`;
    return val.toLocaleString();
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(p => minVal + range * p);

  return (
    <div className="card p-5 sm:p-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold heading-tight text-[#262626]">
            7-Day Price Trend
          </h3>
          <p className="text-sm text-[#9ca3af] mt-1">NPR per Tola</p>
        </div>

        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm font-medium text-[#262626]">Gold</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-400" />
            <span className="text-sm font-medium text-[#262626]">Silver</span>
          </div>
        </div>
      </div>

      <div className="relative h-[280px] sm:h-[300px] w-full">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
          {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
            <line
              key={i}
              x1={padding}
              y1={padding + (p * (height - padding * 2))}
              x2={width - padding}
              y2={padding + (p * (height - padding * 2))}
              stroke="#e5e7eb"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
          ))}

          {data.map((_, i) => (
            <line
              key={i}
              x1={getX(i)}
              y1={padding}
              x2={getX(i)}
              y2={height - padding}
              stroke="#f3f4f6"
              strokeWidth="2"
            />
          ))}

          <path d={goldPath} fill="none" stroke="#C4460E" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <path d={silverPath} fill="none" stroke="#9ca3af" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />

          {data.map((d, i) => (
            <g key={i}>
              <circle cx={getX(i)} cy={getY(d.gold)} r="1.5" fill="#C4460E" />
              <circle cx={getX(i)} cy={getY(d.silver)} r="1.5" fill="#9ca3af" />
            </g>
          ))}
        </svg>

        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-[#9ca3af] px-2">
          {data.map((d, i) => (
            <span key={i}>{i === 0 || i === data.length - 1 ? formatDate(d.date) : ''}</span>
          ))}
        </div>

        <div className="absolute top-0 left-0 flex flex-col text-xs text-[#9ca3af] gap-1">
          {yTicks.map((t, i) => (
            <span key={i} className={i === 0 ? 'opacity-0' : ''}>NPR {formatPrice(t)}</span>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
        <p className="text-xs text-[#9ca3af]">Prices via FENEGOSIDA</p>
        <p className="text-xs text-[#9ca3af]">Last 7 days</p>
      </div>
    </div>
  );
}