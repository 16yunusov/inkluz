'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { schools } from '@/data/mockData';
import RankBadge from '@/components/ui/RankBadge';
import StatusBadge from '@/components/ui/StatusBadge';
import ScoreBar from '@/components/ui/ScoreBar';
import AppImage from '@/components/ui/AppImage';
import { Search, ChevronUp, ChevronDown, ChevronsUpDown, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

type SortField = 'nationalRank' | 'overallScore' | 'certificates' | 'examAvg';
type SortDir = 'asc' | 'desc';

const PAGE_SIZES = [10, 20, 50];

export default function NationalRankingTable() {
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [sortField, setSortField] = useState<SortField>('nationalRank');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const allRegions = useMemo(() => {
    const seen = new Set<string>();
    return schools
      .map((s) => s.regionName)
      .filter((r) => { if (seen.has(r)) return false; seen.add(r); return true; });
  }, []);

  const filtered = useMemo(() => {
    let data = [...schools];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (s) => s.name.toLowerCase().includes(q) || s.district.toLowerCase().includes(q) || s.director.toLowerCase().includes(q)
      );
    }
    if (regionFilter !== 'all') {
      data = data.filter((s) => s.regionName === regionFilter);
    }
    data.sort((a, b) => {
      const av = a[sortField] as number;
      const bv = b[sortField] as number;
      return sortDir === 'asc' ? av - bv : bv - av;
    });
    return data;
  }, [search, regionFilter, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
    setPage(1);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronsUpDown size={14} className="text-slate-300" />;
    return sortDir === 'asc'
      ? <ChevronUp size={14} className="text-blue-600" />
      : <ChevronDown size={14} className="text-blue-600" />;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-card">
      {/* Header */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">🏆 O'zbekiston TOP reytingi</h2>
            <p className="text-xs text-slate-500 mt-0.5">Barcha maktablar umumiy ball bo'yicha tartiblangan</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Maktab qidirish..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg w-52 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
              />
            </div>
            <select
              value={regionFilter}
              onChange={(e) => { setRegionFilter(e.target.value); setPage(1); }}
              className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
            >
              <option value="all">Barcha viloyatlar</option>
              {allRegions.map((r) => (
                <option key={`filter-region-${r}`} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-4 py-3 text-left">
                <button
                  className="flex items-center gap-1 text-xs font-semibold text-slate-500 uppercase tracking-wide hover:text-slate-700"
                  onClick={() => handleSort('nationalRank')}
                >
                  O'rin <SortIcon field="nationalRank" />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Maktab</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Viloyat</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Tuman</th>
              <th className="px-4 py-3 text-left">
                <button
                  className="flex items-center gap-1 text-xs font-semibold text-slate-500 uppercase tracking-wide hover:text-slate-700"
                  onClick={() => handleSort('overallScore')}
                >
                  Ball <SortIcon field="overallScore" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  className="flex items-center gap-1 text-xs font-semibold text-slate-500 uppercase tracking-wide hover:text-slate-700"
                  onClick={() => handleSort('certificates')}
                >
                  Sertifikatlar <SortIcon field="certificates" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  className="flex items-center gap-1 text-xs font-semibold text-slate-500 uppercase tracking-wide hover:text-slate-700"
                  onClick={() => handleSort('examAvg')}
                >
                  Imtihon <SortIcon field="examAvg" />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Holat</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide"></th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-16 text-center">
                  <p className="text-slate-400 font-medium">Maktab topilmadi</p>
                  <p className="text-slate-300 text-xs mt-1">Qidiruv so'rovini o'zgartiring</p>
                </td>
              </tr>
            ) : (
              paginated.map((school) => (
                <tr
                  key={`ranking-row-${school.id}`}
                  className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors group"
                >
                  <td className="px-4 py-3">
                    <RankBadge rank={school.nationalRank} size="sm" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                        <AppImage
                          src={school.image}
                          alt={`${school.name} maktab binosi`}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm leading-tight max-w-[200px] truncate">{school.name}</p>
                        <p className="text-xs text-slate-400">{school.director}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{school.regionName}</td>
                  <td className="px-4 py-3 text-sm text-slate-500 whitespace-nowrap">{school.district}</td>
                  <td className="px-4 py-3 min-w-[120px]">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-slate-900 tabular-nums">{school.overallScore}</span>
                      <ScoreBar value={school.overallScore} max={100} height="h-1.5" showValue={false} />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold text-amber-600 tabular-nums">{school.certificates}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-slate-700 tabular-nums">{school.examAvg}</span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge variant={school.status} size="sm" />
                  </td>
                  <td className="px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      href="/school-detail-page"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors"
                    >
                      <ExternalLink size={12} />
                      Ko'rish
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
        <div className="flex items-center gap-3">
          <p className="text-sm text-slate-500">
            <span className="font-semibold text-slate-700 tabular-nums">{filtered.length}</span> ta maktab
          </p>
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
            className="px-2 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {PAGE_SIZES.map((s) => (
              <option key={`page-size-${s}`} value={s}>{s} ta</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const p = i + 1;
            return (
              <button
                key={`page-btn-${p}`}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all ${
                  page === p
                    ? 'bg-blue-600 text-white' :'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {p}
              </button>
            );
          })}
          {totalPages > 5 && <span className="text-slate-400 px-1">...</span>}
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages || totalPages === 0}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}