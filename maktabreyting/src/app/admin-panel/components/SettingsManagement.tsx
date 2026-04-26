'use client';

import React, { useState } from 'react';
import { Settings, Bell, Shield, Globe, Save, RefreshCw } from 'lucide-react';

export default function SettingsManagement() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[600px] flex">
      {/* Sidebar Tabs */}
      <div className="w-64 border-r border-slate-100 bg-slate-50/50 p-4 space-y-1">
        <button
          onClick={() => setActiveTab('general')}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'general' ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          <Settings size={18} /> Umumiy
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'notifications' ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          <Bell size={18} /> Bildirishnomalar
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'security' ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          <Shield size={18} /> Xavfsizlik
        </button>
        <button
          onClick={() => setActiveTab('localization')}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'localization' ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          <Globe size={18} /> Mahalliylashtirish
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8">
        <div className="max-w-2xl">
          {activeTab === 'general' && (
            <div className="space-y-6 fade-in">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Umumiy sozlamalar</h3>
                <p className="text-sm text-slate-500">Tizimning asosiy parametrlari</p>
              </div>

              <div className="space-y-4">
                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-slate-700">Tizim nomi</label>
                  <input
                    type="text"
                    defaultValue="MaktabReyting — O'zbekiston"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-slate-700">Qo'llab-quvvatlash emaili</label>
                  <input
                    type="email"
                    defaultValue="support@maktabreyting.uz"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div className="pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Texnik ishlar rejimi</p>
                    <p className="text-xs text-slate-500">Faqat adminlar tizimga kira oladi</p>
                  </div>
                  <button className="w-11 h-6 bg-slate-200 rounded-full relative transition-all">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                  </button>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Yangi maktablar registratsiyasi</p>
                    <p className="text-xs text-slate-500">Ommaviy registratsiyani yoqish/o'chirish</p>
                  </div>
                  <button className="w-11 h-6 bg-blue-600 rounded-full relative transition-all">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                  </button>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 flex gap-3">
                <button className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all flex items-center gap-2">
                  <Save size={16} /> Saqlash
                </button>
                <button className="px-5 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-all flex items-center gap-2">
                  <RefreshCw size={16} /> Tiklash
                </button>
              </div>
            </div>
          )}

          {activeTab !== 'general' && (
            <div className="flex flex-col items-center justify-center h-full py-20 text-slate-400">
              <Settings size={48} className="mb-4 opacity-20" />
              <p className="text-sm font-medium">Bu bo'lim tez orada ishga tushadi</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
