'use client';

import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { schools } from '@/data/mockData';

const school = schools[0];
const months = ['May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek', 'Yan', 'Fev', 'Mar', 'Apr'];

const trendData = school.monthlyTrend.map((score, i) => ({
  month: months[i],
  score,
  target: 90,
}));

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-modal p-3 text-sm">
        <p className="font-bold text-slate-900 mb-1.5">{label}</p>
        {payload.map((p) => (
          <p key={`tooltip-${p.dataKey}`} className={p.dataKey === 'score' ? 'text-blue-600 font-semibold' : 'text-slate-400'}>
            {p.dataKey === 'score' ? 'Ball' : 'Maqsad'}: <span className="tabular-nums">{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function RankingTrendChart() {
  const currentScore = school.monthlyTrend[school.monthlyTrend.length - 1];
  const prevScore = school.monthlyTrend[school.monthlyTrend.length - 2];
  const delta = currentScore - prevScore;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Ball dinamikasi</h3>
          <p className="text-xs text-slate-500 mt-0.5">So'nggi 12 oy tendensiyasi</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-slate-900 tabular-nums">{currentScore}</p>
          <p className={`text-xs font-semibold ${delta >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {delta >= 0 ? '+' : ''}{delta} o'tgan oyga nisbatan
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={trendData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
          <defs>
            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1D4ED8" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'Plus Jakarta Sans' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[80, 100]}
            tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'Plus Jakarta Sans' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={90} stroke="#F59E0B" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: 'Maqsad', position: 'right', fontSize: 10, fill: '#F59E0B' }} />
          <Area
            type="monotone"
            dataKey="score"
            stroke="#1D4ED8"
            strokeWidth={2.5}
            fill="url(#scoreGradient)"
            dot={{ r: 3, fill: '#1D4ED8', strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#1D4ED8' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}