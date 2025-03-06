import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";
import { scratchUserInfo } from "@/components/scratch-auth-component/scripts/main";

export async function POST(req: NextRequest) {
  const { scratch_username, display_name } = await req.json();

  // 入力チェック
  if (!scratch_username) {
    return NextResponse.json(
      {
        ok: false,
        message: "`scratch_username` を指定してください。",
      },
      { status: 400 }
    );
  }
  if (!display_name) {
    return NextResponse.json(
      {
        ok: false,
        message: "`display_name` を指定してください。",
      },
      { status: 400 }
    );
  }

  const supabase = createClient();

  try {
    try {
      const scratchUserInfo_res = await scratchUserInfo(scratch_username);
      const userInfo = scratchUserInfo_res.body;

      // 新規ユーザーをSupabaseのusersテーブルに追加
      const { error } = await supabase.from("users").insert([
        {
          scratch_id: userInfo?.id,
          scratch_username: scratch_username,
          display_name: display_name,
          joined_at: userInfo?.history.joined,
          profile: {
            images: {
              "90x90": `https://cdn2.scratch.mit.edu/get_image/user/${userInfo?.id}_90x90.png?v=`,
              "60x60": `https://cdn2.scratch.mit.edu/get_image/user/${userInfo?.id}_60x60.png?v="`,
              "55x55": `https://cdn2.scratch.mit.edu/get_image/user/${userInfo?.id}_55x55.png?v=`,
              "50x50": `https://cdn2.scratch.mit.edu/get_image/user/${userInfo?.id}_50x50.png?v=`,
              "32x32": `https://cdn2.scratch.mit.edu/get_image/user/${userInfo?.id}_32x32.png?v=`,
            },
          },
        },
      ]);

      if (error) {
        // 既に登録されているメールアドレスによるエラーかを判定
        if (error.message.includes("duplicate key value")) {
          if (error.message.includes("unique_scratch_id")) {
            return NextResponse.json(
              {
                ok: false,
                message: "リクエストしたユーザーIDはすでに登録されています。",
              },
              { status: 400 }
            );
          }
        }

        // error.message だけを返す
        return NextResponse.json(
          {
            ok: false,
            message: "ユーザー登録中にエラーが発生しました。",
            error_message: error.message, // ここを修正
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { ok: true, message: "ユーザー登録が成功しました。" },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json(
        {
          ok: false,
          message: "Scratchユーザー情報の取得に失敗しました。",
          error_message: (error as Error).message, // エラーのメッセージ部分のみ返す
        },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "サーバーエラーが発生しました",
        error_message: (error as Error).message, // エラーのメッセージ部分のみ返す
      },
      { status: 500 }
    );
  }
}
