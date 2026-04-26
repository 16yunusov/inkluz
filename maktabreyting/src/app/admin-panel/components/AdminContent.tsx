'use client';

import React, { useState, memo, Suspense, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import AdminDashboardStats from './AdminDashboardStats';
import { LayoutDashboard, School, Building2, Users, Award, BarChart3, MapPin, Shield, Settings } from 'lucide-react';

// Lazy-load heavy tab components so they only load when needed
const SchoolManagementTable = dynamic(() => import('./SchoolManagementTable'), {
  loading: () => <TabSkeleton />,
  ssr: false,
});
const UserManagementTable = dynamic(() => import('./UserManagementTable'), {
  loading: () => <TabSkeleton />,
  ssr: false,
});
const CertificateManagement = dynamic(() => import('./CertificateManagement'), {
  loading: () => <TabSkeleton />,
  ssr: false,
});
const ScoreManagement = dynamic(() => import('./ScoreManagement'), {
  loading: () => <TabSkeleton />,
  ssr: false,
});
const RegionManagementTable = dynamic(() => import('./RegionManagementTable'), {
  loading: () => <TabSkeleton />,
  ssr: false,
});
const PermissionManagement = dynamic(() => import('./PermissionManagement'), {
  loading: () => <TabSkeleton />,
  ssr: false,
});
const SettingsManagement = dynamic(() => import('./SettingsManagement'), {
  loading: () => <TabSkeleton />,
  ssr: false,
});

function TabSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse space-y-4">
      <div className="h-5 bg-slate-100 rounded w-48" />
      <div className="h-4 bg-slate-100 rounded w-32" />
      <div className="space-y-3 mt-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-10 bg-slate-50 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

const HierarchyAssistant = dynamic(() => import('./HierarchyAssistant'), {
  loading: () => <TabSkeleton />,
  ssr: false,
});

const sections = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'hierarchy', label: 'Ierarxiya', icon: Building2 },
  { id: 'schools', label: 'Maktablar', icon: School },
  { id: 'regions', label: 'Viloyatlar', icon: MapPin },
  { id: 'users', label: 'Foydalanuvchilar', icon: Users },
  { id: 'certificates', label: 'Sertifikatlar', icon: Award },
  { id: 'rankings', label: 'Ball boshqaruvi', icon: BarChart3 },
  { id: 'permissions', label: 'Ruxsatlar', icon: Shield },
  { id: 'settings', label: 'Sozlamalar', icon: Settings },
];

import { useAuth } from '@/context/AuthContext';

