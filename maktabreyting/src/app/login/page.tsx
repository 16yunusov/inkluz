'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { Mail, Lock, ArrowRight, AlertCircle, Loader2, User, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function LoginPage() {
  const [role, setRole] = useState<'student' | 'admin'>('admin');
  const [identifier, setIdentifier] = useState(''); // email for admin, username for student
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(identifier);
    
    if (success) {
      toast.success('Xush kelibsiz!');
      if (role === 'admin') {
        router.push('/admin-panel');
      } else {
        router.push('/home-page');
      }
    } else {
      toast.error('Login yoki parol noto\'g\'ri');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/home-page" className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 mb-4 hover:scale-105 transition-transform">
            <AppLogo size={40} className="text-white" />
          </Link>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">MaktabReyting</h1>
          <p className="text-slate-500 mt-1 font-medium">Tizimga kirish</p>
        </div>

        {/* Role Selector */}
        <div className="flex bg-slate-200/50 p-1 rounded-2xl mb-6">
          <button
            onClick={() => { setRole('admin'); setIdentifier(''); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${role === 'admin' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <ShieldCheck size={18} /> Admin
          </button>
          <button
            onClick={() => { setRole('student'); setIdentifier(''); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${role === 'student' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <User size={18} /> O'quvchi
          </button>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                {role === 'admin' ? 'Email manzil' : 'Login (username)'}
              </label>
              <div className="relative">
                {role === 'admin' ? (
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                ) : (
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                )}
                <input
                  type={role === 'admin' ? "email" : "text"}
                  required
                  placeholder={role === 'admin' ? "admin@maktabreyting.uz" : "username123"}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-900 font-medium"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2 ml-1">
                <label className="block text-sm font-bold text-slate-700">Parol</label>
                <a href="#" className="text-xs font-bold text-blue-600 hover:underline">Parolni unutdingizmi?</a>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-900 font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/25"
            >
              {isLoading ? <Loader2 size={24} className="animate-spin" /> : (
                <>
                  Kirish <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Registration for Students */}
          {role === 'student' && (
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                Profilingiz yo'qmi? <Link href="/register" className="font-bold text-blue-600 hover:underline">Ro'yxatdan o'tish</Link>
              </p>
            </div>
          )}

          {/* Help Note */}
          <div className="mt-8 pt-8 border-t border-slate-100">
            <div className="flex gap-3 text-slate-500">
              <AlertCircle size={20} className="shrink-0 text-amber-500" />
              <div className="text-[11px] leading-relaxed">
                <span className="font-bold text-slate-700 block mb-1 uppercase tracking-tighter">Test ma'lumotlari:</span>
                {role === 'admin' ? (
                  <>
                    Super Admin: <code className="bg-slate-100 px-1 rounded">sardor@maktabreyting.uz</code><br />
                    Maktab Admin: <code className="bg-slate-100 px-1 rounded">malika@maktab.uz</code>
                  </>
                ) : (
                  <>
                    Student: <code className="bg-slate-100 px-1 rounded">otabek07</code>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-center text-slate-400 text-[10px] mt-8 uppercase font-bold tracking-widest">
          © 2026 MaktabReyting. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </div>
  );
}
