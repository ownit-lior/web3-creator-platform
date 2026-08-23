"use client";

import { Logo } from '@/components/logo'

export function ArtistDashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Logo href="/" showTagline={false} size="header" className="items-start" />
          <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent mb-2">
            לוח בקרת אמן
          </h1>
          <p className="text-zinc-400">ברוך הבא ל-VIBE. הנה הנתונים שלך להיום.</p>
          </div>
        </header>

        {/* קוביות נתונים */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 backdrop-blur-sm">
            <h3 className="text-zinc-400 text-sm font-medium mb-2">סה״כ מעריצים (Holders)</h3>
            <p className="text-3xl font-bold text-white">1,204</p>
          </div>
          <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 backdrop-blur-sm">
            <h3 className="text-zinc-400 text-sm font-medium mb-2">מניות שנמכרו</h3>
            <p className="text-3xl font-bold text-white">8,550</p>
          </div>
          <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 backdrop-blur-sm">
            <h3 className="text-zinc-400 text-sm font-medium mb-2">שווי שוק נוכחי</h3>
            <p className="text-3xl font-bold text-green-400">$12,400</p>
          </div>
        </div>

        {/* אזור תוכן מרכזי */}
        <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 p-8 min-h-[300px] flex items-center justify-center backdrop-blur-sm">
          <p className="text-zinc-500 text-lg">
            כאן יופיע בקרוב גרף המסחר של המניה שלך... 📈
          </p>
        </div>
      </div>
    </div>
  );
}