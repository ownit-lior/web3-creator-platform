"use client";

import { useAccount, useDisconnect } from "wagmi";

export function ProfileWalletView({ userProfile, userRole }: { userProfile: any; userRole: string }) {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      
      {/* כרטיס פרופיל עליון */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        
        <div className="w-32 h-32 rounded-full bg-slate-800 border-4 border-slate-950 z-10 overflow-hidden flex items-center justify-center shadow-2xl">
          {userProfile?.profileImage ? (
            <img src={userProfile.profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-5xl opacity-50">👤</span>
          )}
        </div>
        
        <div className="flex-1 text-center md:text-right z-10">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
            <h1 className="text-3xl font-extrabold text-white">
              {userRole === "artist" ? userProfile?.stageName : `${userProfile?.firstName} ${userProfile?.lastName}`}
            </h1>
            <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs font-bold border border-slate-700">
              {userRole === "artist" ? "יוצר" : "משתמש"}
            </span>
          </div>
          <p className="text-slate-400 font-mono text-sm bg-slate-950/50 inline-block px-4 py-1.5 rounded-lg border border-slate-800">
            {address}
          </p>
        </div>

        <button 
          onClick={() => disconnect()}
          className="z-10 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-6 py-3 rounded-xl font-bold transition-colors"
        >
          התנתק מהמערכת
        </button>
      </div>

      {/* אזור הנכסים - הארנק */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">הארנק שלי (נכסים דיגיטליים)</h2>
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-16 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">
            💎
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">אין לך עדיין נכסים בחשבון</h3>
          <p className="text-slate-400 max-w-md mx-auto">
            כאן יופיעו כל הטוקנים והמניות שתרכוש מיוצרים בפלטפורמה.
          </p>
        </div>
      </div>
    </div>
  );
}