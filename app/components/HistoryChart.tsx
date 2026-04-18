import React, { useState, useMemo } from 'react';
import { HistoricalDataPoint } from '../../types';

interface HistoryChartProps {
  data: HistoricalDataPoint[];
}

const HistoryChart: React.FC<HistoryChartProps> = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hiddenLines, setHiddenLines] = useState<Set<string>>(new Set());
  
  const svgWidth = 800;
  const svgHeight = 320;
  const padding = { top: 20, right: 20, bottom: 40, left: 70 };
  
  const chartWidth = svgWidth - padding.left - padding.right;
  const chartHeight = svgHeight - padding.top - padding.bottom;

  const { minVal, maxVal, range, getX, getY, formatPrice, formatDate, ticks } = useMemo(() => {
    const goldValues = data.map(d => d.gold);
    const silverValues = data.map(d => d.silver);
    const allValues = [...goldValues, ...silverValues];
    
    const rawMin = Math.min(...allValues);
    const rawMax = Math.max(...allValues);
    const rangePadding = (rawMax - rawMin) * 0.1;
    
    const min = Math.max(0, rawMin - rangePadding);
    const max = rawMax + rangePadding;
    const range = max - min;
    
    const getX = (index: number) => padding.left + (index / (data.length - 1)) * chartWidth;
    const getY = (value: number) => svgHeight - padding.bottom - ((value - min) / range) * chartHeight;
    
    const formatPrice = (val: number) => {
      if (val >= 100000) return `NPR ${(val / 1000).toFixed(0)}k`;
      return `NPR ${val.toLocaleString()}`;
    };
    
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };
    
    const tickCount = 5;
    const ticks = Array.from({ length: tickCount }, (_, i) => 
      min + (range * i) / (tickCount - 1)
    );
    
    return { minVal: min, maxVal: max, range, getX, getY, formatPrice, formatDate, ticks };
  }, [data, chartWidth, chartHeight]);

  const goldPath = useMemo(() => {
    if (hiddenLines.has('gold')) return '';
    return data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.gold)}`).join(' ');
  }, [data, getX, getY, hiddenLines]);

  const silverPath = useMemo(() => {
    if (hiddenLines.has('silver')) return '';
    return data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.silver)}`).join(' ');
  }, [data, getX, getY, hiddenLines]);

  const goldAreaPath = useMemo(() => {
    if (hiddenLines.has('gold') || !goldPath) return '';
    const baselineY = getY(minVal);
    const firstX = getX(0);
    const lastX = getX(data.length - 1);
    return `${goldPath} L ${lastX} ${baselineY} L ${firstX} ${baselineY} Z`;
  }, [goldPath, getX, getY, minVal, data.length, hiddenLines]);

  const silverAreaPath = useMemo(() => {
    if (hiddenLines.has('silver') || !silverPath) return '';
    const baselineY = getY(minVal);
    const firstX = getX(0);
    const lastX = getX(data.length - 1);
    return `${silverPath} L ${lastX} ${baselineY} L ${firstX} ${baselineY} Z`;
  }, [silverPath, getX, getY, minVal, data.length, hiddenLines]);

  const toggleLine = (line: string) => {
    setHiddenLines(prev => {
      const next = new Set(prev);
      if (next.has(line)) {
        next.delete(line);
      } else {
        next.add(line);
      }
      return next;
    });
  };

  const hoveredData = hoveredIndex !== null ? data[hoveredIndex] : null;

  return (
    <div className="card p-5 sm:p-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 tracking-tight">
            7-Day Price Trend
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">NPR per Tola — Interactive chart</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => toggleLine('gold')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              hiddenLines.has('gold') 
                ? 'bg-gray-100 text-gray-400' 
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
            }`}
          >
            <span className={`w-3 h-3 rounded-full transition-all ${hiddenLines.has('gold') ? 'bg-gray-300' : 'bg-gradient-to-br from-amber-500 to-orange-600'}`} />
            <span>Gold</span>
          </button>
          <button 
            onClick={() => toggleLine('silver')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              hiddenLines.has('silver') 
                ? 'bg-gray-100 text-gray-400' 
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className={`w-3 h-3 rounded-full transition-all ${hiddenLines.has('silver') ? 'bg-gray-300' : 'bg-gradient-to-br from-slate-400 to-slate-500'}`} />
            <span>Silver</span>
          </button>
        </div>
      </div>

      <div className="relative">
        <svg 
          viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
          className="w-full h-[300px] sm:h-[340px]"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="silverGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#64748b" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#64748b" stopOpacity="0.05" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g className="grid-lines">
            {ticks.map((tick, i) => (
              <g key={i}>
                <line
                  x1={padding.left}
                  y1={getY(tick)}
                  x2={svgWidth - padding.right}
                  y2={getY(tick)}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
                <text
                  x={padding.left - 10}
                  y={getY(tick)}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="text-xs fill-gray-400 font-medium"
                  style={{ fontSize: '11px' }}
                >
                  {formatPrice(tick)}
                </text>
              </g>
            ))}
          </g>

          {!hiddenLines.has('silver') && silverAreaPath && (
            <path 
              d={silverAreaPath} 
              fill="url(#silverGradient)"
              className="transition-all duration-500"
            />
          )}
          {!hiddenLines.has('gold') && goldAreaPath && (
            <path 
              d={goldAreaPath} 
              fill="url(#goldGradient)"
              className="transition-all duration-500"
            />
          )}

          {!hiddenLines.has('silver') && silverPath && (
            <path 
              d={silverPath} 
              fill="none" 
              stroke="#64748b" 
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              className="transition-all duration-300"
            />
          )}
          {!hiddenLines.has('gold') && goldPath && (
            <path 
              d={goldPath} 
              fill="none" 
              stroke="#f59e0b" 
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              className="transition-all duration-300"
            />
          )}

          {!hiddenLines.has('gold') && data.map((d, i) => (
            <g key={`gold-${i}`}>
              <circle 
                cx={getX(i)} 
                cy={getY(d.gold)} 
                r={hoveredIndex === i ? 6 : 4} 
                fill="#f59e0b"
                stroke="white"
                strokeWidth="2"
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            </g>
          ))}
          
          {!hiddenLines.has('silver') && data.map((d, i) => (
            <g key={`silver-${i}`}>
              <circle 
                cx={getX(i)} 
                cy={getY(d.silver)} 
                r={hoveredIndex === i ? 6 : 4} 
                fill="#64748b"
                stroke="white"
                strokeWidth="2"
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            </g>
          ))}

          <g className="x-axis">
            {data.map((d, i) => (
              <text
                key={i}
                x={getX(i)}
                y={svgHeight - 10}
                textAnchor="middle"
                className="text-xs fill-gray-400"
                style={{ fontSize: '11px' }}
              >
                {formatDate(d.date)}
              </text>
            ))}
          </g>

          {hoveredIndex !== null && (
            <line
              x1={getX(hoveredIndex)}
              y1={padding.top}
              x2={getX(hoveredIndex)}
              y2={svgHeight - padding.bottom}
              stroke="#9ca3af"
              strokeWidth="1"
              strokeDasharray="4,4"
              className="transition-all duration-150"
            />
          )}
        </svg>

        {hoveredData && (
          <div 
            className="absolute pointer-events-none bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-10 min-w-[160px]"
            style={{
              left: hoveredIndex !== null && hoveredIndex > data.length / 2 ? 'auto' : `${(hoveredIndex || 0) / (data.length - 1) * 100}%`,
              right: hoveredIndex !== null && hoveredIndex > data.length / 2 ? `${(data.length - 1 - hoveredIndex) / (data.length - 1) * 100}%` : 'auto',
              top: '20%',
              transform: hoveredIndex !== null && hoveredIndex > data.length / 2 ? 'translateX(20px)' : 'translateX(-20px)'
            }}
          >
            <p className="text-xs text-gray-500 mb-2 font-medium">{formatDate(hoveredData.date)}</p>
            {!hiddenLines.has('gold') && (
              <div className="flex items-center justify-between gap-4 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-sm text-gray-600">Gold</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{formatPrice(hoveredData.gold)}</span>
              </div>
            )}
            {!hiddenLines.has('silver') && (
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-500" />
                  <span className="text-sm text-gray-600">Silver</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{formatPrice(hoveredData.silver)}</span>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
          </svg>
          <p className="text-xs text-gray-500">Hover points for exact values</p>
        </div>
        <p className="text-xs text-gray-400">Source: FENEGOSIDA</p>
      </div>
    </div>
  );
};

export default HistoryChart;