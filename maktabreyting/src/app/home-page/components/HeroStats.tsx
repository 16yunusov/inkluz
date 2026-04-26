import React from 'react';
import { School, Award, MapPin, Users, TrendingUp, BookOpen } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const stats = [
  {
    id: 'stat-total-schools',
    icon: School,
    label: 'Jami maktablar',
    value: '4,545',
    sub: '+23 bu oy',
    trend: 'up',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    id: 'stat-regions',
    icon: MapPin,
    label: 'Viloyatlar',
    value: '14',
    sub: '12 viloyat + 2 avtonom',
    trend: 'neutral',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    id: 'stat-certificates',
    icon: Award,
    label: 'Sertifikatlar',
    value: '12,847',
    sub: '+341 bu oy',
    trend: 'up',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    id: 'stat-students',
    icon: Users,
    label: "Jami o\'quvchilar",
    value: '3.2M',
    sub: "2025-26 o\'quv yili",
    trend: 'neutral',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    id: 'stat-avg-score',
    icon: TrendingUp,
    label: "O\'rtacha ball",
    value: '74.6',
    sub: '+2.3 o\'tgan oyga nisbatan',
    trend: 'up',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    id: 'stat-olimpiad',
    icon: BookOpen,
    label: 'Olimpiad g\'oliblar',
    value: '2,184',
    sub: '2025-26 yil',
    trend: 'up',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
];

export default function HeroStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats?.map((stat) => {
        const Icon = stat?.icon;
        return (
          <div
            key={stat?.id}
            className="bg-white rounded-xl border border-slate-200 p-4 shadow-card hover:shadow-card-hover transition-all duration-200"
          >
            <div className={`w-10 h-10 rounded-lg ${stat?.bg} flex items-center justify-center mb-3`}>
              <Icon size={20} className={stat?.color} />
            </div>
            <p className="text-2xl font-bold text-slate-900 tabular-nums leading-tight">{stat?.value}</p>
            <p className="text-xs font-semibold text-slate-500 mt-0.5 leading-tight">{stat?.label}</p>
            <p className={`text-xs mt-1 font-medium ${stat?.trend === 'up' ? 'text-emerald-600' : 'text-slate-400'}`}>
              {stat?.sub}
            </p>
          </div>
        );
      })}
    </div>
  );
}