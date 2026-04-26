'use client';

import React, { useState } from 'react';
import { regions } from '@/data/mockData';
import { MapPin, TrendingUp, School, Search, ChevronRight, Edit2, Trash2 } from 'lucide-react';

export default function RegionManagementTable() {
  const [search, setSearch] = useState('');

  const filtered = regions.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) || 
    r.nameUz.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Viloyatlar boshqaruvi</h2>
          <p className="text-sm text-slate-500">Tizimdagi barcha hududlar ro'yxati</p>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Viloyat qidirish..."
            className="pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-600">ID</th>
              <th className="px-6 py-4 font-semibold text-slate-600">Viloyat nomi</th>
              <th className="px-6 py-4 font-semibold text-slate-600">Maktablar</th>
              <th className="px-6 py-4 font-semibold text-slate-600">O'rtacha ball</th>
              <th className="px-6 py-4 font-semibold text-slate-600">Eng yaxshi maktab</th>
              <th className="px-6 py-4 font-semibold text-slate-600 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((region) => (
              <tr key={region.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4 text-slate-400 font-mono text-xs">{region.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${region.color} flex items-center justify-center text-white shrink-0 shadow-sm`}>
                      <MapPin size={16} />
                    </div>
                    <span className="font-bold text-slate-900">{region.nameUz}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <School size={14} className="text-slate-400" />
                    <span className="font-medium">{region.schoolCount}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp size={14} className="text-emerald-500" />
                    <span className="font-bold text-emerald-600">{region.avgScore}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-slate-600 text-xs truncate max-w-[150px] block" title={region.topSchool}>
                    {region.topSchool}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
