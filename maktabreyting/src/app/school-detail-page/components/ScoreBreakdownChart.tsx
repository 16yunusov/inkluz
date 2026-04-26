'use client';

import React from 'react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  ResponsiveContainer, Tooltip,
} from 'recharts';
import { schools } from '@/data/mockData';
import ScoreBar from '@/components/ui/ScoreBar';

const school = schools[0];

const categories = [
  { key: 'certificates', label: 'Sertifikatlar', value: school.certificates > 40 ? 98 : school.certificates * 2, max: 20, color: 'bg-amber-500', description: 'Tasdiqlangan sertifikatlar soni' },
  { key: 'olimpiad', label: 'Olimpiadalar', value: school.olimpiadScore, max: 20, color: 'bg-blue-500', description: 'Olimpiad natijalari va o\'rinlar' },
  { key: 'exam', label: 'Imtihon natijasi', value: school.examAvg, max: 20, color: 'bg-emerald-500', description: 'O\'rtacha imtihon bali' },
  { key: 'attendance', label: 'Davomat', value: school.attendance, max: 20, color: 'bg-violet-500', description: 'Intizom va davomat foizi' },
  { key: 'teacher', label: "O\'qituvchi bahosi", value: school.teacherRating, max: 20, color: 'bg-rose-500', description: "O\'qituvchilarning baholash natijasi" },
];

const radarData = categories.map((c) => ({
  subject: c.label,
  score: c.value,
  fullMark: 100,
}));

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number; payload: { subject: string } }> }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-modal p-3 text-sm">
        <p className="font-bold text-slate-900">{payload[0].payload.subject}</p>
        <p className="text-blue-600 font-semibold tabular-nums">{payload[0].value} ball</p>
      </div>
    );
  }
  return null;
};

export default function ScoreBreakdownChart() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5">
      <div className="mb-5">
        <h3 className="text-base font-bold text-slate-900">Ball taqsimoti</h3>
        <p className="text-xs text-slate-500 mt-0.5">5 ta mezon bo'yicha batafsil ko'rsatkichlar</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 items-start">
        {/* Radar Chart */}
        <div className="w-full xl:w-64 shrink-0">
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fontSize: 10, fill: '#94A3B8', fontFamily: 'Plus Jakarta Sans' }}
              />
              <Radar
                name="Ball"
                dataKey="score"
                stroke="#1D4ED8"
                fill="#1D4ED8"
                fillOpacity={0.15}
                strokeWidth={2}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Score Bars */}
        <div className="flex-1 space-y-4">
          {categories.map((cat) => (
            <div key={`score-cat-${cat.key}`}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${cat.color} shrink-0`} />
                  <span className="text-sm font-semibold text-slate-700">{cat.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">{cat.description}</span>
                  <span className="text-sm font-bold text-slate-900 tabular-nums w-8 text-right">{cat.value}</span>
                </div>
              </div>
              <ScoreBar
                value={cat.value}
                max={100}
                color={cat.color}
                height="h-2.5"
                showValue={false}
              />
            </div>
          ))}

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-600">Umumiy ball</span>
            <span className="text-xl font-bold text-blue-700 tabular-nums">{school.overallScore} / 100</span>
          </div>
        </div>
      </div>
    </div>
  );
}