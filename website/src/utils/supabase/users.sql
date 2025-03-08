CREATE TABLE
    users (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (), -- UUID（主キー）
        scratch_username text NOT NULL, -- Scratchのユーザー名（変更不可）
        scratch_id bigint NOT NULL UNIQUE, -- ScratchのユーザーID（変更不可）
        last_login_at timestamp, -- 最終ログイン日時
        display_name text, -- 表示名（カスタム可能）
        admin boolean DEFAULT false, -- 管理者フラグ
        joined_at timestamp, -- Scratchの参加日
        created_at timestamp DEFAULT current_timestamp, -- アカウント作成日時
        profile_updated_at timestamp DEFAULT current_timestamp, -- 最後にプロフィールを更新した日時
        profile jsonb, -- プロフィール情報（JSON型）
        premium boolean DEFAULT false, -- 有料プランかどうか
        premium_expires_at timestamp NULL, -- 有料プランの期限（NULLの場合は期限なし）
        public_profile boolean DEFAULT true, -- プロフィール公開設定
        status jsonb, -- プロフィールステータス
        about text, -- 概要
        CONSTRAINT unique_scratch_id UNIQUE (scratch_id) -- Scratch IDのユニーク制約
    );