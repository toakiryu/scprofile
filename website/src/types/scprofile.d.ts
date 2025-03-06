import { UUID } from "crypto";

export type scprofileUserType = {
  id: UUID; // Supabase標準のUUID（主キー）
  scratch_username: string; // Scratchのユーザー名（変更不可）
  scratch_id: number; // ScratchのユーザーID（変更不可）
  last_login_at: timestamp; // 最終ログイン日時
  display_name: string; // 表示名（カスタム可能）
  admin: boolean; // 管理者フラグ
  joined_at: timestamp; // Scratchの参加日
  created_at: timestamp; // アカウント作成日時
  profile_updated_at: timestamp; // 最後にプロフィールを更新した日時
  public_profile: boolean; // プロフィール公開設定
  profile: {
    status: string; // ステータスメッセージ
    bio: string; // 自己紹介
    country: string; // 国（ISO 3166-1 alpha-2）
    avatar_url: string; // アイコンURL（Scratchのアイコンを取得）
  };
  premium: boolean; // 有料プランかどうか
  premium_expires_at: string | null; // 有料プランの期限
};
