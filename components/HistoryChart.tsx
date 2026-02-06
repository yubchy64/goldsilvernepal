import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { HistoricalDataPoint } from '../types';

interface HistoryChartProps {
  data: HistoricalDataPoint[];
}

const HistoryChart: React.FC<HistoryChartProps> = ({ data }) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">7-Day Price Trend (NPR/Tola)</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis 
                dataKey="date" 
                stroke="#6b7280" 
                tick={{ fill: '#6b7280' }} 
                tickLine={false}
                axisLine={false}
            />
            <YAxis 
                stroke="#6b7280" 
                tick={{ fill: '#6b7280' }} 
                tickLine={false}
                axisLine={false}
                domain={['auto', 'auto']}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb', color: '#111827', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: '#111827' }}
                formatter={(value: number) => [`NPR ${value.toLocaleString()}`, 'Price']}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }}/>
            <Line 
                type="monotone" 
                dataKey="gold" 
                name="Fine Gold" 
                stroke="#ca8a04" 
                strokeWidth={3} 
                dot={{ fill: '#ca8a04', r: 4 }} 
                activeDot={{ r: 6 }}
            />
            <Line 
                type="monotone" 
                dataKey="silver" 
                name="Silver" 
                stroke="#64748b" 
                strokeWidth={3} 
                dot={{ fill: '#64748b', r: 4 }} 
                activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HistoryChart;