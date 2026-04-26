import React from 'react';
import PublicTopbar from '@/components/PublicTopbar';
import SchoolHeader from './components/SchoolHeader';
import SchoolTabs from './components/SchoolTabs';

// Backend integration: GET /api/schools/:id → full school profile with scores

export default function SchoolDetailPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <PublicTopbar />
      <SchoolHeader />
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-8">
        <SchoolTabs />
      </div>
      <footer className="mt-12 bg-slate-900 text-slate-400 py-6">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 flex items-center justify-between">
          <p className="font-bold text-white text-sm">MaktabReyting</p>
          <p className="text-xs">© 2026 MaktabReyting. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </div>
  );
}