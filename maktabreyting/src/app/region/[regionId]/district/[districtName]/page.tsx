'use client';

import React, { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import PublicTopbar from '@/components/PublicTopbar';
import { regions, schools } from '@/data/mockData';
import { MapPin, School as SchoolIcon, ArrowLeft, Star, Search, Filter, SortAsc, Users, ChevronRight } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';

export default function DistrictSchoolsPage() {
  const params = useParams();
  const regionId = params?.regionId as string;
  const districtName = decodeURIComponent(params?.districtName as string);

  const region = useMemo(() => regions.find((r) => r.id === regionId), [regionId]);
  
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'name'>('rating');

  const districtSchools = useMemo(() => {
    let filtered = schools.filter(s => s.regionId === regionId && s.district === districtName);
    
    if (search) {
      filtered = filtered.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (sortBy === 'rating') {
      filtered.sort((a, b) => b.overallScore - a.overallScore);
    } else {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [regionId, districtName, search, sortBy]);

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
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-10">
          <Link
            href={`/region/${regionId}`}
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-blue-600 text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            {region.nameUz} tumanlari
          </Link>
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2.5 py-1 rounded-md ${region.color} text-white text-[10px] font-bold uppercase tracking-wider`}>
                  {region.nameUz}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="text-sm font-semibold text-slate-500">{districtName}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">Maktablar ro'yxati</h1>
              <p className="text-slate-500 max-w-xl">
                {districtName} hududidagi barcha maktablar reytingi, o'quvchilar soni va yutuqlari bilan tanishing.
              </p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-72">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Maktab nomi..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-transparent rounded-xl text-sm focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2.5 bg-slate-100 border border-transparent rounded-xl text-sm font-semibold text-slate-700 focus:bg-white focus:border-blue-400 transition-all"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="rating">Reyting bo'yicha</option>
                <option value="name">Nomi bo'yicha</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Schools List */}
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {districtSchools.map((school) => (
            <Link
              key={school.id}
              href={`/school-detail-page?id=${school.id}`}
              className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row h-full">
                <div className="w-full sm:w-48 h-48 sm:h-auto relative overflow-hidden">
                  <AppImage
                    src={school.image}
                    alt={school.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-slate-900 shadow-sm">
                      #{school.nationalRank}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1 p-6 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                      {school.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100 shadow-sm">
                      <Star size={14} className="text-amber-500 fill-amber-500" />
                      <span className="text-sm font-black text-amber-700">{school.overallScore}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <MapPin size={14} />
                      <span>{school.district}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Users size={14} />
                      <span>{school.studentCount.toLocaleString()} o'quvchi</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden">
                          <img src={`https://i.pravatar.cc/150?u=${school.id}${i}`} alt="user" className="w-full h-full object-cover" />
                        </div>
                      ))}
                      <div className="w-6 h-6 rounded-full border-2 border-white bg-blue-50 flex items-center justify-center text-[8px] font-bold text-blue-600">
                        +{school.certificates}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Batafsil <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {districtSchools.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <SchoolIcon size={40} className="text-slate-200" />
            </div>
            <p className="text-slate-400 text-lg font-medium">Bu tumanda maktablar topilmadi</p>
            <p className="text-slate-300 text-sm mt-1">Qidiruv so'rovini o'zgartirib ko'ring</p>
          </div>
        )}
      </div>
    </div>
  );
}
