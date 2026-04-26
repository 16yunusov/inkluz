'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { schools } from '@/data/mockData';
import RankBadge from '@/components/ui/RankBadge';
import StatusBadge from '@/components/ui/StatusBadge';
import ScoreBar from '@/components/ui/ScoreBar';
import { toast } from 'sonner';
import {
  Search, Plus, Edit2, Trash2, Eye, ChevronUp, ChevronDown,
  ChevronsUpDown, ChevronLeft, ChevronRight, Download,
} from 'lucide-react';

// Backend integration: GET /api/admin/schools → paginated school list with scores
// Backend integration: DELETE /api/admin/schools/:id → delete school (SUPER_ADMIN only)
// Backend integration: PATCH /api/admin/schools/:id → update school data

interface DeleteModalProps {
  schoolName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteModal({ schoolName, onConfirm, onCancel }: DeleteModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 fade-in">
      <div className="bg-white rounded-2xl shadow-modal w-full max-w-md p-6 slide-up">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 size={22} className="text-red-600" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 text-center mb-2">Maktabni o'chirish</h3>
        <p className="text-sm text-slate-500 text-center mb-1">
          <span className="font-semibold text-slate-700">"{schoolName}"</span> maktabini o'chirmoqchimisiz?
        </p>
        <p className="text-xs text-red-500 text-center mb-6">Bu amalni qaytarib bo'lmaydi. Barcha sertifikatlar ham o'chiriladi.</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all"
          >
            Bekor qilish
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 active:scale-95 transition-all"
          >
            O'chirish
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SchoolManagementTable() {
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState<'nationalRank' | 'overallScore' | 'studentCount'>('nationalRank');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  const allRegions = useMemo(() => {
    const seen = new Set<string>();
    return schools.map((s) => s.regionName).filter((r) => { if (seen.has(r)) return false; seen.add(r); return true; });
  }, []);

  const filtered = useMemo(() => {
    let data = [...schools];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter((s) => s.name.toLowerCase().includes(q) || s.director.toLowerCase().includes(q) || s.district.toLowerCase().includes(q));
    }
    if (regionFilter !== 'all') data = data.filter((s) => s.regionName === regionFilter);
    if (statusFilter !== 'all') data = data.filter((s) => s.status === statusFilter);
    data.sort((a, b) => {
      const av = a[sortField] as number;
      const bv = b[sortField] as number;
      return sortDir === 'asc' ? av - bv : bv - av;
    });
    return data;
  }, [search, regionFilter, statusFilter, sortField, sortDir]);

  const pageSize = 8;
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = useMemo(() => filtered.slice((page - 1) * pageSize, page * pageSize), [filtered, page]);

  const toggleSelect = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    setSelected((prev) => {
      if (prev.size === paginated.length) return new Set();
      return new Set(paginated.map((s) => s.id));
    });
  }, [paginated]);

  const handleSort = useCallback((field: 'nationalRank' | 'overallScore' | 'studentCount') => {
    setSortField((prev) => {
      if (prev === field) setSortDir((d) => d === 'asc' ? 'desc' : 'asc');
      else { setSortDir('asc'); }
      return field;
    });
    setPage(1);
  }, []);

  const handleDelete = useCallback((id: string, name: string) => setDeleteTarget({ id, name }), []);

  const confirmDelete = useCallback(() => {
    if (!deleteTarget) return;
    toast.success(`"${deleteTarget.name}" maktabi o'chirildi`);
    setDeleteTarget(null);
  }, [deleteTarget]);

  const handleBulkDelete = useCallback(() => {
    toast.success(`${selected.size} ta maktab o'chirildi`);
    setSelected(new Set());
  }, [selected.size]);

  const SortIcon = useCallback(({ field }: { field: 'nationalRank' | 'overallScore' | 'studentCount' }) => {
    if (sortField !== field) return <ChevronsUpDown size={13} className="text-slate-300" />;
    return sortDir === 'asc' ? <ChevronUp size={13} className="text-blue-600" /> : <ChevronDown size={13} className="text-blue-600" />;
  }, [sortField, sortDir]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);

  const handleRegionChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegionFilter(e.target.value);
    setPage(1);
  }, []);

  const handleStatusChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setPage(1);
  }, []);

  return (
    <>
      {deleteTarget && (
        <DeleteModal
          schoolName={deleteTarget.name}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      <div className="bg-white rounded-xl border border-slate-200 shadow-card">
        {/* Header */}
        <div className="p-5 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Maktablar boshqaruvi</h3>
              <p className="text-xs text-slate-500 mt-0.5">{filtered.length} ta maktab</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Maktab qidirish..."
                  value={search}
                  onChange={handleSearchChange}
                  className="pl-8 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg w-48 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                />
              </div>
              <select
                value={regionFilter}
                onChange={handleRegionChange}
                className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">Barcha viloyatlar</option>
                {allRegions.map((r) => (
                  <option key={`school-filter-reg-${r}`} value={r}>{r}</option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={handleStatusChange}
                className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">Barcha holatlar</option>
                <option value="active">Faol</option>
                <option value="pending">Kutilmoqda</option>
                <option value="suspended">To'xtatilgan</option>
              </select>
              <button
                className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-all"
                onClick={() => toast.success('Excel fayli yuklanmoqda...')}
              >
                <Download size={14} />
                Export
              </button>
              <button
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 active:scale-95 transition-all"
                onClick={() => toast.info("Yangi maktab qo'shish formasi ochildi")}
              >
                <Plus size={15} />
                Maktab qo'shish
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Action Bar */}
        {selected.size > 0 && (
          <div className="px-5 py-3 bg-blue-50 border-b border-blue-100 flex items-center justify-between slide-up">
            <p className="text-sm font-semibold text-blue-700">{selected.size} ta maktab tanlandi</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toast.info(`${selected.size} ta maktab holati yangilandi`)}
                className="px-3 py-1.5 bg-white border border-blue-200 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-50 transition-all"
              >
                Holatni yangilash
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-all"
              >
                O'chirish
              </button>
              <button
                onClick={() => setSelected(new Set())}
                className="px-3 py-1.5 text-slate-500 hover:text-slate-700 text-xs font-medium transition-all"
              >
                Bekor
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selected.size === paginated.length && paginated.length > 0}
                    onChange={toggleAll}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-4 py-3 text-left">
                  <button className="flex items-center gap-1 text-xs font-semibold text-slate-500 uppercase tracking-wide hover:text-slate-700" onClick={() => handleSort('nationalRank')}>
                    O'rin <SortIcon field="nationalRank" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Maktab nomi</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Viloyat</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Tuman</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Direktor</th>
                <th className="px-4 py-3 text-left">
                  <button className="flex items-center gap-1 text-xs font-semibold text-slate-500 uppercase tracking-wide hover:text-slate-700" onClick={() => handleSort('studentCount')}>
                    O'quvchilar <SortIcon field="studentCount" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button className="flex items-center gap-1 text-xs font-semibold text-slate-500 uppercase tracking-wide hover:text-slate-700" onClick={() => handleSort('overallScore')}>
                    Ball <SortIcon field="overallScore" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Holat</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-16 text-center">
                    <p className="text-slate-400 font-medium">Maktab topilmadi</p>
                    <p className="text-slate-300 text-xs mt-1">Filter yoki qidiruvni o'zgartiring</p>
                  </td>
                </tr>
              ) : (
                paginated.map((school) => (
                  <tr
                    key={`admin-school-row-${school.id}`}
                    className={`border-b border-slate-50 transition-colors group ${selected.has(school.id) ? 'bg-blue-50/40' : 'hover:bg-slate-50/70'}`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.has(school.id)}
                        onChange={() => toggleSelect(school.id)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <RankBadge rank={school.nationalRank} size="sm" />
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-900 text-sm max-w-[200px] truncate">{school.name}</p>
                      <p className="text-xs text-slate-400">{school.certificates} sertifikat</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{school.regionName}</td>
                    <td className="px-4 py-3 text-sm text-slate-500 whitespace-nowrap">{school.district}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{school.director}</td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-700 tabular-nums">{school.studentCount.toLocaleString()}</td>
                    <td className="px-4 py-3 min-w-[110px]">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-slate-900 tabular-nums">{school.overallScore}</span>
                        <ScoreBar value={school.overallScore} max={100} height="h-1.5" showValue={false} />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge variant={school.status} size="sm" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href="/school-detail-page"
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all"
                          title="Ko'rish"
                        >
                          <Eye size={15} />
                        </Link>
                        <button
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-amber-50 hover:text-amber-600 transition-all"
                          title="Tahrirlash"
                          onClick={() => toast.info(`${school.name} tahrirlash formasi ochildi`)}
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all"
                          title="O'chirish — bu amalni qaytarib bo'lmaydi"
                          onClick={() => handleDelete(school.id, school.name)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
          <p className="text-sm text-slate-500">
            <span className="font-semibold text-slate-700 tabular-nums">{(page - 1) * pageSize + 1}</span>–
            <span className="font-semibold text-slate-700 tabular-nums">{Math.min(page * pageSize, filtered.length)}</span> / <span className="tabular-nums">{filtered.length}</span>
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((p) => (
              <button
                key={`admin-school-page-${p}`}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all ${page === p ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {p}
              </button>
            ))}
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
    </>
  );
}