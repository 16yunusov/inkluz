'use client';

import React, { useState } from 'react';
import ScoreBreakdownChart from './ScoreBreakdownChart';
import RankingTrendChart from './RankingTrendChart';
import CertificatesTable from './CertificatesTable';
import { schools } from '@/data/mockData';
import { BarChart3, Award, TrendingUp, Info } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const tabs = [
  { id: 'overview', label: 'Umumiy ko\'rinish', icon: BarChart3 },
  { id: 'certificates', label: 'Sertifikatlar', icon: Award },
  { id: 'trends', label: 'Tendensiya', icon: TrendingUp },
  { id: 'info', label: 'Ma\'lumot', icon: Info },
];

const school = schools?.[0];

export default function SchoolTabs() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div>
      {/* Tab Nav */}
      <div className="flex items-center gap-1 border-b border-slate-200 mb-6 overflow-x-auto scrollbar-thin">
        {tabs?.map((tab) => {
          const Icon = tab?.icon;
          return (
            <button
              key={`tab-${tab?.id}`}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-all duration-150 ${
                activeTab === tab?.id
                  ? 'border-blue-600 text-blue-700' :'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <Icon size={15} />
              {tab?.label}
            </button>
          );
        })}
      </div>
      {/* Tab Content */}
      <div className="fade-in">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <ScoreBreakdownChart />
            <RankingTrendChart />
          </div>
        )}

        {activeTab === 'certificates' && <CertificatesTable />}

        {activeTab === 'trends' && (
          <div className="space-y-5">
            <RankingTrendChart />
            <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5">
              <h3 className="text-base font-bold text-slate-900 mb-4">Oylik sertifikat dinamikasi</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {['May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek', 'Yan', 'Fev', 'Mar', 'Apr']?.map((month, i) => (
                  <div key={`month-cert-${month}`} className="bg-slate-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-slate-400 font-medium mb-1">{month}</p>
                    <p className="text-lg font-bold text-slate-800 tabular-nums">{[2, 3, 4, 3, 5, 4, 6, 5, 7, 6, 8, 5]?.[i]}</p>
                    <p className="text-xs text-slate-400">sertifikat</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5">
            <h3 className="text-base font-bold text-slate-900 mb-4">Maktab haqida ma'lumot</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Maktab nomi</p>
                  <p className="text-sm font-medium text-slate-800">{school?.name}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Direktor</p>
                  <p className="text-sm font-medium text-slate-800">{school?.director}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Viloyat / Tuman</p>
                  <p className="text-sm font-medium text-slate-800">{school?.regionName} / {school?.district}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">O'quvchilar soni</p>
                  <p className="text-sm font-medium text-slate-800 tabular-nums">{school?.studentCount?.toLocaleString()} nafar</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Ro'yxatga olingan</p>
                  <p className="text-sm font-medium text-slate-800">{school?.createdAt}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Holat</p>
                  <p className="text-sm font-medium text-emerald-600">Faol va tasdiqlangan</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}