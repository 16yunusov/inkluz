'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { regions } from '@/data/mockData';
import { MapPin, School, TrendingUp, ChevronRight } from 'lucide-react';

export default function RegionGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Viloyatlar bo'yicha statistika</h2>
          <p className="text-sm text-slate-500 mt-0.5">Barcha 14 ta hududiy birlik</p>
        </div>
        <Link
          href="/regions"
          className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
        >
          Barchasi <ChevronRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-3">
        {regions?.map((region) => (
          <Link
            key={`region-card-${region?.id}`}
            href={`/region/${region?.id}`}
            className={`bg-white rounded-xl border transition-all duration-200 cursor-pointer block ${
              hoveredId === region?.id
                ? 'border-blue-300 shadow-card-hover -translate-y-0.5'
                : 'border-slate-200 shadow-card'
            }`}
            onMouseEnter={() => setHoveredId(region?.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="p-4">
              <div className={`w-8 h-8 rounded-lg ${region?.color} flex items-center justify-center mb-3`}>
                <MapPin size={16} className="text-white" />
              </div>
              <p className="text-sm font-bold text-slate-900 leading-tight mb-1">{region?.nameUz}</p>
              <div className="flex items-center gap-1 mb-2">
                <TrendingUp size={12} className="text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-600 tabular-nums">{region?.avgScore}</span>
                <span className="text-xs text-slate-400">o'rtacha</span>
              </div>
              <div className="flex items-center gap-1">
                <School size={12} className="text-slate-400" />
                <span className="text-xs text-slate-500 tabular-nums font-medium">{region?.schoolCount}</span>
                <span className="text-xs text-slate-400">maktab</span>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-400 leading-tight truncate" title={region?.topSchool}>
                  🏆 {region?.topSchool}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}