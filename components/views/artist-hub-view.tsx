"use client";

export function ArtistHubView() {
  return (
    <div className="w-full space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 tracking-tight">מרכז היוצר</h1>
          <p className="text-slate-400 mt-2 text-lg">נהל את התוכן, הקהילה והנכסים הדיגיטליים שלך.</p>
        </div>
        <button className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-purple-500/20 flex items-center gap-2">
          <span className="text-xl">+</span> צור יצירה חדשה
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* קוביות סטטיסטיקה */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <p className="text-slate-400 text-sm font-bold mb-2">סה"כ תומכים (Holders)</p>
          <div className="text-4xl font-extrabold text-white">0</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <p className="text-slate-400 text-sm font-bold mb-2">תמלוגים שנצברו</p>
          <div className="text-4xl font-extrabold text-green-400">$0.00</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <p className="text-slate-400 text-sm font-bold mb-2">צפיות בתוכן</p>
          <div className="text-4xl font-extrabold text-blue-400">0</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* תוכן שהועלה */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-6">היצירות שלי</h3>
          <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-slate-800 rounded-2xl">
            <span className="text-5xl opacity-30 mb-4">📂</span>
            <p className="text-slate-400">טרם העלית יצירות.</p>
          </div>
        </div>

        {/* תגובות אחרונות */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-6">תגובות במועדון</h3>
          <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-slate-800 rounded-2xl">
            <span className="text-5xl opacity-30 mb-4">💬</span>
            <p className="text-slate-400">אין תגובות חדשות להציג.</p>
          </div>
        </div>
      </div>
    </div>
  );
}