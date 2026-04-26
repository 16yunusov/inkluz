'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { School, Award, TrendingUp, ArrowRight } from 'lucide-react';
import { schools } from '@/data/mockData';
import Link from 'next/link';

export default function StudentQuickInfo() {
  const { user } = useAuth();

  if (!user || user.role !== 'student') return null;

  const mySchool = schools.find(s => s.id === user.school);

  return (
    <div className="bg-white rounded-[2rem] border border-blue-100 p-6 shadow-xl shadow-blue-500/5 mb-8 overflow-hidden relative group">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <School size={32} />
          </div>
          <div>
            <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Mening maktabim</h3>
            <h2 className="text-xl font-black text-slate-900 leading-tight">
              {mySchool?.name || user.school}
            </h2>
            <p className="text-sm text-slate-500 font-medium">{user.region}, {user.district}</p>
          </div>
        </div>

        <div className="flex items-center gap-8 md:border-l border-slate-100 md:pl-8">
          <div className="text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Reyting (Tuman)</p>
            <p className="text-2xl font-black text-slate-900">#{mySchool?.districtRank || '—'}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Umumiy ball</p>
            <p className="text-2xl font-black text-blue-600">{mySchool?.overallScore || '—'}</p>
          </div>
          <Link 
            href={`/region/${mySchool?.regionId}/district/${mySchool?.district}`}
            className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all group-hover:translate-x-1"
          >
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
      
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-32 h-full bg-blue-50/50 -skew-x-12 translate-x-12" />
    </div>
  );
}