// Memoized nav so it doesn't re-render when content changes
const SectionNav = memo(function SectionNav({
  activeSection,
  onSelect,
  availableSections,
}: {
  activeSection: string;
  onSelect: (id: string) => void;
  availableSections: typeof sections;
}) {
  return (
    <div className="flex items-center gap-1 border-b border-slate-200 mb-6 overflow-x-auto scrollbar-thin pb-0">
      {availableSections.map((section) => {
        const Icon = section.icon;
        return (
          <button
            key={`admin-section-${section.id}`}
            onClick={() => onSelect(section.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-all duration-150 ${
              activeSection === section.id
                ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <Icon size={15} />
            {section.label}
          </button>
        );
      })}
    </div>
  );
});

// Memoized dashboard content
const DashboardContent = memo(function DashboardContent() {
  return (
    <div className="space-y-6">
      <AdminDashboardStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5">
          <h3 className="text-base font-bold text-slate-900 mb-4">So'nggi faoliyat</h3>
          <div className="space-y-3">
            {[
              { icon: '🏅', text: 'Samarqand 14-maktab yangi sertifikat yukladi', time: '5 daqiqa oldin', color: 'bg-amber-50' },
              { icon: '👤', text: "Yangi maktab admini qo'shildi: Andijon viloyati", time: '23 daqiqa oldin', color: 'bg-blue-50' },
              { icon: '📊', text: "Reyting qayta hisoblandi — 12 maktab o'rin almashtirdi", time: '1 soat oldin', color: 'bg-emerald-50' },
              { icon: '⚠️', text: '3 ta sertifikat tasdiqlanishini kutmoqda', time: '2 soat oldin', color: 'bg-red-50' },
              { icon: '🏫', text: "Xorazm viloyatidan 2 ta yangi maktab qo'shildi", time: '4 soat oldin', color: 'bg-violet-50' },
              { icon: '✅', text: 'Namangan 5-maktab sertifikati tasdiqlandi', time: '5 soat oldin', color: 'bg-teal-50' },
            ].map((item, i) => (
              <div key={`activity-${i}`} className={`flex items-start gap-3 p-3 rounded-lg ${item.color}`}>
                <span className="text-base shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 font-medium leading-tight">{item.text}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats by Role */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5">
          <h3 className="text-base font-bold text-slate-900 mb-4">Foydalanuvchilar rollari bo'yicha</h3>
          <div className="space-y-3">
            {[
              { role: 'Super Admin', count: 3, color: 'bg-purple-500', pct: 0.2 },
              { role: 'Viloyat Admin', count: 14, color: 'bg-blue-500', pct: 1.1 },
              { role: 'Maktab Admin', count: 487, color: 'bg-teal-500', pct: 37.9 },
              { role: "O'qituvchi", count: 780, color: 'bg-emerald-500', pct: 60.8 },
            ].map((item) => (
              <div key={`role-stat-${item.role}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                    <span className="text-sm font-medium text-slate-700">{item.role}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900 tabular-nums">{item.count}</span>
                </div>
                <div className="bg-slate-100 rounded-full h-2">
                  <div className={`h-2 rounded-full ${item.color} transition-all duration-500`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <h4 className="text-sm font-bold text-slate-900 mb-3">Tizim holati</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'API javob vaqti', value: '124ms', status: 'ok' },
                { label: "Ma'lumotlar bazasi", value: 'Faol', status: 'ok' },
                { label: "So'nggi backup", value: '02:00 bugun', status: 'ok' },
                { label: 'Xatoliklar (24s)', value: '2 ta', status: 'warn' },
              ].map((item) => (
                <div key={`sys-stat-${item.label}`} className={`p-3 rounded-lg ${item.status === 'ok' ? 'bg-emerald-50' : 'bg-amber-50'}`}>
                  <p className="text-xs text-slate-500 font-medium">{item.label}</p>
                  <p className={`text-sm font-bold mt-0.5 ${item.status === 'ok' ? 'text-emerald-700' : 'text-amber-700'}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default function AdminContent() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  const availableSections = useMemo(() => {
    return sections.filter((s) => {
      if (user?.role === 'super_admin') return true;
      if (user?.role === 'school_admin') {
        return ['dashboard', 'certificates'].includes(s.id);
      }
      return false;
    });
  }, [user]);

  // Sync with hash on mount and on hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && availableSections.some((s) => s.id === hash)) {
        setActiveSection(hash);
      } else if (!hash) {
        setActiveSection('dashboard');
      }
    };

    handleHashChange(); // Initial check
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [availableSections]);

  const handleSelect = (id: string) => {
    setActiveSection(id);
    window.location.hash = id;
  };

  return (
    <div>
      <SectionNav 
        activeSection={activeSection} 
        onSelect={handleSelect} 
        availableSections={availableSections} 
      />

      <div className="fade-in min-h-[400px]">
        {activeSection === 'dashboard' && <DashboardContent />}
        {activeSection === 'hierarchy' && (
          <Suspense fallback={<TabSkeleton />}>
            <HierarchyAssistant />
          </Suspense>
        )}
        {activeSection === 'schools' && (
          <Suspense fallback={<TabSkeleton />}>
            <SchoolManagementTable />
          </Suspense>
        )}
        {activeSection === 'regions' && (
          <Suspense fallback={<TabSkeleton />}>
            <RegionManagementTable />
          </Suspense>
        )}
        {activeSection === 'users' && (
          <Suspense fallback={<TabSkeleton />}>
            <UserManagementTable />
          </Suspense>
        )}
        {activeSection === 'certificates' && (
          <Suspense fallback={<TabSkeleton />}>
            <CertificateManagement />
          </Suspense>
        )}
        {activeSection === 'rankings' && (
          <Suspense fallback={<TabSkeleton />}>
            <ScoreManagement />
          </Suspense>
        )}
        {activeSection === 'permissions' && (
          <Suspense fallback={<TabSkeleton />}>
            <PermissionManagement />
          </Suspense>
        )}
        {activeSection === 'settings' && (
          <Suspense fallback={<TabSkeleton />}>
            <SettingsManagement />
          </Suspense>
        )}
      </div>
    </div>
  );
}