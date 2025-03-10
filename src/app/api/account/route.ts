import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";
import { scratchAuthCheckSession } from "@/components/scratch-auth-component/scripts/main";

export async function DELETE(req: NextRequest) {
  const { session } = await req.json();

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

    const { error } = await supabase
      .from("users")
      .delete()
      .eq("scratch_username", scratch_username);

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: "ユーザーの削除に更新に失敗しました。",
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "ユーザーの削除しました。",
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
