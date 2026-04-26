'use client';

import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import RankBadge from '@/components/ui/RankBadge';
import StatusBadge from '@/components/ui/StatusBadge';
import { schools } from '@/data/mockData';
import { MapPin, Users, User, Calendar, ArrowLeft, Share2, Download, Award,  } from 'lucide-react';

// Backend integration: GET /api/schools/:id → school profile
const school = schools?.[0];

export default function SchoolHeader() {
  return (
    <div className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-5">
          <Link href="/home-page" className="hover:text-blue-600 flex items-center gap-1 transition-colors">
            <ArrowLeft size={14} />
            Bosh sahifa
          </Link>
          <span>/</span>
          <span>{school?.regionName}</span>
          <span>/</span>
          <span>{school?.district}</span>
          <span>/</span>
          <span className="text-slate-900 font-medium truncate max-w-xs">{school?.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* School Image */}
          <div className="w-full lg:w-48 h-36 lg:h-36 rounded-xl overflow-hidden bg-slate-100 shrink-0 shadow-md">
            <AppImage
              src={school?.image}
              alt={`${school?.name} maktab binosi tashqi ko'rinishi`}
              width={192}
              height={144}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* School Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start gap-3 mb-2">
              <RankBadge rank={school?.nationalRank} size="lg" />
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-slate-900 leading-tight">{school?.name}</h1>
                <div className="flex flex-wrap items-center gap-3 mt-1.5">
                  <StatusBadge variant={school?.status} />
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar size={12} />
                    Ro'yxatga olingan: {school?.createdAt}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-400 font-medium">Viloyat</p>
                  <p className="text-sm font-semibold text-slate-800">{school?.regionName}</p>
                  <p className="text-xs text-slate-500">{school?.district}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <User size={16} className="text-indigo-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-400 font-medium">Direktor</p>
                  <p className="text-sm font-semibold text-slate-800 leading-tight">{school?.director}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Users size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-400 font-medium">O'quvchilar</p>
                  <p className="text-sm font-bold text-slate-800 tabular-nums">{school?.studentCount?.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Award size={16} className="text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-400 font-medium">Sertifikatlar</p>
                  <p className="text-sm font-bold text-slate-800 tabular-nums">{school?.certificates} ta</p>
                </div>
              </div>
            </div>
          </div>

          {/* Score Badge + Actions */}
          <div className="flex flex-col items-center gap-3 lg:items-end">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white text-center shadow-lg min-w-[140px]">
              <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider mb-1">Umumiy ball</p>
              <p className="text-4xl font-bold tabular-nums">{school?.overallScore}</p>
              <p className="text-xs text-blue-200 mt-1">/ 100 maksimal</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-center px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-400 font-medium">Milliy</p>
                <p className="text-sm font-bold text-slate-900 tabular-nums">#{school?.nationalRank}</p>
              </div>
              <div className="text-center px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-400 font-medium">Viloyat</p>
                <p className="text-sm font-bold text-slate-900 tabular-nums">#{school?.regionRank}</p>
              </div>
              <div className="text-center px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-400 font-medium">Tuman</p>
                <p className="text-sm font-bold text-slate-900 tabular-nums">#{school?.districtRank}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-all duration-150">
                <Share2 size={14} />
                Ulashish
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-all duration-150">
                <Download size={14} />
                PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}