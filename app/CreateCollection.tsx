"use client";

import { useAccount } from "wagmi";

export default function CreateCollection() {
  const { address } = useAccount();

  if (!address) return null;

  return (
    <div className="flex flex-col items-center gap-6 mt-8 bg-slate-900/80 p-10 rounded-2xl border border-slate-700/50 shadow-2xl w-full backdrop-blur-sm">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">הנפקת מניות (Tokens) ליצירה</h2>
        <p className="text-gray-400 mb-6">
          כאן נחבר את החוזה החכם המיוחד של OwnIt, שיאפשר למעריצים לרכוש אחוזים מהיצירה שלך.
        </p>
      </div>

      <button
        onClick={() => alert("בשלב הבא נייצר את החוזה החכם של OwnIt באתר של Thirdweb ונחבר אותו לכאן!")}
        className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30 text-lg flex items-center gap-2"
      >
        <span>🚀</span> הכן חוזה חכם להשקה
      </button>
    </div>
  );
}
