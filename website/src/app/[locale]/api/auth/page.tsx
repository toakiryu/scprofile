"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { setScratchAuthSession } from "@/components/scratch-auth-component/scripts/main";
import { toast } from "sonner";

import { setCookie } from "cookies-next/client";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const privateCode = searchParams.get("privateCode");

  useEffect(() => {
    async function auth() {
      if (!privateCode) {
        toast.error("認証コードが見つかりません。");
        router.push("/");
        return;
      }

      try {
        const res = await setScratchAuthSession(privateCode);
        console.log("API Response:", res); // ここでレスポンスを確認
        console.log("Response Body:", res.body);

        if (res.body) {
          setCookie(res.body.name, res.body.value, {
            path: res.body.options.path,
            expires: res.body.options.expires,
          });
          toast.success("ログインに成功しました。");
          router.push("/");
        } else {
          throw new Error();
        }
      } catch (error) {
        console.error("認証エラー:", error);
        toast.error("ログインに失敗しました。");
        router.push("/");
      }
    }

    auth();
  }, [router, privateCode]);

  return (
    <div className="flex justify-center items-center w-full h-full min-h-[calc(100dvh-64px)]">
      スクラッチアカウントの認証...
    </div>
  );
}
