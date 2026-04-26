'use client';

import React, { useState } from 'react';
import { certificates } from '@/data/mockData';
import StatusBadge from '@/components/ui/StatusBadge';
import { Award, Download, Search, Filter } from 'lucide-react';

const categoryLabels: Record<string, string> = {
  olimpiad: '🏅 Olimpiad',
  sport: '⚽ Sport',
  art: '🎨 San\'at',
  science: '🔬 Fan',
  leadership: '👑 Yetakchilik',
};

const school1Certs = certificates.filter((c) => c.schoolId === 'sch-001');

export default function CertificatesTable() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'verified' | 'pending'>('all');
  const [search, setSearch] = useState('');

  const filtered = school1Certs.filter((c) => {
    const matchStatus = filterStatus === 'all' || c.status === filterStatus;
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.issuedTo.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-card">
      <div className="p-5 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">Sertifikatlar</h3>
            <p className="text-xs text-slate-500 mt-0.5">{school1Certs.length} ta sertifikat yuklangan</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Qidirish..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg w-44 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'verified' | 'pending')}
              className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">Barchasi</option>
              <option value="verified">Tasdiqlangan</option>
              <option value="pending">Kutilmoqda</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Sertifikat nomi</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Kategoriya</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">O'quvchi</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Beruvchi tashkilot</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Ball</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Sana</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Holat</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center">
                  <Award size={32} className="mx-auto text-slate-200 mb-3" />
                  <p className="text-slate-400 font-medium">Sertifikat topilmadi</p>
                  <p className="text-slate-300 text-xs mt-1">Filter yoki qidiruvni o'zgartiring</p>
                </td>
              </tr>
            ) : (
              filtered.map((cert) => (
                <tr key={`cert-row-${cert.id}`} className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors group">
                  <td className="px-4 py-3">
                    <div className="flex items-start gap-2">
                      <Award size={16} className="text-amber-500 mt-0.5 shrink-0" />
                      <span className="font-medium text-slate-800 max-w-[220px] leading-tight">{cert.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-slate-600 whitespace-nowrap">{categoryLabels[cert.category]}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-slate-700 whitespace-nowrap">{cert.issuedTo}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-slate-500 max-w-[180px] truncate block">{cert.issuer}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-bold text-blue-700 tabular-nums">+{cert.score}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-slate-500 tabular-nums whitespace-nowrap">
                      {new Date(cert.date).toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge variant={cert.status} size="sm" />
                  </td>
                  <td className="px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all" title="Yuklash">
                      <Download size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Umumiy ball: <span className="font-bold text-blue-700 tabular-nums">+{filtered.reduce((acc, c) => acc + c.score, 0)}</span>
        </p>
        <p className="text-xs text-slate-400">
          {filtered.filter((c) => c.status === 'verified').length} tasdiqlangan, {filtered.filter((c) => c.status === 'pending').length} kutilmoqda
        </p>
      </div>
    </div>
  );
}