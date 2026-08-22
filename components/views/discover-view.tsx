"use client";

import { useState } from "react";

export function DiscoverView() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "הכל (מותאם אישית)" },
    { id: "music", name: "מוזיקה" },
    { id: "art", name: "אמנות דיגיטלית" },
    { id: "content", name: "תוכן ופודקאסטים" },
  ];

  return (
    <div className="w-full space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">גלה יצירות</h1>
          <p className="text-slate-400 mt-2 text-lg">חקור יצירות ואמנים שמעניינים אותך.</p>
        </div>
      </div>

      {/* קטגוריות */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold transition-all ${
              activeCategory === cat.id 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" 
                : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* אזור תוכן ריק ונקי */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-600 transition-all group cursor-pointer">
            {/* פלייסבולדר לתמונה במקום תמונה אמיתית */}
            <div className="w-full h-48 bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition-colors">
              <span className="text-4xl opacity-20">🖼️</span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-slate-700"></div>
                <div className="h-4 w-24 bg-slate-800 rounded"></div>
              </div>
              <div className="h-6 w-3/4 bg-slate-800 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-slate-800/50 rounded mb-6"></div>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div className="h-4 w-16 bg-slate-800 rounded"></div>
                <button className="bg-slate-800 text-blue-400 px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-slate-700">
                  צפה ביצירה
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}