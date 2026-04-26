'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { User, LogOut, Award, BookOpen, Bell, Settings, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user || user.role !== 'student') {
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/home-page" className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <AppLogo size={24} className="text-white" />
            </div>
            <span className="font-black text-slate-900 uppercase tracking-tight text-sm">MaktabReyting</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-px bg-slate-100 mx-1" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-slate-900 leading-none">{user.name} {user.lastName}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">{user.sinf} sinf o'quvchisi</p>
              </div>
              <button 
                onClick={() => { logout(); toast.error('Tizimdan chiqildi'); }}
                className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 md:p-12 text-white mb-8 shadow-2xl shadow-blue-200/50 relative overflow-hidden">
          <div className="relative z-10">
            <Link href="/home-page" className="inline-flex items-center gap-2 text-blue-100 text-xs font-bold uppercase tracking-widest mb-6 hover:text-white transition-colors">
              <ArrowLeft size={14} /> Asosiy sahifa
            </Link>
            <h2 className="text-3xl md:text-4xl font-black mb-2">Salom, {user.name}! 👋</h2>
            <p className="text-blue-100 text-sm md:text-base font-medium max-w-lg">
              Sizning maktabingiz ({user.school}) hozirda tumanda 1-o'rinda! O'z yutuqlaringizni kuzatib boring.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex-1 min-w-[140px]">
                <p className="text-[10px] font-bold text-blue-200 uppercase mb-1">Mening ballarim</p>
                <p className="text-2xl font-black">124</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex-1 min-w-[140px]">
                <p className="text-[10px] font-bold text-blue-200 uppercase mb-1">Sertifikatlar</p>
                <p className="text-2xl font-black">8 ta</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex-1 min-w-[140px]">
                <p className="text-[10px] font-bold text-blue-200 uppercase mb-1">Reyting (sinfda)</p>
                <p className="text-2xl font-black">#3</p>
              </div>
            </div>
          </div>
          
          {/* Decorative shapes */}
          <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-[-20%] left-[10%] w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Stats & Activities */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Awards */}
            <section>
              <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">So'nggi yutuqlarim</h3>
                <Link href="#" className="text-xs font-bold text-blue-600 hover:underline">Barchasi</Link>
              </div>
              <div className="grid gap-4">
                {[
                  { title: 'Matematika olimpiadasi', date: '12-Aprel, 2026', score: '+20', category: 'Olimpiada', color: 'text-amber-600 bg-amber-50' },
                  { title: 'Ingliz tili IELTS 7.0', date: '05-Mart, 2026', score: '+15', category: 'Til bilimi', color: 'text-blue-600 bg-blue-50' },
                  { title: 'Shaxmat musobaqasi', date: '20-Fevral, 2026', score: '+10', category: 'Sport', color: 'text-emerald-600 bg-emerald-50' },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center justify-between hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${item.color}`}>
                        <Award size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-black uppercase text-slate-400">{item.category}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span className="text-[10px] font-bold text-slate-400">{item.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-slate-900">{item.score}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">ball</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Profile & Tools */}
          <div className="space-y-8">
            {/* Quick Profile */}
            <section className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-xl shadow-slate-200/40">
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-tr from-blue-500 to-indigo-600 mx-auto mb-4 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-blue-200">
                  {user.name[0]}{user.lastName ? user.lastName[0] : ''}
                </div>
                <h3 className="text-xl font-black text-slate-900">{user.name} {user.lastName}</h3>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">{user.sinf} Sinf</p>
              </div>
              
              <div className="space-y-3">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Foydalanuvchi nomi</p>
                  <p className="text-sm font-bold text-slate-700">@{user.username}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">ID raqami</p>
                  <p className="text-sm font-bold text-slate-700">STD-2026-{user.id.split('-').pop()}</p>
                </div>
              </div>

              <button className="w-full mt-6 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                <Settings size={14} /> Sozlamalar
              </button>
            </section>

            {/* Support/Help */}
            <section className="bg-blue-50 rounded-[2rem] p-6 border border-blue-100">
              <h4 className="font-black text-blue-900 text-sm uppercase tracking-tight mb-2">Yordam kerakmi?</h4>
              <p className="text-xs text-blue-700 font-medium leading-relaxed mb-4">
                Sertifikat yuklashda yoki ma'lumotlarda xatolik bo'lsa maktab adminiga murojaat qiling.
              </p>
              <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-1">
                Admin bilan bog'lanish <ArrowLeft size={12} className="rotate-180" />
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
