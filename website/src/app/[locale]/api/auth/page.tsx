"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { setScratchAuthSession } from "@/components/scratch-auth-component/scripts/main";
import { setCookie } from "@/components/scratch-auth-component/scripts/cookie";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const privateCode = searchParams.get("privateCode");

  useEffect(() => {
    async function auth() {
      const res = await setScratchAuthSession(privateCode);
      console.log(res);
      if (res.status && res.body) {
        console.log("認証に成功");
        await setCookie(res.body?.name, res.body?.value, {
          path: res.body.options.path,
          expires: res.body.options.expires,
        });
      } else {
        console.error("認証に失敗");
      }
      router.push("/");
    }
    auth();
  }, [router, privateCode]);

  return (
    <div className="flex justify-center items-center w-full h-full min-h-[calc(100dvh-64px)]">
      スクラッチアカウントの認証...
    </div>
  );
}
