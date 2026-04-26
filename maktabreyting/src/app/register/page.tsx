'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { User, Lock, ArrowRight, MapPin, School, GraduationCap, ChevronRight, Loader2, UserPlus } from 'lucide-react';
import { regions, schools as allSchools } from '@/data/mockData';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    sinf: '',
    username: '',
    password: '',
    regionId: '',
    districtName: '',
    schoolId: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Filter districts based on selected region
  const districts = useMemo(() => {
    if (!formData.regionId) return [];
    const regionSchools = allSchools.filter(s => s.regionId === formData.regionId);
    return Array.from(new Set(regionSchools.map(s => s.district)));
  }, [formData.regionId]);

  // Filter schools based on selected district
  const filteredSchools = useMemo(() => {
    if (!formData.districtName) return [];
    return allSchools.filter(s => s.regionId === formData.regionId && s.district === formData.districtName);
  }, [formData.regionId, formData.districtName]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName) newErrors.firstName = 'Ism majburiy';
    if (!formData.lastName) newErrors.lastName = 'Familya majburiy';
    if (!formData.sinf) newErrors.sinf = 'Sinf majburiy';
    if (!formData.username) newErrors.username = 'Login majburiy';
    if (formData.password.length < 6) newErrors.password = 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak';
    if (!formData.regionId) newErrors.regionId = 'Viloyatni tanlang';
    if (!formData.districtName) newErrors.districtName = 'Tumanni tanlang';
    if (!formData.schoolId) newErrors.schoolId = 'Maktabni tanlang';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    // Simulate API registration
    await new Promise(r => setTimeout(r, 1500));
    
    toast.success('Ro\'yxatdan o\'tish muvaffaqiyatli yakunlandi!');
    router.push('/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Reset child selections
    if (name === 'regionId') setFormData(prev => ({ ...prev, districtName: '', schoolId: '' }));
    if (name === 'districtName') setFormData(prev => ({ ...prev, schoolId: '' }));
    // Clear error
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/home-page" className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 mb-4 hover:scale-105 transition-transform">
            <AppLogo size={32} className="text-white" />
          </Link>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">O'quvchi bo'lib ro'yxatdan o'tish</h1>
          <p className="text-slate-500 mt-1">O'z maktabingiz reytingini kuzatib boring</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                  <User size={16} /> Shaxsiy ma'lumotlar
                </h3>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Ism</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Masalan: Sardor"
                    className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all ${errors.firstName ? 'border-red-300' : 'border-slate-200 focus:border-blue-500'}`}
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && <p className="text-[10px] text-red-500 mt-1 ml-1 font-bold">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Familya</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Masalan: Abdullayev"
                    className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all ${errors.lastName ? 'border-red-300' : 'border-slate-200 focus:border-blue-500'}`}
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && <p className="text-[10px] text-red-500 mt-1 ml-1 font-bold">{errors.lastName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Sinf</label>
                  <input
                    type="text"
                    name="sinf"
                    placeholder="Masalan: 9A"
                    className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all ${errors.sinf ? 'border-red-300' : 'border-slate-200 focus:border-blue-500'}`}
                    value={formData.sinf}
                    onChange={handleChange}
                  />
                  {errors.sinf && <p className="text-[10px] text-red-500 mt-1 ml-1 font-bold">{errors.sinf}</p>}
                </div>
              </div>

              {/* School Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                  <MapPin size={16} /> Ta'lim muassasasi
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Viloyat</label>
                  <select
                    name="regionId"
                    className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none ${errors.regionId ? 'border-red-300' : 'border-slate-200 focus:border-blue-500'}`}
                    value={formData.regionId}
                    onChange={handleChange}
                  >
                    <option value="">Viloyatni tanlang</option>
                    {regions.map(r => (
                      <option key={r.id} value={r.id}>{r.nameUz}</option>
                    ))}
                  </select>
                  {errors.regionId && <p className="text-[10px] text-red-500 mt-1 ml-1 font-bold">{errors.regionId}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Tuman / Shahar</label>
                  <select
                    name="districtName"
                    disabled={!formData.regionId}
                    className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none disabled:opacity-50 ${errors.districtName ? 'border-red-300' : 'border-slate-200 focus:border-blue-500'}`}
                    value={formData.districtName}
                    onChange={handleChange}
                  >
                    <option value="">Tumanni tanlang</option>
                    {districts.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  {errors.districtName && <p className="text-[10px] text-red-500 mt-1 ml-1 font-bold">{errors.districtName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Maktab</label>
                  <select
                    name="schoolId"
                    disabled={!formData.districtName}
                    className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none disabled:opacity-50 ${errors.schoolId ? 'border-red-300' : 'border-slate-200 focus:border-blue-500'}`}
                    value={formData.schoolId}
                    onChange={handleChange}
                  >
                    <option value="">Maktabni tanlang</option>
                    {filteredSchools.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                  {errors.schoolId && <p className="text-[10px] text-red-500 mt-1 ml-1 font-bold">{errors.schoolId}</p>}
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Login (username)</label>
                <div className="relative">
                  <GraduationCap size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="username"
                    placeholder="Masalan: sardor123"
                    className={`w-full pl-12 pr-4 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all ${errors.username ? 'border-red-300' : 'border-slate-200 focus:border-blue-500'}`}
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                {errors.username && <p className="text-[10px] text-red-500 mt-1 ml-1 font-bold">{errors.username}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Parol</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className={`w-full pl-12 pr-4 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all ${errors.password ? 'border-red-300' : 'border-slate-200 focus:border-blue-500'}`}
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                {errors.password && <p className="text-[10px] text-red-500 mt-1 ml-1 font-bold">{errors.password}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20"
            >
              {isLoading ? <Loader2 size={24} className="animate-spin" /> : (
                <>
                  <UserPlus size={20} /> Ro'yxatdan o'tish
                </>
              )}
            </button>
            
            <p className="text-center text-sm text-slate-500">
              Profilingiz bormi? <Link href="/login" className="font-bold text-blue-600 hover:underline">Kirish</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
