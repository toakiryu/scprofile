import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";

export async function GET() {
  const supabase = createClient();

  try {
    // ユーザーデータの取得
    const { error, data } = await supabase
      .from("users")
      .select("id, premium, public_profile");

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: "統計情報の取得に失敗しました。",
          error: error.message,
        },
        { status: 500 }
      );
    }

    // 統計データを計算
    const totalUsers = data.length;
    const premiumUsers = data.filter((user) => user.premium).length;
    const publicProfiles = data.filter((user) => user.public_profile).length;

    const stats = {
      totalUsers,
      premiumUsers,
      publicProfiles,
    };

    return NextResponse.json({ success: true, data: stats }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "サーバーエラーが発生しました。",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
