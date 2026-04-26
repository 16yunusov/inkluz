'use client';

import React from 'react';
import { Shield, Lock, Users, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function PermissionManagement() {
  const roles = [
    { id: 'super_admin', name: 'Super Admin', desc: 'Barcha tizim ruxsatlariga ega', users: 3, color: 'bg-purple-500' },
    { id: 'region_admin', name: 'Viloyat Admin', desc: 'Faqat o\'z viloyatidagi maktablarni boshqarish', users: 14, color: 'bg-blue-500' },
    { id: 'school_admin', name: 'Maktab Admin', desc: 'O\'z maktabi ma\'lumotlarini tahrirlash', users: 487, color: 'bg-teal-500' },
    { id: 'teacher', name: 'O\'qituvchi', desc: 'Sertifikat yuklash va o\'z reytingini ko\'rish', users: 780, color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Ruxsatlar va Rollar</h2>
          <p className="text-sm text-slate-500">Tizimdagi foydalanuvchi huquqlarini boshqarish</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm">
          Yangi rol qo'shish
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((role) => (
          <div key={role.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${role.color} flex items-center justify-center text-white`}>
                  <Shield size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{role.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Users size={12} /> {role.users} ta foydalanuvchi
                  </p>
                </div>
              </div>
              <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                <Lock size={18} />
              </button>
            </div>
            <p className="text-sm text-slate-600 mb-5 leading-relaxed">
              {role.desc}
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>Dashboardni ko'rish</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>Hisobotlarni yuklab olish</span>
              </div>
              {role.id === 'super_admin' && (
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span>Tizim sozlamalarini o'zgartirish</span>
                </div>
              )}
            </div>
            <button className="w-full py-2 bg-slate-50 text-slate-600 text-sm font-semibold rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-all flex items-center justify-center gap-1">
              Ruxsatlarni tahrirlash <ChevronRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
