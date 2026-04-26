'use client';

import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import PublicTopbar from '@/components/PublicTopbar';
import { regions, schools } from '@/data/mockData';
import { MapPin, School, ArrowLeft, ChevronRight, LayoutGrid } from 'lucide-react';

export default function RegionDistrictsPage() {
  const params = useParams();
  const regionId = params?.regionId as string;

  const region = useMemo(() => regions.find((r) => r.id === regionId), [regionId]);

  // Extract unique districts for this region
  const districts = useMemo(() => {
    const regionSchools = schools.filter(s => s.regionId === regionId);
    const districtStats: Record<string, { schoolCount: number; avgScore: number }> = {};
    
    regionSchools.forEach(s => {
      if (!districtStats[s.district]) {
        districtStats[s.district] = { schoolCount: 0, avgScore: 0 };
      }
      districtStats[s.district].schoolCount += 1;
      districtStats[s.district].avgScore += s.overallScore;
    });

    return Object.entries(districtStats).map(([name, stats]) => ({
      name,
      schoolCount: stats.schoolCount,
      avgScore: (stats.avgScore / stats.schoolCount).toFixed(1)
    }));
  }, [regionId]);

  if (!region) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <PublicTopbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-700 mb-2">Viloyat topilmadi</p>
            <Link href="/regions" className="text-blue-600 hover:underline text-sm">
              Viloyatlar ro'yxatiga qaytish
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicTopbar />

      {/* Hero */}
      <div className={`bg-gradient-to-br from-slate-800 to-slate-900 text-white relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <LayoutGrid className="w-full h-full" />
        </div>
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-12 relative z-10">
          <Link
            href="/regions"
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            Viloyatlar ro'yxati
          </Link>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className={`w-16 h-16 rounded-2xl ${region.color} flex items-center justify-center shadow-2xl shadow-blue-500/20`}>
                <MapPin size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{region.nameUz}</h1>
                <p className="text-slate-400 mt-1">
                  Barcha tumanlar va shaharlar ro'yxati
                </p>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs text-slate-400 mb-1 font-semibold uppercase tracking-wider">Tumanlar</p>
                  <p className="text-2xl font-bold">{districts.length}</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <p className="text-xs text-slate-400 mb-1 font-semibold uppercase tracking-wider">Maktablar</p>
                  <p className="text-2xl font-bold">{region.schoolCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Districts Grid */}
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Tumanlar va shaharlar</h2>
          <p className="text-slate-500">Kerakli tumanni tanlang</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {districts.map((district) => (
            <Link
              key={district.name}
              href={`/region/${regionId}/district/${encodeURIComponent(district.name)}`}
              className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {district.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {district.schoolCount} ta maktab · {district.avgScore} o'rtacha ball
                  </p>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>

        {districts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <School size={48} className="mx-auto mb-4 text-slate-200" />
            <p className="text-slate-400 text-lg">Bu viloyatda tumanlar topilmadi</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 bg-slate-900 text-slate-400 py-10">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 flex items-center justify-between">
          <p className="font-bold text-white text-sm">MaktabReyting</p>
          <p className="text-xs">© 2026 MaktabReyting. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </div>
  );
}
