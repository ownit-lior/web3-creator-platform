"use client";

import { useState, useEffect } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { client } from "./client";
import CreateCollection from "./CreateCollection";

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
];

export default function Registration() {
  const account = useActiveAccount();
  const [userRole, setUserRole] = useState<"artist" | "fan" | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  
  // הוספנו גיל (age) וקטגוריה (category)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileImage: "", 
    stageName: "", 
    bio: "",       
    age: "",
    category: "",
  });

  useEffect(() => {
    if (account) {
      const savedData = localStorage.getItem(`ownit_user_${account.address}`);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData.formData);
        setUserRole(parsedData.role);
        setIsRegistered(true); 
      } else {
        setIsRegistered(false);
        setUserRole(null);
      }
    }
  }, [account]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = { formData, role: userRole };
    localStorage.setItem(`ownit_user_${account?.address}`, JSON.stringify(dataToSave));
    setIsRegistered(true); 
  };

  const clearProfile = () => {
    if (account) {
      localStorage.removeItem(`ownit_user_${account.address}`);
      setIsRegistered(false);
      setUserRole(null);
    }
  };

  // פונקציית הדגמה לכפתורי ההתחברות החברתית
  const handleSocialImport = (provider: string) => {
    alert(`בסביבת ייצור (Production), כפתור זה ימשוך את השם והתמונה שלך מ-${provider} בלחיצת כפתור כדי למלא את הטופס אוטומטית!`);
  };

  if (!account) {
    return (
      <div className="flex flex-col items-center gap-6 mt-12 bg-slate-900/80 p-10 rounded-2xl border border-slate-700/50 shadow-2xl max-w-md w-full backdrop-blur-sm">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">זיהוי מאובטח (Web3)</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            בשלב הראשון, חבר את ארנק הקריפטו שלך. ארנק זה ישמש כזיהוי אנונימי לקבלת תמלוגים או שמירת נכסים.
          </p>
        </div>
        <ConnectButton client={client} wallets={wallets} />
      </div>
    );
  }

  if (account && !userRole) {
    return (
      <div className="flex flex-col items-center gap-6 mt-12 bg-slate-900/80 p-10 rounded-2xl border border-slate-700/50 shadow-2xl max-w-2xl w-full backdrop-blur-sm">
        <div className="text-center w-full mb-4">
          <h2 className="text-3xl font-bold text-white mb-2">איך תרצה להשתמש בפלטפורמה?</h2>
          <p className="text-gray-400">בחר את סוג החשבון שלך כדי שנוכל להתאים לך את החוויה.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <button onClick={() => setUserRole("fan")} className="flex flex-col items-center p-8 bg-slate-800 hover:bg-slate-700 border-2 border-slate-700 hover:border-blue-500 rounded-xl transition-all group">
            <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">🎧</span>
            <h3 className="text-xl font-bold text-white mb-2">משתמש רגיל</h3>
            <p className="text-slate-400 text-sm text-center">אני כאן כדי לתמוך ביוצרים, לגלות אמנות ולנהל את אוסף הטוקנים שלי.</p>
          </button>
          <button onClick={() => setUserRole("artist")} className="flex flex-col items-center p-8 bg-slate-800 hover:bg-slate-700 border-2 border-slate-700 hover:border-purple-500 rounded-xl transition-all group">
            <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">🎨</span>
            <h3 className="text-xl font-bold text-white mb-2">חשבון אמן</h3>
            <p className="text-slate-400 text-sm text-center">אני יוצר שרוצה להנפיק קולקציות, לנהל קהילה ולקבל תמלוגים.</p>
          </button>
        </div>
      </div>
    );
  }

  if (account && userRole && !isRegistered) {
    return (
      <div className="flex flex-col items-center gap-6 mt-12 bg-slate-900/80 p-10 rounded-2xl border border-slate-700/50 shadow-2xl max-w-md w-full backdrop-blur-sm">
        <div className="text-center w-full">
          <h2 className="text-2xl font-bold text-white mb-2">
            {userRole === "artist" ? "הפרופיל האמנותי שלך" : "הפרופיל האישי שלך"}
          </h2>
          <p className="text-gray-400 text-sm">
            {userRole === "artist" ? "הארנק מחובר! עכשיו בוא נקים את דף האמן שלך." : "הארנק מחובר! השלם פרטים כדי להתחיל לחקור."}
          </p>
        </div>

        {/* --- אזור כפתורי הרשמה חברתית --- */}
        <div className="w-full mt-2">
          <p className="text-xs text-slate-400 mb-3 text-center">ייבוא פרטים מהיר:</p>
          <div className="flex gap-3 justify-center w-full">
            <button type="button" onClick={() => handleSocialImport("Google")} className="flex-1 bg-white text-black hover:bg-gray-200 font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all">
              <span className="text-red-500 text-lg">G</span> Google
            </button>
            <button type="button" onClick={() => handleSocialImport("Apple")} className="flex-1 bg-black text-white hover:bg-slate-800 border border-slate-700 font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all">
               Apple
            </button>
            <button type="button" onClick={() => handleSocialImport("Facebook")} className="flex-1 bg-blue-600 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all">
              <span className="font-serif font-bold text-lg">f</span>
            </button>
          </div>
        </div>

        {/* --- מפריד --- */}
        <div className="flex items-center gap-4 w-full my-2 opacity-50">
          <hr className="flex-1 border-slate-500" />
          <span className="text-slate-400 text-sm">או הרשמה ידנית</span>
          <hr className="flex-1 border-slate-500" />
        </div>
        
        {/* --- טופס הרשמה ידני --- */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          
          <div className="flex flex-col items-center mb-2">
            <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 overflow-hidden flex items-center justify-center mb-3">
              {formData.profileImage ? (
                <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl text-slate-600">👤</span>
              )}
            </div>
            <input type="text" placeholder="קישור לתמונת פרופיל (URL)" className="w-full p-2 text-sm text-center rounded-lg bg-slate-800/50 text-white border border-slate-700 focus:outline-none focus:border-blue-500" value={formData.profileImage} onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })} />
          </div>

          {/* שדות משתנים לפי סוג משתמש */}
          {userRole === "artist" ? (
            <>
              <input type="text" required placeholder="שם במה / שם האמן" className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-purple-500" value={formData.stageName} onChange={(e) => setFormData({ ...formData, stageName: e.target.value })} />
              
              <select required className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-purple-500 appearance-none" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                <option value="" disabled>במה אתה עוסק?</option>
                <option value="music">🎵 מוזיקאי / זמר / מפיק</option>
                <option value="art">🎨 צייר / מאייר / אמן פלסטי</option>
                <option value="content">📱 יוצר תוכן / יוטיובר</option>
                <option value="gaming">🎮 גיימר / סטרימר</option>
                <option value="other">✨ אחר</option>
              </select>
              
              <textarea placeholder="ספר למעריצים קצת עלייך (Bio)" className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-purple-500 min-h-[100px]" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} />
            </>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <input type="text" required placeholder="שם פרטי" className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
              <input type="text" required placeholder="שם משפחה" className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
            </div>
          )}
          
          <div className="grid grid-cols-[2fr_1fr] gap-4">
            <input type="email" required placeholder="אימייל" className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <input type="number" required placeholder="גיל" min="13" max="120" className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
          </div>
          
          <button type="submit" className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3.5 rounded-lg transition-all shadow-lg shadow-purple-500/20">
            סיום הרשמה ומעבר לדשבורד
          </button>
        </form>
      </div>
    );
  }

  // --- דשבורד ---
  return (
    <div className="w-full max-w-4xl flex flex-col items-center gap-8 mt-8">
      <div className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-purple-500 overflow-hidden">
            {formData.profileImage ? <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-2xl">👤</div>}
          </div>
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold text-white">
              {userRole === "artist" ? formData.stageName : `${formData.firstName} ${formData.lastName}`} {userRole === "artist" && "🎨"}
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              {formData.age && `גיל: ${formData.age} | `} 
              <span className="font-mono text-xs">{account.address.substring(0, 6)}...{account.address.substring(account.address.length - 4)}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="bg-green-500/10 text-green-400 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
            {userRole === "artist" ? `יוצר מאומת (${formData.category === 'music' ? '🎵' : formData.category === 'art' ? '🎨' : formData.category === 'content' ? '📱' : formData.category === 'gaming' ? '🎮' : '✨'})` : "משתמש רגיל ✓"}
          </div>
          <button onClick={clearProfile} className="text-xs text-red-400 hover:text-red-300 underline">
            אפס פרופיל (למטרת פיתוח)
          </button>
        </div>
      </div>

      {userRole === "artist" ? (
        <CreateCollection />
      ) : (
        <div className="w-full bg-slate-900/40 border border-slate-800 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
          <span className="text-6xl mb-4">🖼️</span>
          <h2 className="text-2xl font-bold text-white mb-2">אוסף האמנות שלך ריק כרגע</h2>
          <p className="text-slate-400 mb-6">כאן יופיעו כל הטוקנים והיצירות שתרכוש מהאמנים האהובים עליך.</p>
          <button className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white px-6 py-3 rounded-lg transition-all font-bold">
            חקור אמנים חדשים בפלטפורמה
          </button>
        </div>
      )}
    </div>
  );
}