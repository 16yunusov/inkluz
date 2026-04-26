import React from 'react';
import { School, Users, Award, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const stats = [
  {
    id: 'admin-stat-schools',
    icon: School,
    label: 'Jami maktablar',
    value: '4,545',
    change: '+23',
    changeLabel: 'bu oy',
    trend: 'up',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-100',
    href: '#schools',
  },
  {
    id: 'admin-stat-users',
    icon: Users,
    label: 'Foydalanuvchilar',
    value: '1,284',
    change: '+8',
    changeLabel: 'bu hafta',
    trend: 'up',
    bg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    borderColor: 'border-indigo-100',
    href: '#users',
  },
  {
    id: 'admin-stat-certs',
    icon: Award,
    label: 'Sertifikatlar',
    value: '12,847',
    change: '+341',
    changeLabel: 'bu oy',
    trend: 'up',
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    borderColor: 'border-amber-100',
    href: '#certificates',
  },
  {
    id: 'admin-stat-pending',
    icon: AlertTriangle,
    label: 'Tasdiqlanmagan',
    value: '23',
    change: '⚠ Diqqat',
    changeLabel: 'kutilmoqda',
    trend: 'warn',
    bg: 'bg-red-50',
    iconColor: 'text-red-500',
    borderColor: 'border-red-100',
    href: '#certificates',
  },
  {
    id: 'admin-stat-avg',
    icon: TrendingUp,
    label: "O'rtacha ball",
    value: '74.6',
    change: '+2.3',
    changeLabel: "o'tgan oyga",
    trend: 'up',
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    borderColor: 'border-emerald-100',
    href: '#rankings',
  },
  {
    id: 'admin-stat-verified',
    icon: CheckCircle,
    label: 'Tasdiqlangan maktablar',
    value: '4,312',
    change: '94.8%',
    changeLabel: 'jami',
    trend: 'up',
    bg: 'bg-teal-50',
    iconColor: 'text-teal-600',
    borderColor: 'border-teal-100',
    href: '#schools',
  },
];

export default function AdminDashboardStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats?.map((stat) => {
        const Icon = stat?.icon;
        return (
          <a
            key={stat?.id}
            href={stat?.href}
            className={`bg-white rounded-xl border ${stat?.borderColor} p-4 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 cursor-pointer group block`}
          >
            <div className={`w-9 h-9 rounded-lg ${stat?.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <Icon size={18} className={stat?.iconColor} />
            </div>
            <p className={`text-2xl font-bold tabular-nums leading-tight ${stat?.trend === 'warn' ? 'text-red-600' : 'text-slate-900'}`}>
              {stat?.value}
            </p>
            <p className="text-xs font-semibold text-slate-500 mt-0.5 leading-tight">{stat?.label}</p>
            <p className={`text-xs mt-1 font-medium ${
              stat?.trend === 'up' ? 'text-emerald-600' :
              stat?.trend === 'warn' ? 'text-red-500' : 'text-slate-400'
            }`}>
              {stat?.change} {stat?.changeLabel}
            </p>
          </a>
        );
      })}
    </div>
  );
}