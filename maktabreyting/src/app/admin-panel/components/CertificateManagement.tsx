'use client';

import React, { useState, useCallback } from 'react';
import { certificates } from '@/data/mockData';
import StatusBadge from '@/components/ui/StatusBadge';
import { toast } from 'sonner';
import { Upload, CheckCircle, XCircle, Eye, Search, Plus, Download, Clock, Award } from 'lucide-react';

// Backend integration: POST /api/admin/certificates → upload certificate
// Backend integration: PATCH /api/admin/certificates/:id/verify → verify certificate
// Backend integration: GET /api/admin/certificates?status=pending → pending list

const categoryColors: Record<string, string> = {
  olimpiad: 'bg-blue-50 text-blue-700',
  sport: 'bg-emerald-50 text-emerald-700',
  art: 'bg-purple-50 text-purple-700',
  science: 'bg-amber-50 text-amber-700',
  leadership: 'bg-rose-50 text-rose-700',
};

const categoryLabels: Record<string, string> = {
  olimpiad: '🏅 Olimpiad',
  sport: '⚽ Sport',
  art: '🎨 San\'at',
  science: '🔬 Fan',
  leadership: '👑 Yetakchilik',
};

import { useAuth } from '@/context/AuthContext';

export default function CertificateManagement() {
  const { user } = useAuth();
  const [localCerts, setLocalCerts] = useState(certificates);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '', category: 'olimpiad', score: '', issuedTo: '', issuer: '', date: '', 
    schoolId: user?.role === 'school_admin' ? (user.school || 'sch-001') : 'sch-001',
  });
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadErrors, setUploadErrors] = useState<Record<string, string>>({});

  const filtered = localCerts.filter((c) => {
    // Role based filtering
    const matchRole = user?.role === 'super_admin' ? true : c.schoolId === user?.school;
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.issuedTo.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchStatus && matchSearch;
  });

  const pendingCount = localCerts.filter((c) => c.status === 'pending').length;

  const handleVerify = useCallback((id: string, title: string, customScore?: number) => {
    setLocalCerts((prev) => prev.map((c) => {
      if (c.id === id) {
        return { ...c, status: 'verified' as const, score: customScore ?? c.score };
      }
      return c;
    }));
    toast.success(`"${title}" tasdiqlandi — ${customScore ?? 'belgilangan'} ball qo'shildi`);
  }, []);

  const handleReject = useCallback((id: string, title: string) => {
    setLocalCerts((prev) => prev.filter((c) => c.id !== id));
    toast.error(`"${title}" rad etildi`);
  }, []);

  const validateUpload = () => {
    const errs: Record<string, string> = {};
    if (!uploadForm.title.trim()) errs.title = 'Sarlavha majburiy';
    if (!uploadForm.issuedTo.trim()) errs.issuedTo = "O'quvchi ismi majburiy";
    if (!uploadForm.issuer.trim()) errs.issuer = 'Beruvchi tashkilot majburiy';
    if (!uploadForm.score || isNaN(Number(uploadForm.score)) || Number(uploadForm.score) <= 0) errs.score = 'Ball musbat son bo\'lishi kerak';
    if (!uploadForm.date) errs.date = 'Sana majburiy';
    return errs;
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateUpload();
    if (Object.keys(errs).length > 0) { setUploadErrors(errs); return; }
    setUploadLoading(true);
    // Backend integration: POST /api/admin/certificates (multipart/form-data)
    await new Promise((r) => setTimeout(r, 1000));
    const newCert = {
      id: `cert-${Date.now()}`,
      schoolId: uploadForm.schoolId,
      title: uploadForm.title,
      category: uploadForm.category as 'olimpiad' | 'sport' | 'art' | 'science' | 'leadership',
      score: Number(uploadForm.score),
      issuedTo: uploadForm.issuedTo,
      issuer: uploadForm.issuer,
      date: uploadForm.date,
      status: 'pending' as const,
      fileUrl: '#',
    };
    setLocalCerts((prev) => [newCert, ...prev]);
    setUploadLoading(false);
    setShowUploadForm(false);
    setUploadForm({ title: '', category: 'olimpiad', score: '', issuedTo: '', issuer: '', date: '', schoolId: 'sch-001' });
    setUploadErrors({});
    toast.success('Sertifikat yuklandi — tasdiqlash kutilmoqda');
  };

  return (
    <div className="space-y-5">
      {/* Alert for pending */}
      {pendingCount > 0 && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <Clock size={18} className="text-amber-600 shrink-0" />
          <p className="text-sm font-semibold text-amber-800">
            {pendingCount} ta sertifikat tasdiqlanishini kutmoqda
          </p>
          <button
            onClick={() => setStatusFilter('pending')}
            className="ml-auto text-xs font-bold text-amber-700 hover:text-amber-900 underline"
          >
            Ko'rish
          </button>
        </div>
      )}

      {/* Upload Form */}
      {showUploadForm && (
        <div className="bg-white rounded-xl border border-blue-200 shadow-card p-5 slide-up">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-bold text-slate-900">Yangi sertifikat yuklash</h4>
            <button onClick={() => setShowUploadForm(false)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-all">✕</button>
          </div>
          <form onSubmit={handleUploadSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Sertifikat sarlavhasi <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  placeholder="Matematika olimpiadasi — Respublika 1-o'rni"
                  className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all ${uploadErrors.title ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'}`}
                />
                {uploadErrors.title && <p className="text-xs text-red-500 mt-1">{uploadErrors.title}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">O'quvchi ismi <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={uploadForm.issuedTo}
                  onChange={(e) => setUploadForm({ ...uploadForm, issuedTo: e.target.value })}
                  placeholder="Karimov Asilbek"
                  className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all ${uploadErrors.issuedTo ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'}`}
                />
                {uploadErrors.issuedTo && <p className="text-xs text-red-500 mt-1">{uploadErrors.issuedTo}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Beruvchi tashkilot <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={uploadForm.issuer}
                  onChange={(e) => setUploadForm({ ...uploadForm, issuer: e.target.value })}
                  placeholder="O'zbekiston XTV"
                  className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all ${uploadErrors.issuer ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'}`}
                />
                {uploadErrors.issuer && <p className="text-xs text-red-500 mt-1">{uploadErrors.issuer}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Kategoriya</label>
                <select
                  value={uploadForm.category}
                  onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 bg-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                >
                  <option value="olimpiad">Olimpiad</option>
                  <option value="sport">Sport</option>
                  <option value="science">Fan</option>
                  <option value="art">San'at</option>
                  <option value="leadership">Yetakchilik</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Ball (reyting uchun) <span className="text-red-500">*</span></label>
                <p className="text-xs text-slate-400 mb-1.5">Bu ball maktab umumiy reytingiga qo'shiladi.</p>
                <input
                  type="number"
                  min="1"
                  max="25"
                  value={uploadForm.score}
                  onChange={(e) => setUploadForm({ ...uploadForm, score: e.target.value })}
                  placeholder="1–25"
                  className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all ${uploadErrors.score ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'}`}
                />
                {uploadErrors.score && <p className="text-xs text-red-500 mt-1">{uploadErrors.score}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Berilgan sana <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  value={uploadForm.date}
                  onChange={(e) => setUploadForm({ ...uploadForm, date: e.target.value })}
                  className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all ${uploadErrors.date ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'}`}
                />
                {uploadErrors.date && <p className="text-xs text-red-500 mt-1">{uploadErrors.date}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Sertifikat fayli (PDF/JPG)</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer">
                  <Upload size={24} className="mx-auto text-slate-300 mb-2" />
                  <p className="text-sm text-slate-500 font-medium">Faylni bu yerga tashlang yoki bosing</p>
                  <p className="text-xs text-slate-400 mt-1">PDF, JPG, PNG — max 10MB</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => setShowUploadForm(false)} className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">
                Bekor qilish
              </button>
              <button
                type="submit"
                disabled={uploadLoading}
                className="flex-1 px-4 py-2.5 bg-blue-700 text-white rounded-xl text-sm font-semibold hover:bg-blue-800 active:scale-95 disabled:opacity-70 transition-all flex items-center justify-center gap-2"
              >
                {uploadLoading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Yuklanmoqda...
                  </>
                ) : (
                  <>
                    <Upload size={15} />
                    Yuklash
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-card">
        <div className="p-5 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Sertifikatlar boshqaruvi</h3>
              <p className="text-xs text-slate-500 mt-0.5">{filtered.length} ta sertifikat</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Qidirish..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg w-44 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">Barchasi</option>
                <option value="verified">Tasdiqlangan</option>
                <option value="pending">Kutilmoqda</option>
              </select>
              {user?.role === 'school_admin' && (
                <button
                  onClick={() => setShowUploadForm(true)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 active:scale-95 transition-all"
                >
                  <Plus size={15} />
                  Sertifikat yuklash
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Sertifikat</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Kategoriya</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">O'quvchi</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Tashkilot</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Ball</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Sana</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Holat</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center">
                    <Award size={32} className="mx-auto text-slate-200 mb-3" />
                    <p className="text-slate-400 font-medium">Sertifikat topilmadi</p>
                  </td>
                </tr>
              ) : (
                filtered.map((cert) => (
                  <tr key={`cert-mgmt-${cert.id}`} className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors group">
                    <td className="px-4 py-3">
                      <div className="flex items-start gap-2">
                        <Award size={15} className="text-amber-500 mt-0.5 shrink-0" />
                        <span className="font-medium text-slate-800 max-w-[200px] text-xs leading-tight">{cert.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryColors[cert.category]}`}>
                        {categoryLabels[cert.category]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-700 whitespace-nowrap">{cert.issuedTo}</td>
                    <td className="px-4 py-3 text-xs text-slate-500 max-w-[160px] truncate">{cert.issuer}</td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-bold text-blue-700 tabular-nums">+{cert.score}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500 tabular-nums whitespace-nowrap">{cert.date}</td>
                    <td className="px-4 py-3">
                      <StatusBadge variant={cert.status} size="sm" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {cert.status === 'pending' && user?.role === 'super_admin' && (
                          <>
                            <button
                              onClick={() => handleVerify(cert.id, cert.title)}
                              className="flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold hover:bg-emerald-100 transition-all"
                              title="Tasdiqlash"
                            >
                              <CheckCircle size={13} />
                              Tasdiqlash
                            </button>
                            <button
                              onClick={() => handleReject(cert.id, cert.title)}
                              className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100 transition-all"
                              title="Rad etish"
                            >
                              <XCircle size={13} />
                              Rad
                            </button>
                          </>
                        )}
                        <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all" title="Ko'rish">
                          <Eye size={13} />
                        </button>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all" title="Yuklab olish">
                          <Download size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}