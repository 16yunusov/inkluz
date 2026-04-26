'use client';

import React, { useState } from 'react';
import { MapPin, School, Building2, Send, CheckCircle2, AlertCircle, Trash2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface HierarchyItem {
  region: string;
  districts: {
    name: string;
    schools: string[];
  }[];
}

export default function HierarchyAssistant() {
  const [input, setInput] = useState('');
  const [hierarchy, setHierarchy] = useState<HierarchyItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const parseInput = (text: string) => {
    // Basic regex-like parsing for "Buxoro viloyati, Shofirkon tumani, 6-maktab"
    // Supporting various formats like "Buxoro vil. Shofirkon tum. 6-maktab" or comma separated
    const cleanText = text.toLowerCase().replace(/viloyati|vil\.|tuman|tum\.|maktab/g, '').trim();
    const parts = text.split(/[, ]+/).map(p => p.trim()).filter(p => p.length > 0);
    
    let region = "";
    let district = "";
    let school = "";

    // Heuristic parsing
    if (text.includes("viloyat") || text.includes("vil.")) {
      region = text.split(/viloyat|vil\./i)[0].trim().split(/[, ]+/).pop() || "";
    }
    if (text.includes("tuman") || text.includes("tum.")) {
      district = text.split(/tuman|tum\./i)[0].split(/viloyat|vil\.|[, ]+/).pop()?.trim() || "";
    }
    if (text.includes("maktab")) {
      school = text.split(/maktab/i)[0].split(/tuman|tum\.|[, ]+/).pop()?.trim() + "-maktab";
    }

    // Fallback if keywords not present
    if (!region && parts.length > 0) region = parts[0];
    if (!district && parts.length > 1) district = parts[1];
    if (!school && parts.length > 2) school = parts[2].includes("maktab") ? parts[2] : parts[2] + "-maktab";

    return { 
      region: region.charAt(0).toUpperCase() + region.slice(1), 
      district: district.charAt(0).toUpperCase() + district.slice(1), 
      school 
    };
  };

  const handleProcess = () => {
    if (!input.trim()) return;
    
    setIsProcessing(true);
    
    setTimeout(() => {
      const { region, district, school } = parseInput(input);
      
      if (!region || !district || !school) {
        toast.error("Ma'lumot formatini aniqlab bo'lmadi. Iltimos, 'Viloyat, Tuman, Maktab' ko'rinishida yozing.");
        setIsProcessing(false);
        return;
      }

      setHierarchy(prev => {
        const newHierarchy = [...prev];
        let regionIdx = newHierarchy.findIndex(r => r.region === region);
        
        if (regionIdx === -1) {
          newHierarchy.push({ region, districts: [] });
          regionIdx = newHierarchy.length - 1;
        }
        
        let districtIdx = newHierarchy[regionIdx].districts.findIndex(d => d.name === district);
        if (districtIdx === -1) {
          newHierarchy[regionIdx].districts.push({ name: district, schools: [] });
          districtIdx = newHierarchy[regionIdx].districts.length - 1;
        }
        
        if (!newHierarchy[regionIdx].districts[districtIdx].schools.includes(school)) {
          newHierarchy[regionIdx].districts[districtIdx].schools.push(school);
          toast.success(`${region} → ${district} → ${school} muvaffaqiyatli qo'shildi!`);
        } else {
          toast.info("Ushbu maktab allaqachon mavjud.");
        }
        
        return newHierarchy;
      });
      
      setInput('');
      setIsProcessing(false);
    }, 800);
  };

  const removeItem = (rIdx: number, dIdx?: number, sIdx?: number) => {
    setHierarchy(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      if (sIdx !== undefined && dIdx !== undefined) {
        next[rIdx].districts[dIdx].schools.splice(sIdx, 1);
      } else if (dIdx !== undefined) {
        next[rIdx].districts.splice(dIdx, 1);
      } else {
        next.splice(rIdx, 1);
      }
      return next;
    });
    toast.error("Ma'lumot o'chirildi");
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-xl shadow-slate-200/40">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <Send size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Ierarxiya yordamchisi</h2>
            <p className="text-sm text-slate-500 font-medium">Tabiiy tilda ma'lumotlarni kiriting</p>
          </div>
        </div>

        <div className="relative group">
          <input
            type="text"
            placeholder="Masalan: Buxoro viloyati Shofirkon tumani 6-maktab"
            className="w-full pl-6 pr-32 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-lg font-medium placeholder:text-slate-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleProcess()}
          />
          <button
            onClick={handleProcess}
            disabled={isProcessing || !input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center gap-2"
          >
            {isProcessing ? <Loader2 size={18} className="animate-spin" /> : <><Send size={18} /> Qo'shish</>}
          </button>
        </div>
        
        <div className="mt-4 flex gap-4 text-[11px] text-slate-400 font-bold uppercase tracking-widest px-2">
          <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-emerald-500" /> Real-time Sync</span>
          <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-emerald-500" /> Auto-link Hierarchy</span>
          <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-emerald-500" /> Duplicate Protection</span>
        </div>
      </div>

      {/* Hierarchy View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hierarchy.length === 0 ? (
          <div className="lg:col-span-3 py-20 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
            <Building2 size={48} className="mx-auto text-slate-200 mb-4" />
            <h3 className="text-lg font-black text-slate-300 uppercase">Hozircha ma'lumot yo'q</h3>
            <p className="text-slate-400 text-sm mt-1">Yuqoridagi maydon orqali yangi hududlarni qo'shing</p>
          </div>
        ) : (
          hierarchy.map((r, rIdx) => (
            <div key={rIdx} className="bg-white rounded-[2rem] border border-slate-200 shadow-lg shadow-slate-200/30 overflow-hidden slide-up group">
              <div className="bg-slate-900 p-5 flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-blue-400" />
                  <span className="font-black uppercase tracking-tight">{r.region} viloyati</span>
                </div>
                <button onClick={() => removeItem(rIdx)} className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-red-400 transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
              
              <div className="p-4 space-y-4">
                {r.districts.map((d, dIdx) => (
                  <div key={dIdx} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-slate-900 font-black text-sm uppercase">
                        <Building2 size={16} className="text-indigo-500" />
                        {d.name} tumani
                      </div>
                      <button onClick={() => removeItem(rIdx, dIdx)} className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-red-500">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {d.schools.map((s, sIdx) => (
                        <div key={sIdx} className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 flex items-center gap-2 group/item">
                          <School size={12} className="text-blue-500" />
                          <span className="text-xs font-bold text-slate-700">{s}</span>
                          <button onClick={() => removeItem(rIdx, dIdx, sIdx)} className="opacity-0 group-hover/item:opacity-100 p-0.5 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded transition-all">
                            <Trash2 size={10} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Loader2({ size, className }: { size: number, className: string }) {
  return (
    <svg className={`animate-spin ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
