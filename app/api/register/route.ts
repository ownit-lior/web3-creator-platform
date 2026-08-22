import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// הכנסנו את המפתחות ישירות לקוד כדי לוודא שזה עובד 100%!
const supabaseUrl = "https://lnruwihzbqeadvtcwxbd.supabase.co";
const supabaseKey = "sb_publishable_vef7C0g4Ib8RQVJMaKm3-A_eP4kLGgU";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formData, role, walletAddress } = body;

    // מוודאים שיש לנו כתובת ארנק - זה תעודת הזהות של המשתמש שלנו!
    if (!walletAddress) {
      return NextResponse.json({ error: "Missing wallet address" }, { status: 400 });
    }

    // שומרים את הנתונים בטבלת users שלנו
    const { error } = await supabase
      .from('users')
      .upsert({
        wallet_address: walletAddress,
        role: role,
        email: formData.email,
        first_name: formData.firstName || null,
        last_name: formData.lastName || null,
        profile_image: formData.profileImage || null,
        stage_name: formData.stageName || null,
        category: formData.category || null,
        bio: formData.bio || null,
      });

    if (error) {
      console.error("Supabase insert error:", error);
      throw error;
    }

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to register" }, { status: 500 });
  }
}