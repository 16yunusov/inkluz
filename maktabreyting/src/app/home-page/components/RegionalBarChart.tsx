'use client';

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
import { regionalBarData } from '@/data/mockData';

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; payload: { schools: number } }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-modal p-3 text-sm">
        <p className="font-bold text-slate-900 mb-1">{label}</p>
        <p className="text-blue-700 font-semibold">Ball: <span className="tabular-nums">{payload[0].value}</span></p>
        <p className="text-slate-500">Maktablar: <span className="tabular-nums font-medium">{payload[0].payload.schools}</span></p>
      </div>
    );
  }
  return null;
};

export default function RegionalBarChart() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5">
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-900">Viloyatlar reytingi</h3>
        <p className="text-xs text-slate-500 mt-0.5">O'rtacha umumiy ball bo'yicha</p>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={regionalBarData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1D4ED8" stopOpacity={1} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.7} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
          <XAxis
            dataKey="region"
            tick={{ fontSize: 10, fill: '#94A3B8', fontFamily: 'Plus Jakarta Sans' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[60, 90]}
            tick={{ fontSize: 10, fill: '#94A3B8', fontFamily: 'Plus Jakarta Sans' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(29,78,216,0.05)' }} />
          <Bar dataKey="score" fill="url(#barGradient)" radius={[4, 4, 0, 0]}>
            {regionalBarData.map((entry, index) => (
              <Cell key={`bar-cell-${index}`} fill={index === 0 ? '#1D4ED8' : 'url(#barGradient)'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}