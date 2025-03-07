import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const scratch_id = searchParams.get("scratch_id");
  const scratch_username = searchParams.get("scratch_username");

  const supabase = createClient();

  if (scratch_id) {
    try {
      // 新規ユーザーをSupabaseのusersテーブルから取得
      const { data: user, error } = await supabase
        .from("users")
        .select("scratch_id")
        .eq("scratch_id", scratch_id)
        .single();

      if (error) {
        return NextResponse.json(
          {
            message: "ユーザー取得中にエラーが発生しました。",
            error: error.message, // 修正：エラーメッセージを返す
          },
          { status: 400 }
        );
      }
      if (!user) {
        // 修正：userが空の場合も対応
        return NextResponse.json(
          {
            message: "リクエストされたユーザーは存在しません",
          },
          { status: 400 }
        );
      }

      return NextResponse.json(user, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        {
          message: "サーバーエラーが発生しました",
          error: (error as Error).message, // 修正：エラーメッセージを返す
        },
        { status: 500 }
      );
    }
  } else if (scratch_username) {
    try {
      // 新規ユーザーをSupabaseのusersテーブルから取得
      const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("scratch_username", scratch_username)
        .single();

      if (error) {
        return NextResponse.json(
          {
            message: "ユーザー取得中にエラーが発生しました。",
            error: error.message, // 修正：エラーメッセージを返す
          },
          { status: 400 }
        );
      }
      if (!user) {
        // 修正：userが空の場合も対応
        return NextResponse.json(
          {
            message: "リクエストされたユーザーは存在しません",
          },
          { status: 400 }
        );
      }

      return NextResponse.json(user, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        {
          message: "サーバーエラーが発生しました",
          error: (error as Error).message, // 修正：エラーメッセージを返す
        },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      {
        message: "`scratch_id` または `scratch_username` を指定してください。",
      },
      { status: 400 }
    );
  }
}
