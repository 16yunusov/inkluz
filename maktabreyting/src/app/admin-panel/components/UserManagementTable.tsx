'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { users } from '@/data/mockData';
import StatusBadge from '@/components/ui/StatusBadge';
import { toast } from 'sonner';
import { Search, Plus, Edit2, Trash2, ChevronLeft, ChevronRight, UserPlus, KeyRound } from 'lucide-react';

// Backend integration: GET /api/admin/users → paginated user list
// Backend integration: POST /api/admin/users → create user
// Backend integration: PATCH /api/admin/users/:id → update role/status
// Backend integration: DELETE /api/admin/users/:id → delete user (SUPER_ADMIN only)

const roleOptions = [
  { value: 'all', label: 'Barcha rollar' },
  { value: 'super_admin', label: 'Super Admin' },
  { value: 'region_admin', label: 'Viloyat Admin' },
  { value: 'school_admin', label: 'Maktab Admin' },
  { value: 'teacher', label: "O\'qituvchi" },
];

interface AddUserModalProps {
  onClose: () => void;
  onSave: (data: { name: string; email: string; role: string; region: string; school: string }) => void;
}

function AddUserModal({ onClose, onSave }: AddUserModalProps) {
  const [form, setForm] = useState({ name: '', email: '', role: 'teacher', region: '', school: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Ism majburiy';
    if (!form.email.trim()) errs.email = 'Email majburiy';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Email formati noto\'g\'ri';
    if (!form.password || form.password.length < 8) errs.password = 'Parol kamida 8 ta belgi';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    // Backend integration: POST /api/auth/register { name, email, password, role, region_id, school_id }
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 fade-in">
      <div className="bg-white rounded-2xl shadow-modal w-full max-w-lg p-6 slide-up">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Yangi foydalanuvchi</h3>
            <p className="text-xs text-slate-500 mt-0.5">Tizimga yangi foydalanuvchi qo'shish</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 transition-all">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">To'liq ism <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Abdullayev Sardor"
                className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all ${errors.name ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'}`}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="sardor@maktabreyting.uz"
                className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all ${errors.email ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'}`}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Parol <span className="text-red-500">*</span></label>
            <p className="text-xs text-slate-400 mb-1.5">Kamida 8 ta belgi. Foydalanuvchi keyinroq o'zgartirishi mumkin.</p>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all ${errors.password ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'}`}
            />
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Rol <span className="text-red-500">*</span></label>
            <p className="text-xs text-slate-400 mb-1.5">Foydalanuvchining tizimga kirish darajasini belgilaydi.</p>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full px-3 py-2.5 text-sm border border-slate-200 bg-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
            >
              <option value="teacher">O'qituvchi</option>
              <option value="school_admin">Maktab Admin</option>
              <option value="region_admin">Viloyat Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Viloyat</label>
              <input
                type="text"
                value={form.region}
                onChange={(e) => setForm({ ...form, region: e.target.value })}
                placeholder="Toshkent shahri"
                className="w-full px-3 py-2.5 text-sm border border-slate-200 bg-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Maktab</label>
              <input
                type="text"
                value={form.school}
                onChange={(e) => setForm({ ...form, school: e.target.value })}
                placeholder="1-sonli maktab"
                className="w-full px-3 py-2.5 text-sm border border-slate-200 bg-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 bg-blue-700 text-white rounded-xl text-sm font-semibold hover:bg-blue-800 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Saqlanmoqda...
                </>
              ) : (
                <>
                  <UserPlus size={15} />
                  Qo'shish
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function UserManagementTable() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [localUsers, setLocalUsers] = useState(users);

  const filtered = useMemo(() => {
    let data = [...localUsers];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }
    if (roleFilter !== 'all') data = data.filter((u) => u.role === roleFilter);
    if (statusFilter !== 'all') data = data.filter((u) => u.status === statusFilter);
    return data;
  }, [search, roleFilter, statusFilter, localUsers]);

  const pageSize = 6;
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = useMemo(() => filtered.slice((page - 1) * pageSize, page * pageSize), [filtered, page]);

  const handleSaveUser = useCallback((data: { name: string; email: string; role: string; region: string; school: string }) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role as 'super_admin' | 'region_admin' | 'school_admin' | 'teacher',
      region: data.region || undefined,
      school: data.school || undefined,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active' as const,
      lastLogin: '-',
    };
    setLocalUsers((prev) => [newUser, ...prev]);
    setShowAddModal(false);
    toast.success(`"${data.name}" tizimga qo'shildi`);
  }, []);

  const handleToggleStatus = useCallback((id: string, currentStatus: string) => {
    setLocalUsers((prev) =>
      prev.map((u) => u.id === id ? { ...u, status: (currentStatus === 'active' ? 'suspended' : 'active') as 'active' | 'suspended' } : u)
    );
    toast.success(currentStatus === 'active' ? "Foydalanuvchi to'xtatildi" : 'Foydalanuvchi faollashtirildi');
  }, []);

  const handleDelete = useCallback((id: string, name: string) => {
    setLocalUsers((prev) => prev.filter((u) => u.id !== id));
    toast.success(`"${name}" o'chirildi`);
  }, []);

  const handleResetPassword = useCallback((name: string) => {
    toast.success(`"${name}" uchun parol tiklash havolasi yuborildi`);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);

  const handleRoleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoleFilter(e.target.value);
    setPage(1);
  }, []);

  const handleStatusFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setPage(1);
  }, []);

  const formatLastLogin = useCallback((dateStr: string) => {
    if (dateStr === '-') return '-';
    try {
      return new Date(dateStr).toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return dateStr;
    }
  }, []);

  return (
    <>
      {showAddModal && <AddUserModal onClose={() => setShowAddModal(false)} onSave={handleSaveUser} />}

      <div className="bg-white rounded-xl border border-slate-200 shadow-card">
        {/* Header */}
        <div className="p-5 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Foydalanuvchilar boshqaruvi</h3>
              <p className="text-xs text-slate-500 mt-0.5">{filtered.length} ta foydalanuvchi · RBAC nazorati</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Ism yoki email..."
                  value={search}
                  onChange={handleSearchChange}
                  className="pl-8 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg w-48 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                />
              </div>
              <select
                value={roleFilter}
                onChange={handleRoleChange}
                className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                {roleOptions.map((r) => (
                  <option key={`role-filter-${r.value}`} value={r.value}>{r.label}</option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={handleStatusFilterChange}
                className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">Barcha holatlar</option>
                <option value="active">Faol</option>
                <option value="suspended">To'xtatilgan</option>
              </select>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 active:scale-95 transition-all"
              >
                <Plus size={15} />
                Foydalanuvchi qo'shish
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Foydalanuvchi</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Rol</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Viloyat / Maktab</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Holat</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">So'nggi kirish</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Qo'shilgan</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center">
                    <p className="text-slate-400 font-medium">Foydalanuvchi topilmadi</p>
                    <p className="text-slate-300 text-xs mt-1">Filter yoki qidiruvni o'zgartiring</p>
                  </td>
                </tr>
              ) : (
                paginated.map((user) => (
                  <tr key={`user-row-${user.id}`} className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors group">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${
                          user.role === 'super_admin' ? 'bg-purple-600' :
                          user.role === 'region_admin' ? 'bg-blue-600' :
                          user.role === 'school_admin' ? 'bg-teal-600' : 'bg-emerald-600'
                        }`}>
                          {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">{user.name}</p>
                          <p className="text-xs text-slate-400">ID: {user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 font-mono text-xs">{user.email}</td>
                    <td className="px-4 py-3">
                      <StatusBadge variant={user.role} size="sm" />
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm text-slate-600">{user.region ?? '—'}</p>
                        {user.school && <p className="text-xs text-slate-400 truncate max-w-[160px]">{user.school}</p>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggleStatus(user.id, user.status)}
                        className="transition-all hover:scale-105"
                        title={user.status === 'active' ? 'Bloklash uchun bosing' : 'Faollashtirish uchun bosing'}
                      >
                        <StatusBadge variant={user.status} size="sm" />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500 tabular-nums whitespace-nowrap">{formatLastLogin(user.lastLogin)}</td>
                    <td className="px-4 py-3 text-xs text-slate-500 tabular-nums whitespace-nowrap">{user.createdAt}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-amber-50 hover:text-amber-600 transition-all"
                          title="Tahrirlash"
                          onClick={() => toast.info(`${user.name} tahrirlash formasi ochildi`)}
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all"
                          title="Parolni tiklash"
                          onClick={() => handleResetPassword(user.name)}
                        >
                          <KeyRound size={14} />
                        </button>
                        <button
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all"
                          title="O'chirish"
                          onClick={() => handleDelete(user.id, user.name)}
                        >
                          <Trash2 size={14} />
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
        <div className="px-5 py-4 flex items-center justify-between border-t border-slate-100">
          <p className="text-sm text-slate-500 tabular-nums">
            Jami <span className="font-semibold text-slate-700">{filtered.length}</span> ta foydalanuvchi
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
              <button
                key={`user-page-${p}`}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all ${page === p ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {p}
              </button>
            ))}
            <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages || totalPages === 0} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}