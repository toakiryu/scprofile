import { UUID } from "crypto";

export type scprofileConfigType = {
  cookie_name: string;
};

export type scprofileUserType = {
  id: UUID; // Supabase標準のUUID（主キー）
  scratch_username: string; // Scratchのユーザー名（変更不可）
  scratch_id: number; // ScratchのユーザーID（変更不可）
  last_login_at: timestamp; // 最終ログイン日時
  display_name: string; // 表示名（カスタム可能）
  admin: boolean; // 管理者フラグ
  joined_at: timestamp; // Scratchの参加日
  created_at: timestamp; // アカウント作成日時
  updated_at: timestamp; // 最後にプロフィールを更新した日時
  public_profile: boolean; // プロフィール公開設定
  profile: {
    images: {
      "90x90": string;
      "60x60": string;
      "55x55": string;
      "50x50": string;
      "32x32": string;
    };
  };
  premium: boolean; // 有料プランかどうか
  premium_expires_at: string | null; // 有料プランの期限
};
