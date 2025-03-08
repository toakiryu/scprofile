import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";
import { scratchAuthCheckSession } from "@/components/scratch-auth-component/scripts/main";

export async function PUT(req: NextRequest) {
  const { session, updates } = await req.json();

  // 入力チェック
  if (!session) {
    return NextResponse.json(
      {
        success: false,
        message: "`session` を指定してください。",
      },
      { status: 400 }
    );
  }

  if (
    !updates ||
    typeof updates !== "object" ||
    Object.keys(updates).length === 0
  ) {
    return NextResponse.json(
      {
        success: false,
        message: "`updates` に更新する項目を指定してください。",
      },
      { status: 400 }
    );
  }

  const supabase = createClient();

  try {
    const response = await scratchAuthCheckSession({ session });

    if (!response.success) {
      return NextResponse.json(
        {
          success: false,
          message: response.message,
          error: response.error,
        },
        { status: 400 }
      );
    }

    const scratch_username = response.data;

    // `updated_at` を現在の時間に設定
    const updatedFields = {
      ...updates,
      updated_at: new Date().toISOString(),
    };

    // ユーザー情報を更新
    const { error } = await supabase
      .from("users")
      .update(updatedFields) // 指定された項目を更新
      .eq("scratch_username", scratch_username);

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: "ユーザー情報の更新に失敗しました。",
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "ユーザー情報を更新しました。",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "サーバーエラーが発生しました",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
