import React from 'react';

type BadgeVariant = 'active' | 'pending' | 'verified' | 'suspended' | 'gold' | 'silver' | 'bronze' | 'super_admin' | 'region_admin' | 'school_admin' | 'teacher' | 'public';

interface StatusBadgeProps {
  variant: BadgeVariant;
  label?: string;
  size?: 'sm' | 'md';
}

const variantConfig: Record<BadgeVariant, { bg: string; text: string; dot: string; defaultLabel: string }> = {
  active: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500', defaultLabel: 'Faol' },
  pending: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500', defaultLabel: 'Kutilmoqda' },
  verified: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500', defaultLabel: 'Tasdiqlangan' },
  suspended: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500', defaultLabel: 'To\'xtatilgan' },
  gold: { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500', defaultLabel: '🥇 1-o\'rin' },
  silver: { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400', defaultLabel: '🥈 2-o\'rin' },
  bronze: { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-400', defaultLabel: '🥉 3-o\'rin' },
  super_admin: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500', defaultLabel: 'Super Admin' },
  region_admin: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500', defaultLabel: 'Viloyat Admin' },
  school_admin: { bg: 'bg-teal-50', text: 'text-teal-700', dot: 'bg-teal-500', defaultLabel: 'Maktab Admin' },
  teacher: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500', defaultLabel: "O'qituvchi" },
  public: { bg: 'bg-slate-50', text: 'text-slate-600', dot: 'bg-slate-400', defaultLabel: 'Ommaviy' },
};

export default function StatusBadge({ variant, label, size = 'md' }: StatusBadgeProps) {
  const config = variantConfig[variant];
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${config.bg} ${config.text} ${sizeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} shrink-0`} />
      {label ?? config.defaultLabel}
    </span>
  );
}