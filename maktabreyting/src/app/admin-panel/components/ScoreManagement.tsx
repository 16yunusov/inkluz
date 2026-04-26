'use client';

import React, { useState } from 'react';
import { schools } from '@/data/mockData';
import ScoreBar from '@/components/ui/ScoreBar';
import { toast } from 'sonner';
import { Save, RefreshCw, AlertTriangle, BarChart3 } from 'lucide-react';

// Backend integration: PATCH /api/admin/schools/:id/scores → update score components
// Backend integration: POST /api/admin/ranking/recalculate → trigger full recalculation

interface ScoreEditState {
  olimpiadScore: number;
  examAvg: number;
  attendance: number;
  teacherRating: number;
}

export default function ScoreManagement() {
  const [selectedSchoolId, setSelectedSchoolId] = useState(schools[0].id);
  const [editScores, setEditScores] = useState<ScoreEditState | null>(null);
  const [saving, setSaving] = useState(false);
  const [recalculating, setRecalculating] = useState(false);

  const selectedSchool = schools.find((s) => s.id === selectedSchoolId) ?? schools[0];

  const currentEdit = editScores ?? {
    olimpiadScore: selectedSchool.olimpiadScore,
    examAvg: selectedSchool.examAvg,
    attendance: selectedSchool.attendance,
    teacherRating: selectedSchool.teacherRating,
  };

  const previewTotal = Math.round(
    (currentEdit.olimpiadScore * 0.25) +
    (currentEdit.examAvg * 0.30) +
    (currentEdit.attendance * 0.20) +
    (currentEdit.teacherRating * 0.25)
  );

  const handleSave = async () => {
    setSaving(true);
    // Backend integration: PATCH /api/admin/schools/:id/scores { olimpiadScore, examAvg, attendance, teacherRating }
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setEditScores(null);
    toast.success(`${selectedSchool.name} ballari yangilandi — reyting qayta hisoblandi`);
  };

  const handleRecalculate = async () => {
    setRecalculating(true);
    // Backend integration: POST /api/admin/ranking/recalculate → triggers full national recalculation
    await new Promise((r) => setTimeout(r, 1500));
    setRecalculating(false);
    toast.success('Barcha maktablar reytingi qayta hisoblandi');
  };

  const scoreFields: Array<{
    key: keyof ScoreEditState;
    label: string;
    description: string;
    weight: string;
    color: string;
  }> = [
    { key: 'olimpiadScore', label: 'Olimpiad natijalari', description: "Olimpiad g'olibliklaridan to'plangan ball", weight: '25%', color: 'bg-blue-500' },
    { key: 'examAvg', label: 'Imtihon o\'rtachasi', description: 'Barcha fanlar bo\'yicha o\'rtacha imtihon bali', weight: '30%', color: 'bg-emerald-500' },
    { key: 'attendance', label: 'Davomat foizi', description: 'Yil davomidagi o\'rtacha davomat', weight: '20%', color: 'bg-violet-500' },
    { key: 'teacherRating', label: "O'qituvchi bahosi", description: "O'qituvchilarning umumiy baholash natijasi", weight: '25%', color: 'bg-rose-500' },
  ];

  return (
    <div className="space-y-5">
      {/* Warning Banner */}
      <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
        <AlertTriangle size={18} className="text-amber-600 shrink-0" />
        <p className="text-sm text-amber-800">
          <span className="font-bold">Diqqat:</span> Ball o'zgartirishlar darhol reyting jadvaliga ta'sir qiladi. Faqat tasdiqlangan ma'lumotlar asosida o'zgartiring.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* School Selector */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5">
          <h4 className="text-sm font-bold text-slate-900 mb-3">Maktab tanlash</h4>
          <div className="space-y-1.5 max-h-[400px] overflow-y-auto scrollbar-thin">
            {schools.map((school) => (
              <button
                key={`score-school-${school.id}`}
                onClick={() => { setSelectedSchoolId(school.id); setEditScores(null); }}
                className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-150 ${
                  selectedSchoolId === school.id
                    ? 'bg-blue-600 text-white' :'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <p className={`text-sm font-semibold truncate ${selectedSchoolId === school.id ? 'text-white' : 'text-slate-800'}`}>
                  {school.name}
                </p>
                <p className={`text-xs ${selectedSchoolId === school.id ? 'text-blue-200' : 'text-slate-400'}`}>
                  #{school.nationalRank} · {school.overallScore} ball
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Score Editor */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-card p-5">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h4 className="text-base font-bold text-slate-900">{selectedSchool.name}</h4>
              <p className="text-xs text-slate-500 mt-0.5">{selectedSchool.regionName} · {selectedSchool.district}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRecalculate}
                disabled={recalculating}
                className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-60 transition-all"
              >
                <RefreshCw size={14} className={recalculating ? 'animate-spin' : ''} />
                {recalculating ? 'Hisoblanmoqda...' : 'Qayta hisoblash'}
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !editScores}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Saqlanmoqda...
                  </>
                ) : (
                  <>
                    <Save size={14} />
                    Saqlash
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-5">
            {scoreFields.map((field) => (
              <div key={`score-field-${field.key}`}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${field.color} shrink-0`} />
                      <span className="text-sm font-semibold text-slate-700">{field.label}</span>
                      <span className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded font-medium">{field.weight}</span>
                    </div>
                    <p className="text-xs text-slate-400 ml-4 mt-0.5 pl-4">{field.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={currentEdit[field.key]}
                      onChange={(e) => setEditScores({ ...currentEdit, [field.key]: Math.min(100, Math.max(0, Number(e.target.value))) })}
                      className="w-16 px-2 py-1.5 text-sm font-bold text-center border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 tabular-nums transition-all"
                    />
                    <span className="text-xs text-slate-400">/ 100</span>
                  </div>
                </div>
                <ScoreBar value={currentEdit[field.key]} max={100} color={field.color} height="h-2" showValue={false} />
              </div>
            ))}

            {/* Preview Total */}
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 size={18} className="text-blue-600" />
                  <span className="text-sm font-bold text-slate-700">Yangi umumiy ball (ko'rinish)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-400 line-through tabular-nums">{selectedSchool.overallScore}</span>
                  <span className={`text-xl font-bold tabular-nums ${previewTotal > selectedSchool.overallScore ? 'text-emerald-600' : previewTotal < selectedSchool.overallScore ? 'text-red-500' : 'text-slate-700'}`}>
                    {previewTotal}
                  </span>
                  {previewTotal !== selectedSchool.overallScore && (
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${previewTotal > selectedSchool.overallScore ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                      {previewTotal > selectedSchool.overallScore ? '+' : ''}{previewTotal - selectedSchool.overallScore}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-2">
                <ScoreBar value={previewTotal} max={100} color="bg-blue-600" height="h-3" showValue={false} />
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Formula: Olimpiad×25% + Imtihon×30% + Davomat×20% + O'qituvchi×25%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}