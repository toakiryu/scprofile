import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("user_id");
  const scratch_id = searchParams.get("scratch_id");
  const scratch_username = searchParams.get("scratch_username");

  const supabase = createClient();
  let query;

  if (user_id) {
    query = supabase.from("users").select("*").eq("id", user_id).single();
  } else if (scratch_id) {
    query = supabase
      .from("users")
      .select("*")
      .eq("scratch_id", scratch_id)
      .single();
  } else if (scratch_username) {
    query = supabase
      .from("users")
      .select("*")
      .eq("scratch_username", scratch_username)
      .single();
  } else {
    return NextResponse.json(
      {
        success: false,
        message:
          "`user_id`, `scratch_id`, または `scratch_username` を指定してください。",
      },
      { status: 400 }
    );
  }

  try {
    const { data: user, error } = await query;

    if (error || !user) {
      return NextResponse.json(
        {
          success: false,
          message: "ユーザーが見つかりません。",
          error: error?.message,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
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
