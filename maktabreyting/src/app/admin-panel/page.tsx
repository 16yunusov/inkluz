'use client';

import React, { useState, useEffect, useRef } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminContent from './components/AdminContent';
import { Bell, Search, ChevronDown, LogOut, User, Settings, Shield, X, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function AdminPanelPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, text: 'Samarqand 14-maktab yangi sertifikat yukladi', time: '5 daqiqa oldin', read: false },
    { id: 2, text: 'Yangi maktab admini tasdiqlandi', time: '23 daqiqa oldin', read: false },
    { id: 3, text: 'Tizim yangilanishi muvaffaqiyatli yakunlandi', time: '1 soat oldin', read: true },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <AdminSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Admin Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 shadow-sm z-30">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-none mb-1">Admin Panel</h1>
              <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Boshqaruv tizimi</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/home-page" className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Bosh sahifa">
              <ArrowLeft size={18} />
            </Link>
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm group focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400 transition-all w-64">
              <Search size={14} className="text-slate-400 group-focus-within:text-blue-500" />
              <input 
                type="text" 
                placeholder="Qidirish... (⌘K)" 
                className="bg-transparent border-none outline-none text-slate-700 w-full placeholder:text-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2 rounded-lg transition-all ${showNotifications ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden slide-up">
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-slate-900">Bildirishnomalar</h3>
                    <button className="text-xs text-blue-600 font-semibold hover:underline">Hammasini o'qilgan qilish</button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className={`p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 ${!n.read ? 'bg-blue-50/30' : ''}`}>
                        <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${!n.read ? 'bg-blue-600' : 'bg-transparent'}`} />
                        <div>
                          <p className="text-sm text-slate-700 leading-tight">{n.text}</p>
                          <p className="text-[11px] text-slate-400 mt-1">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-3 text-sm font-semibold text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition-colors">
                    Barcha bildirishnomalarni ko'rish
                  </button>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-all ${showUserMenu ? 'bg-slate-100 shadow-inner' : 'hover:bg-slate-100'}`}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-sm uppercase">
                  {user?.name?.split(' ').map(n => n[0]).join('') || 'SA'}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-bold text-slate-800 leading-tight">{user?.name || 'Super Admin'}</p>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-tighter">{user?.role === 'super_admin' ? 'Boshqaruvchi' : 'Maktab mas\'uli'}</p>
                </div>
                <ChevronDown size={14} className={`text-slate-400 hidden md:block transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden slide-up p-1.5">
                  <div className="px-3 py-2 mb-1 border-b border-slate-50">
                    <p className="text-sm font-bold text-slate-900">{user?.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                  </div>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-all">
                    <User size={16} /> Mening profilim
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-all">
                    <Settings size={16} /> Sozlamalar
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-all">
                    <Shield size={16} /> Xavfsizlik
                  </button>
                  <div className="h-px bg-slate-100 my-1" />
                  <button 
                    onClick={() => { logout(); toast.error('Tizimdan chiqildi'); }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-all"
                  >
                    <LogOut size={16} /> Chiqish
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto scrollbar-thin bg-slate-50/50">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 py-8">
            <AdminContent />
          </div>
        </main>
      </div>
    </div>
  );
}