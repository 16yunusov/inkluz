'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import {
  LayoutDashboard,
  School,
  Building2,
  Users,
  Award,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Shield,
  MapPin,
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';
import { toast } from 'sonner';


const navGroups = [
  {
    label: 'Asosiy',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/admin-panel', badge: null },
      { icon: Building2, label: 'Ierarxiya', href: '/admin-panel#hierarchy', badge: 'New' },
      { icon: School, label: 'Maktablar', href: '/admin-panel#schools', badge: '487' },
      { icon: MapPin, label: 'Viloyatlar', href: '/admin-panel#regions', badge: null },
    ],
  },
  {
    label: 'Boshqaruv',
    items: [
      { icon: Award, label: 'Sertifikatlar', href: '/admin-panel#certificates', badge: '23' },
      { icon: BarChart3, label: 'Reytinglar', href: '/admin-panel#rankings', badge: null },
      { icon: Users, label: 'Foydalanuvchilar', href: '/admin-panel#users', badge: null },
    ],
  },
  {
    label: 'Tizim',
    items: [
      { icon: Shield, label: 'Ruxsatlar', href: '/admin-panel#permissions', badge: null },
      { icon: Settings, label: 'Sozlamalar', href: '/admin-panel#settings', badge: null },
    ],
  },
];

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

import { useAuth } from '@/context/AuthContext';

export default function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [currentHash, setCurrentHash] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash.replace('#', ''));
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Filter navigation based on role
  const filteredNavGroups = navGroups.map(group => ({
    ...group,
    items: group.items.filter(item => {
      if (user?.role === 'super_admin') return true;
      if (user?.role === 'school_admin') {
        // School admins only see Dashboard and Certificates (for their school)
        return ['Dashboard', 'Sertifikatlar'].includes(item.label);
      }
      return false;
    })
  })).filter(group => group.items.length > 0);

  return (
    <aside
      className={`flex flex-col h-screen bg-slate-900 text-white transition-all duration-300 ease-in-out ${
        collapsed ? 'w-16' : 'w-60'
      } shrink-0`}
    >
      {/* Logo */}
      <div className={`flex items-center h-16 border-b border-slate-700/50 ${collapsed ? 'justify-center px-0' : 'px-4 gap-3'}`}>
        <AppLogo size={32} />
        {!collapsed && (
          <span className="font-bold text-sm text-white tracking-tight truncate">
            MaktabReyting
          </span>
        )}
      </div>

    {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin">
        {filteredNavGroups.map((group) => (
          <div key={`group-${group.label}`} className="mb-4">
            {!collapsed && (
              <p className="px-4 mb-1.5 text-xs font-semibold uppercase tracking-widest text-slate-500">
                {group.label}
              </p>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              // Check if item is active based on pathname AND hash
              const [hrefPath, hrefHash] = item.href.split('#');
              const normalizedHrefHash = hrefHash || '';
              
              const isActive = pathname === hrefPath && (
                (!normalizedHrefHash && !currentHash) || 
                (normalizedHrefHash === currentHash) ||
                (hrefPath === '/admin-panel' && !normalizedHrefHash && currentHash === 'dashboard')
              );

              return (
                <Link
                  key={`sidebar-${item.href}-${item.label}`}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={`relative flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg mb-0.5 text-sm font-medium transition-all duration-150 group ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon size={18} className="shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                  {!collapsed && item.badge && (
                    <span className="ml-auto bg-amber-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full leading-none">
                      {item.badge}
                    </span>
                  )}
                  {collapsed && item.badge && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full" />
                  )}
                  {collapsed && (
                    <span className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50">
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-700/50 p-3">
        {!collapsed && (
          <div className="flex items-center gap-3 px-2 py-2 mb-2 rounded-lg bg-slate-800">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold shrink-0 uppercase">
              {user?.name.split(' ').map(n => n[0]).join('') || 'SA'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.name || 'Super Admin'}</p>
              <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>
        )}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { logout(); toast.error('Tizimdan chiqildi'); }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white text-sm transition-all duration-150 ${collapsed ? 'w-full justify-center' : 'flex-1'}`}
            title="Chiqish"
          >
            <LogOut size={16} />
            {!collapsed && <span>Chiqish</span>}
          </button>
          <button
            onClick={onToggle}
            className="p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-150"
            title={collapsed ? 'Kengaytirish' : 'Yig\'ish'}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </div>
    </aside>
  );
}