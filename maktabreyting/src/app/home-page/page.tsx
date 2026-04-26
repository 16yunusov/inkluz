import React from 'react';
import PublicTopbar from '@/components/PublicTopbar';
import HeroStats from './components/HeroStats';
import RegionGrid from './components/RegionGrid';
import NationalRankingTable from './components/NationalRankingTable';
import RegionalBarChart from './components/RegionalBarChart';
import { TrendingUp, Award } from 'lucide-react';
import StudentQuickInfo from './components/StudentQuickInfo';

// Backend integration: GET /api/stats/national → hero stats
// Backend integration: GET /api/regions → region cards
// Backend integration: GET /api/schools?sort=rank → ranking table

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <PublicTopbar />
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-500/30 text-blue-200 text-xs font-semibold px-2.5 py-1 rounded-full">
                  2025-2026 o'quv yili
                </span>
                <span className="bg-amber-500/20 text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                  Jonli yangilanish
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-2">
                O'zbekiston Maktab<br />
                <span className="text-amber-300">Reyting Tizimi</span>
              </h1>
              <p className="text-blue-200 text-sm max-w-lg">
                4,545 ta maktabni yagona raqamli platformada kuzating. Sertifikatlar, olimpiadalar, imtihon natijalari va davomat asosida avtomatik reyting.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[140px]">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp size={16} className="text-amber-300" />
                  <span className="text-xs text-blue-200 font-medium">Bu oyda</span>
                </div>
                <p className="text-2xl font-bold tabular-nums">+341</p>
                <p className="text-xs text-blue-300">yangi sertifikat</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[140px]">
                <div className="flex items-center gap-2 mb-1">
                  <Award size={16} className="text-amber-300" />
                  <span className="text-xs text-blue-200 font-medium">Lider</span>
                </div>
                <p className="text-sm font-bold leading-tight">1-sonli ixtisoslashtirilgan</p>
                <p className="text-xs text-blue-300">96.4 ball · Toshkent sh.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-8 space-y-8">
        {/* Hero Stats */}
        <HeroStats />

        {/* Student Specific Section (If logged in) */}
        <StudentQuickInfo />

        {/* Region Grid */}
        <div id="regions">
          <RegionGrid />
        </div>

        {/* Chart + Quick Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <RegionalBarChart />
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5">
            <h3 className="text-base font-bold text-slate-900 mb-4">🏆 Bu oyning eng yaxshi maktablari</h3>
            <div className="space-y-3">
              {[
                { rank: 1, name: '1-sonli ixtisoslashtirilgan maktab', region: 'Toshkent sh.', score: 96.4 },
                { rank: 2, name: "Mirzo Ulug'bek nomidagi maktab", region: 'Toshkent sh.', score: 94.1 },
                { rank: 3, name: 'Samarqand 14-ixtisoslashtirilgan', region: 'Samarqand', score: 92.8 },
                { rank: 4, name: "Farg'ona 7-ixtisoslashtirilgan", region: "Farg'ona", score: 91.5 },
                { rank: 5, name: 'Andijon 2-ixtisoslashtirilgan', region: 'Andijon', score: 90.2 },
              ]?.map((item) => (
                <div key={`top5-${item?.rank}`} className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    item?.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                    item?.rank === 2 ? 'bg-slate-100 text-slate-600' :
                    item?.rank === 3 ? 'bg-orange-100 text-orange-600': 'bg-slate-50 text-slate-500'
                  }`}>
                    {item?.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{item?.name}</p>
                    <p className="text-xs text-slate-400">{item?.region}</p>
                  </div>
                  <span className="text-sm font-bold text-blue-700 tabular-nums shrink-0">{item?.score}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-400 text-center">
                So'nggi yangilanish: 25.04.2026, 16:33
              </p>
            </div>
          </div>
        </div>

        {/* National Ranking Table */}
        <div id="rankings" className="scroll-mt-20">
          <div id="schools">
            <NationalRankingTable />
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="mt-12 bg-slate-900 text-slate-400 py-8">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-white text-sm">MaktabReyting</p>
            <p className="text-xs mt-0.5">O'zbekiston Xalq Ta'limi Vazirligi</p>
          </div>
          <p className="text-xs">© 2026 MaktabReyting. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </div>
  );
}