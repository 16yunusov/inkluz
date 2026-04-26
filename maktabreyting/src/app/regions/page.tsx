'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PublicTopbar from '@/components/PublicTopbar';
import { regions } from '@/data/mockData';
import { MapPin, School, TrendingUp, ChevronRight, Search } from 'lucide-react';

export default function RegionsPage() {
  const [search, setSearch] = useState('');

  const filteredRegions = regions.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) || 
    r.nameUz.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicTopbar />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">O'zbekiston viloyatlari</h1>
            <p className="text-blue-100 text-lg mb-8">
              Respublikamizning barcha 14 ta hududi bo'yicha maktablar reytingi va statistik ma'lumotlari bilan tanishing.
            </p>
            
            <div className="relative max-w-md">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" />
              <input
                type="text"
                placeholder="Viloyatni qidirish..."
                className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Regions Grid */}
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRegions.map((region) => (
            <Link
              key={region.id}
              href={`/region/${region.id}`}
              className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className={`w-12 h-12 rounded-xl ${region.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <MapPin size={24} className="text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {region.nameUz}
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <School size={16} /> Maktablar
                    </span>
                    <span className="font-bold text-slate-900">{region.schoolCount} ta</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <TrendingUp size={16} /> O'rtacha ball
                    </span>
                    <span className="font-bold text-emerald-600">{region.avgScore}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-blue-600 font-semibold text-sm">
                  <span>Tumanlarni ko'rish</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {filteredRegions.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">Hech qanday viloyat topilmadi</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <MapPin size={20} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-lg mb-0.5">MaktabReyting</p>
              <p className="text-sm">O'zbekiston Xalq Ta'limi Vazirligi</p>
            </div>
          </div>
          <p className="text-sm">© 2026 MaktabReyting. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </div>
  );
}
