"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { toast } from "sonner";
import { setCookie } from "cookies-next/client";
import {
  scratchAuthSessionGetUserName,
  setScratchAuthSession,
} from "@/components/scratch-auth-component/scripts/main";
import {
  getScprofileUserInfo,
  postScprofileUserSignin,
  postScprofileUserSignup,
} from "@/utils/scprofile/account";
import sessionConfig from "../../../../../_config/session.config";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const privateCode = searchParams.get("privateCode");

  const SigninHandler = async (session: {
    name: string;
    value: string;
    options: {
      expires: Date;
      path: string;
    };
  }) => {
    const signin = await postScprofileUserSignin({
      session: session.value,
    });
    if (signin.success) {
      setCookie(sessionConfig.account_cookie_name, session.value, {
        path: session.options.path,
        expires: session.options.expires,
      });
      toast.success("ScProfileアカウントにログインしました。");
      window.location.href = "/";
      // dispatchEventByName("scprofile-update");
      return;
    } else {
      console.error(signin.message, signin.error);
      toast.error("ScProfileアカウントのログインに失敗しました。");
      router.push("/");
      return;
    }
  };

  useEffect(() => {
    async function auth() {
      if (!privateCode) {
        toast.error("認証コードが見つかりません。");
        router.push("/");
        return;
      }

      let session;

      // STEP 1. Scratchアカウントの認証
      try {
        const res = await setScratchAuthSession(privateCode);
        if (res.data) {
          session = res.data;
          toast.success("Scratchアカウントのログインに成功しました。");
        } else {
          toast.error("Scratchアカウントの認証に失敗しました。");
          router.push("/");
          return;
        }
      } catch (error) {
        console.error("Scratchアカウント認証エラー:", error);
        toast.error("Scratchアカウントのログインに失敗しました。");
        router.push("/");
        return;
      }

      let scratch_username;

      // STEP 2. セッションからユーザー名の取得
      if (session) {
        const response = await scratchAuthSessionGetUserName(session.value);
        if (response.success) {
          scratch_username = response.data;
        } else {
          console.error(response.message, response.error);
          toast.error("セッション情報の解析に失敗しました。");
          router.push("/");
          return;
        }
      } else {
        toast.error("セッション情報の取得に失敗しました。");
        router.push("/");
        return;
      }

      let myAccount;
      // STEP 3. ScProfileアカウントの有無を確認
      if (scratch_username) {
        const response = await getScprofileUserInfo({
          scratch_username: scratch_username,
        });
        if (response.success) {
          myAccount = true;
        } else {
          console.error(response.message, response.error);
        }
      } else {
        toast.error("Scratchアカウント情報の取得に失敗しました。");
        router.push("/");
        return;
      }

      // STEP 4. ScProfileアカウントの作成
      if (!myAccount) {
        const response = await postScprofileUserSignup({
          scratch_username: scratch_username,
        });
        if (response.success) {
          toast.success("ScProfileアカウントを作成しました。");
        } else {
          console.error(response.message, response.error);
          toast.error("ScProfileアカウントの作成に失敗しました。");
          router.push("/");
          return;
        }
      }

      await SigninHandler(session);
    }

    auth();
  }, [router, privateCode]);

  return (
    <div className="flex justify-center items-center w-full h-full min-h-[calc(100dvh-64px)]">
      スクラッチアカウントの認証...
    </div>
  );
}
