"use client";
import { useState, useEffect } from "react";
import { RegistrationModal } from "./registration-modal";
import { ArtistDashboard } from "./artist-dashboard";
import { useActiveAccount } from "thirdweb/react";
export function AppShell() {
const account = useActiveAccount();
const [isRegistered, setIsRegistered] = useState(false);
const [userData, setUserData] = useState<any>(null);
// בודק אם המשתמש כבר נרשם בעבר (כדי שלא יצטרך להירשם כל פעם מחדש)
useEffect(() => {
if (account?.address) {
  const savedUser = localStorage.getItem(`vibe_user_${account.address}`);if (savedUser) {
setUserData(JSON.parse(savedUser));
setIsRegistered(true);
}
} else {
setIsRegistered(false);
setUserData(null);
}
}, [account]);
// פונקציה שמופעלת ברגע שההרשמה מסתיימת במסך ההצלחה
const handleRegistrationComplete = (data: { formData: any; role: "artist" | "fan" }) => {
setUserData(data);
setIsRegistered(true);
// הנתונים נשמרים ל-localStorage בתוך המודאל, אז פשוט נשנה פה את הסטייט
};
// אם המשתמש נרשם והוא אמן - נציג לו את דאשבורד האמן המרהיב!
if (isRegistered && userData?.role === "artist") {
return <ArtistDashboard userData={userData.formData} />;
}
// אם המשתמש נרשם והוא קהל/משקיע - נציג לו את זירת המסחר (נבנה אותה בהמשך)
if (isRegistered && userData?.role === "fan") {
return (
<div className="min-h-screen bg-[#070b14] flex flex-col items-center justify-center text-center p-4">
<div className="text-6xl mb-6 animate-bounce">🌍</div>
<h1 className="text-4xl font-black text-white mb-4">זירת המסחר</h1>
<p className="text-[#3bc1ca] text-xl">כאן המשקיעים יגלו אמנים ויקנו מניות. (בפיתוח)</p>
</div>
);
}
// מצב ברירת מחדל: המשתמש עוד לא נרשם - נציג את דף הבית וחלונית ההרשמה
return (
<RegistrationModal 
isOpen={true} 
onRegistered={handleRegistrationComplete} 
/>
);
}