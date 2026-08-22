"use client";

import { useState } from "react";

export function CommunitiesView() {
  const [tab, setTab] = useState<"my" | "explore">("my");

  return (
    <div className="w-full space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">מועדונים</h1>
        <p className="text-slate-400 mt-2 text-lg">המקום שלך להתחבר, להשפיע ולהיות חלק מקהילה.</p>
      </div>

      <div className="flex border-b border-slate-800">
        <button 
          onClick={() => setTab("my")}
          className={`px-8 py-4 font-bold text-lg transition-all ${tab === "my" ? "text-blue-400 border-b-2 border-blue-400" : "text-slate-500 hover:text-slate-300"}`}
        >
          המועדונים שלי
        </button>
        <button 
          onClick={() => setTab("explore")}
          className={`px-8 py-4 font-bold text-lg transition-all ${tab === "explore" ? "text-blue-400 border-b-2 border-blue-400" : "text-slate-500 hover:text-slate-300"}`}
        >
          גלה מועדונים חדשים
        </button>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-16 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">
          {tab === "my" ? "🤝" : "🔍"}
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">
          {tab === "my" ? "אתה עדיין לא חבר באף מועדון" : "בקרוב: אינדקס המועדונים המלא"}
        </h3>
        <p className="text-slate-400 max-w-md mx-auto mb-8">
          {tab === "my" 
            ? "מועדונים הם מרחבים סגורים למחזיקי טוקנים. רכוש טוקנים של אמנים כדי לקבל גישה אוטומטית." 
            : "כאן תוכל לחפש ולסנן מועדונים של אמנים לפי תחומי עניין, כמות חברים ושווי שוק."}
        </p>
        {tab === "my" && (
          <button onClick={() => setTab("explore")} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg">
            חפש מועדונים עכשיו
          </button>
        )}
      </div>
    </div>
  );
}