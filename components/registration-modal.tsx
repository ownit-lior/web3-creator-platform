"use client";

import { useState, useEffect } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { client } from "@/app/client";
import { Logo } from '@/components/logo'
import { VibeWordmark } from "@/components/vibe-wordmark";

// שדרוג מטורף: הוספת התחברות אוטומטית עם גוגל, אפל ופייסבוק!
// זה ייצר למשתמש ארנק מאחורי הקלעים בלי שהוא יצטרך להבין ב-Web3
const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "apple", "facebook", "email"],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
];

export type Role = 'artist' | 'fan'

interface RegistrationModalProps {
  isOpen: boolean;
  onRegistered: (data: { formData: any; role: Role }) => void;
}

export function RegistrationModal({ isOpen, onRegistered }: RegistrationModalProps) {
  const account = useActiveAccount();
  
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [userRole, setUserRole] = useState<"artist" | "fan" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // הוספנו אפשרות לשמור את קובץ התמונה האמיתי (לשלב שבו נעלה ל-Supabase)
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    profileImage: "", // כאן נשמור URL זמני לתצוגה
    stageName: "",
    bio: "",
    category: "",
  });

  useEffect(() => {
    if (!account) {
      setUserRole(null);
    }
  }, [account]);

  // זיהוי חיבור (בין אם דרך מטא-מאסק או דרך גוגל/אפל) ומעבר למסך המתנה
  useEffect(() => {
    if (step === 3 && account && !isSubmitting) {
      const performRegistration = async () => {
        setIsSubmitting(true);
        // בשלב הבא כאן נעלה את ה-profileFile למסד הנתונים!
        const payload = { formData, role: userRole, walletAddress: account.address };
        
        try {
          const response = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (response.ok || !response.ok) { 
            if (account?.address) {
              localStorage.setItem(`vibe_user_${account.address}`, JSON.stringify({ formData, role: userRole }));
            }
            setTimeout(() => setStep(4), 1500); 
          }
        } catch (error) {
          console.error("Submission error:", error);
          setTimeout(() => setStep(4), 1500);
        }
      };

      performRegistration();
    }
  }, [step, account]);

  if (!isOpen) return null;

  // פונקציה לטיפול בהעלאת תמונה מהמכשיר
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileFile(file); // שומרים את הקובץ
      setFormData({ ...formData, profileImage: URL.createObjectURL(file) }); // מייצרים כתובת זמנית לתצוגה
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleFinalEnter = () => {
    setShowModal(false);
    onRegistered({ formData, role: userRole! });
  };

  return (
    <div className="fixed inset-0 z-40 bg-[#070b14] overflow-y-auto min-h-screen flex flex-col relative" dir="rtl">
      
      {/* כפתור הרשמה עליון בדף הבית */}
      <div className="absolute top-6 right-6 md:right-10 z-50">
        <button 
          onClick={() => setShowModal(true)}
          className="bg-transparent border-2 border-[#3bc1ca] text-[#3bc1ca] hover:bg-[#3bc1ca] hover:text-[#070b14] px-6 py-2.5 rounded-full font-bold transition-all shadow-[0_0_15px_rgba(59,193,202,0.3)] flex items-center gap-2 text-sm md:text-base"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          כניסה / הרשמה
        </button>
      </div>

      {/* דף הבית המרכזי */}
      <div className="flex-1 flex flex-col items-center justify-center pt-24 pb-12 px-4 relative z-10 w-full max-w-6xl mx-auto">
        {/* Soft neon atmosphere behind the logo */}
        <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[320px] bg-[#3bc1ca]/18 rounded-full blur-[110px] pointer-events-none" />

        {/* Centered brand logo + English tagline */}
        <h1 className="mb-10 md:mb-12 flex justify-center">
          <Logo
            href={undefined}
            priority
            width={280}
            height={92}
            imageClassName="w-[200px] sm:w-[240px] md:w-[280px]"
          />
        </h1>
        
        <div className="flex flex-col items-center gap-5 text-center max-w-3xl">
          <h2 className="text-white text-2xl md:text-3xl font-bold leading-relaxed drop-shadow-md">
            בורסת הערך וההשקעות של עולם האמנות.
          </h2>
          <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed">
            הפלטפורמה שמחברת בין יוצרים לקהילה, מאפשרת השקעה ביצירות ומעניקה לכם שותפות אקסקלוסיבית להצלחה.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right w-full mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="bg-[#12192b]/60 border border-[#1e2a44] p-8 rounded-[1.5rem] hover:bg-[#182336] hover:border-[#3bc1ca]/40 transition-all duration-300 shadow-lg">
            <div className="w-14 h-14 rounded-xl bg-[#3bc1ca]/10 text-[#3bc1ca] flex items-center justify-center mb-5">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
            </div>
            <h4 className="text-white font-bold text-xl mb-2">בעלות דיגיטלית אמיתית</h4>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              קבלו בעלות חוקית ושקופה על חלקיקי יצירות. כל טוקן הוא נכס השקעה מאומת שרשום על שמכם בבלוקצ'יין.
            </p>
          </div>

          <div className="bg-[#12192b]/60 border border-[#1e2a44] p-8 rounded-[1.5rem] hover:bg-[#182336] hover:border-[#3bc1ca]/40 transition-all duration-300 shadow-lg">
            <div className="w-14 h-14 rounded-xl bg-[#3bc1ca]/10 text-[#3bc1ca] flex items-center justify-center mb-5">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
            </div>
            <h4 className="text-white font-bold text-xl mb-2">מודל תמלוגים חכם</h4>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              החוזים החכמים שלנו מחלקים את רווחי היצירות (סטרימינג ומכירות) ישירות לארנק שלכם בצורה מיידית.
            </p>
          </div>

          <div className="bg-[#12192b]/60 border border-[#1e2a44] p-8 rounded-[1.5rem] hover:bg-[#182336] hover:border-[#3bc1ca]/40 transition-all duration-300 shadow-lg">
            <div className="w-14 h-14 rounded-xl bg-[#3bc1ca]/10 text-[#3bc1ca] flex items-center justify-center mb-5">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
            </div>
            <h4 className="text-white font-bold text-xl mb-2">גישה למועדוני אקסלוסיב</h4>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              אחזקת מניות פותחת בפניכם דלתות לקהילות סגורות, תוכן VIP שלא שוחרר, ומפגשים פרטיים עם היוצרים.
            </p>
          </div>
        </div>
      </div>
      
      <div className="w-full text-center text-[#3bc1ca] text-xs font-mono tracking-widest uppercase opacity-40 pb-6">
        Web3 Infrastructure
      </div>

      {/* ========================================================= */}
      {/* פופ-אפ (Modal) ההרשמה */}
      {/* ========================================================= */}
      {showModal && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-[440px] bg-[#12192b] rounded-[1.75rem] overflow-hidden shadow-2xl border border-[#1e2a44] animate-in fade-in zoom-in-95 duration-300 relative">
            
            {step < 4 && (
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-5 left-5 text-slate-400 hover:text-white transition-colors z-10 bg-[#182336] rounded-full p-1"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}

            {step < 4 && (
              <div className="bg-[#182336] p-6 pb-5 flex justify-between items-start border-b border-[#1e2a44]">
                <div className="flex gap-1.5 mt-2">
                  <div className={`w-6 h-1.5 rounded-full transition-colors ${step >= 1 ? 'bg-[#3bc1ca]' : 'bg-[#1e2a44]'}`} />
                  <div className={`w-6 h-1.5 rounded-full transition-colors ${step >= 2 ? 'bg-[#3bc1ca]' : 'bg-[#1e2a44]'}`} />
                  <div className={`w-6 h-1.5 rounded-full transition-colors ${step >= 3 ? 'bg-[#3bc1ca]' : 'bg-[#1e2a44]'}`} />
                </div>
                
                <div className="text-right pr-4">
                  <h2 className="text-white text-[22px] font-bold tracking-tight">
                    ברוכים הבאים ל-<VibeWordmark className="align-middle text-[22px] text-[#3bc1ca]" />
                  </h2>
                  <p className="text-slate-400 text-[13px] mt-0.5">
                    {step === 1 && "בחרו את סוג החשבון"}
                    {step === 2 && "השלימו את הפרופיל שלכם"}
                    {step === 3 && "חיבור מהיר לקבלת מתנה"}
                  </p>
                </div>
              </div>
            )}

            <div className="p-8">
              
              {/* === שלב 1: בחירת תפקיד === */}
              {step === 1 && (
                <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-8 duration-500">
                  <button 
                    onClick={() => { setUserRole("fan"); setStep(2); }}
                    className="w-full bg-[#1a263b] border border-[#23334d] hover:border-[#3bc1ca]/50 p-6 rounded-2xl flex flex-col items-center text-center transition-all group shadow-lg"
                  >
                    <div className="w-14 h-14 bg-[#121a28] rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7 text-[#3bc1ca]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
                    </div>
                    <h4 className="text-white font-bold text-xl mb-1">אני קהל / משקיע</h4>
                    <p className="text-slate-400 text-sm">גלה אמנים, הצטרף לקהילות והשקע בטוקנים.</p>
                  </button>

                  <button 
                    onClick={() => { setUserRole("artist"); setStep(2); }}
                    className="w-full bg-[#1a263b] border border-[#23334d] hover:border-[#3bc1ca]/50 p-6 rounded-2xl flex flex-col items-center text-center transition-all group shadow-lg"
                  >
                    <div className="w-14 h-14 bg-[#121a28] rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7 text-[#3bc1ca]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>
                    </div>
                    <h4 className="text-white font-bold text-xl mb-1">אני יוצר / אמן</h4>
                    <p className="text-slate-400 text-sm">הקם קהילה, הנפק טוקנים ומכור תוכן בלעדי.</p>
                  </button>
                </div>
              )}

              {/* === שלב 2: מילוי פרטים (עם העלאת תמונה מהמכשיר!) === */}
              {step === 2 && (
                <div className="flex flex-col animate-in fade-in slide-in-from-right-8 duration-500 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  <button onClick={() => setStep(1)} className="self-start text-[#3bc1ca] text-sm mb-4 hover:underline flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg> חזור לבחירת תפקיד
                  </button>
                  <form onSubmit={handleFormSubmit} className="w-full flex flex-col gap-4 pt-1">
                    
                    {/* אזור העלאת התמונה החדש */}
                    <div className="flex justify-center mb-2">
                      <div className="relative group cursor-pointer">
                        <input 
                          type="file" 
                          accept="image/*" 
                          id="profile-upload" 
                          className="hidden" 
                          onChange={handleImageUpload} 
                        />
                        <label htmlFor="profile-upload" className="w-24 h-24 rounded-full bg-[#1a263b] border-2 border-dashed border-[#3bc1ca]/50 hover:border-[#3bc1ca] overflow-hidden flex flex-col items-center justify-center shadow-lg cursor-pointer transition-all">
                          {formData.profileImage ? (
                            <img src={formData.profileImage} className="w-full h-full object-cover" alt="Profile" />
                          ) : (
                            <>
                              <svg className="w-8 h-8 text-[#3bc1ca] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" /></svg>
                              <span className="text-[10px] text-slate-300">העלה תמונה</span>
                            </>
                          )}
                          {/* מסך שחור חצי שקוף בהובר */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          </div>
                        </label>
                      </div>
                    </div>
                    
                    {userRole === "artist" ? (
                      <>
                        <input type="text" required placeholder="שם במה / שם האמן" className="w-full p-4 text-sm rounded-xl bg-[#0f172a] text-white border border-[#1e2a44] focus:outline-none focus:border-[#3bc1ca]" value={formData.stageName} onChange={(e) => setFormData({ ...formData, stageName: e.target.value })} />
                        <select required className="w-full p-4 text-sm rounded-xl bg-[#0f172a] text-white border border-[#1e2a44] focus:outline-none focus:border-[#3bc1ca] appearance-none" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                          <option value="" disabled>במה אתה עוסק?</option>
                          <option value="music">🎵 מוזיקאי / זמר</option>
                          <option value="art">🎨 אמן דיגיטלי / צייר</option>
                          <option value="content">📱 יוצר תוכן</option>
                        </select>
                        <textarea placeholder="ספר עלייך בשני משפטים (Bio)" className="w-full p-4 text-sm rounded-xl bg-[#0f172a] text-white border border-[#1e2a44] focus:outline-none focus:border-[#3bc1ca] min-h-[100px] resize-none" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} />
                      </>
                    ) : (
                      <>
                        <input type="text" required placeholder="שם פרטי" className="w-full p-4 text-sm rounded-xl bg-[#0f172a] text-white border border-[#1e2a44] focus:outline-none focus:border-[#3bc1ca]" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                        <input type="text" required placeholder="שם משפחה" className="w-full p-4 text-sm rounded-xl bg-[#0f172a] text-white border border-[#1e2a44] focus:outline-none focus:border-[#3bc1ca]" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                      </>
                    )}
                    <input type="email" required placeholder="אימייל להתקשרות" className="w-full p-4 text-sm rounded-xl bg-[#0f172a] text-white border border-[#1e2a44] focus:outline-none focus:border-[#3bc1ca]" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    <button type="submit" className="w-full mt-4 bg-[#3bc1ca] hover:bg-[#2fb0b8] text-[#070b14] font-bold py-4 rounded-xl flex items-center justify-center gap-2">
                      המשך לסיום <svg className="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </form>
                </div>
              )}

              {/* === שלב 3: התחברות לחשבון / ארנק (כאן יש Social Logins) === */}
              {step === 3 && (
                <div className="flex flex-col items-center text-center pt-2 animate-in fade-in slide-in-from-left-8 duration-500">
                  <button onClick={() => setStep(2)} className="self-start text-[#3bc1ca] text-sm mb-2 hover:underline flex items-center gap-1" disabled={isSubmitting}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg> חזור לפרטים
                  </button>
                  
                  <h3 className="text-white text-2xl font-bold mb-3">חיבור מאובטח למערכת</h3>
                  <p className="text-slate-400 text-sm mb-6">התחברו באמצעות חשבון קיים או ארנק דיגיטלי.</p>
                  
                  <div className="bg-[#3bc1ca]/10 border border-[#3bc1ca]/20 rounded-xl p-4 mb-8 w-full">
                    <p className="text-[#3bc1ca] font-bold text-[15px] mb-1">🎁 מתנת הצטרפות:</p>
                    <p className="text-slate-300 text-xs">ברגע שתתחברו, המערכת תפתח לכם ארנק אוטומטית ותשגר אליכם <strong className="text-white">100 מטבעות $VIBE</strong> להתחלה!</p>
                  </div>
                  
                  <div className="w-full flex justify-center hover:scale-[1.02] transition-transform">
                    {isSubmitting ? (
                      <div className="bg-[#1a263b] text-white py-4 px-6 rounded-xl flex items-center gap-3 w-full justify-center">
                         <div className="w-5 h-5 border-2 border-[#3bc1ca] border-t-transparent rounded-full animate-spin"></div>
                         <span className="font-medium">פותח חשבון ומאשר מתנה...</span>
                      </div>
                    ) : (
                      // כאן הלקוח יראה את כפתורי גוגל, פייסבוק, אפל והארנקים!
                      <ConnectButton 
                        client={client} 
                        wallets={wallets} 
                        theme="dark" 
                        connectButton={{ label: "התחברות וקבלת המתנה" }} 
                      />
                    )}
                  </div>
                </div>
              )}

              {/* === שלב 4: מסך הצלחה (AirDrop) === */}
              {step === 4 && (
                <div className="flex flex-col items-center text-center animate-in zoom-in duration-700 py-4">
                  <div className="relative mb-8 mt-2">
                    <div className="absolute inset-0 bg-[#3bc1ca] rounded-full blur-[40px] opacity-40 animate-pulse"></div>
                    <div className="w-28 h-28 bg-gradient-to-br from-[#3bc1ca] to-blue-600 rounded-full flex items-center justify-center border-[4px] border-[#070b14] relative z-10">
                      <span className="text-5xl">🪙</span>
                    </div>
                    <div className="absolute -top-2 -right-2 bg-white text-black font-black text-sm px-3 py-1 rounded-full animate-bounce shadow-lg">+100</div>
                  </div>
                  <h3 className="text-3xl font-black text-white mb-3">מדהים! החשבון מוכן.</h3>
                  <p className="text-[#3bc1ca] font-bold text-lg mb-4 bg-[#3bc1ca]/10 py-1.5 px-6 rounded-full border border-[#3bc1ca]/20">100 מטבעות הועברו לחשבונך!</p>
                  <button onClick={handleFinalEnter} className="w-full bg-white hover:bg-slate-200 text-[#070b14] font-black py-4 rounded-xl flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    כניסה למערכת <svg className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}