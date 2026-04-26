'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { Search, Menu, X, LogIn, User as UserIcon, UserPlus, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { label: 'Bosh sahifa', href: '/home-page' },
  { label: 'Viloyatlar', href: '/regions' },
  { label: 'Reytinglar', href: '/home-page#rankings' },
  { label: 'Maktablar', href: '/home-page#schools' },
];

export default function PublicTopbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/home-page" className="flex items-center gap-2.5">
            <AppLogo size={36} />
            <span className="font-bold text-lg text-slate-900 tracking-tight hidden sm:block">
              MaktabReyting
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems?.map((item) => (
              <Link
                key={`nav-${item?.href}`}
                href={item?.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  pathname === item?.href
                    ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {item?.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition-all duration-150">
              <Search size={16} />
              <span className="text-slate-400">Qidirish...</span>
              <kbd className="ml-1 px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-xs text-slate-500">⌘K</kbd>
            </button>

            {user ? (
              /* Logged In State */
              <div className="relative">
                <button 
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold uppercase">
                    {user.name[0]}{user.lastName ? user.lastName[0] : ''}
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Kabinet</p>
                    <p className="text-xs font-black text-slate-900 leading-none">{user.name}</p>
                  </div>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform ${showUserDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 py-2 z-50 slide-up">
                    <Link 
                      href={user.role === 'student' ? '/home-page' : '/admin-panel'}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      <UserIcon size={16} className="text-blue-600" /> Profilim
                    </Link>
                    <hr className="my-1 border-slate-100" />
                    <button 
                      onClick={() => { logout(); setShowUserDropdown(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={16} /> Chiqish
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Guest State */
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-bold transition-all"
                >
                  <LogIn size={16} />
                  <span className="hidden sm:block">Kirish</span>
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200"
                >
                  <UserPlus size={16} />
                  <span className="hidden sm:block">Ro'yxatdan o'tish</span>
                </Link>
              </div>
            )}

            <button
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 fade-in">
          {navItems?.map((item) => (
            <Link
              key={`mobile-nav-${item?.href}`}
              href={item?.href}
              className="block px-4 py-3 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100"
              onClick={() => setMobileOpen(false)}
            >
              {item?.label}
            </Link>
          ))}
          {!user && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold"
                onClick={() => setMobileOpen(false)}
              >
                Kirish
              </Link>
              <Link
                href="/register"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold"
                onClick={() => setMobileOpen(false)}
              >
                Ro'yxatdan o'tish
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}