"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import {
  scratchAuthSessionGetUserName,
  scratchUserInfo,
  setScratchAuthSession,
} from "@/components/scratch-auth-component/scripts/main";
import { setCookie } from "@/components/scratch-auth-component/scripts/cookie";
import { toast } from "sonner";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  display_name: z.string().min(2, {
    message: "Display name must be at least 2 characters.",
  }),
});

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const privateCode = searchParams.get("privateCode");
  const [session, setSession] = useState<
    | {
        name: string;
        value: string;
        options: {
          expires: Date;
          path: string;
        };
      }
    | undefined
  >(undefined);
  const [scratch_username, setScratch_username] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    async function auth() {
      if (!privateCode) {
        toast.error("認証コードが見つかりません。");
        router.push("/");
        return;
      }

      try {
        const get_session_res = await setScratchAuthSession(privateCode);
        if (get_session_res.status && get_session_res.body) {
          setSession(get_session_res.body);

          const get_username_res = await scratchAuthSessionGetUserName(
            get_session_res.body.value
          );
          if (get_username_res.status && get_username_res.body) {
            const checkIsCreatedAccount = await fetch(
              `/en/api/account?scratch_username=${get_username_res.body}`
            );

            if (checkIsCreatedAccount.ok) {
              await setCookie(
                get_session_res.body.name,
                get_session_res.body.value,
                {
                  path: get_session_res.body.options.path,
                  expires: get_session_res.body.options.expires,
                }
              );
              toast.success("ScProfileアカウントにログインしました。");
              router.push("/");
            } else {
              setScratch_username(get_username_res.body);
              toast.success("Scratchアカウントでログインしました。");
            }
          } else {
            toast.error(
              get_username_res.message || "ユーザー名の取得に失敗しました。"
            );
            router.push("/");
          }
        } else {
          toast.error(get_session_res.message || "ログインに失敗しました。");
          router.push("/");
        }
      } catch (error) {
        console.error("認証エラー:", error);
        toast.error("ログインに失敗しました。");
        router.push("/");
      }
    }

    auth();
  }, [router, privateCode]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      display_name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (!scratch_username) return;

    const scratchUserInfo_res = await scratchUserInfo(scratch_username);
    if (scratchUserInfo_res.status && scratchUserInfo_res.body) {
      const res = await fetch("/en/api/account/signup", {
        method: "POST",
        body: JSON.stringify({
          scratch_id: scratchUserInfo_res.body.id,
          scratch_username: scratchUserInfo_res.body.username,
          display_name: data.display_name,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok && session) {
        await setCookie(session.name, session.value, {
          path: session.options.path,
          expires: session.options.expires,
        });
        toast.success("アカウントの登録が完了しました。");
        router.push("/");
      } else {
        toast.error("アカウントの登録に失敗しました。");
      }
    } else {
      toast.error("Scratchユーザー情報の取得に失敗しました。");
    }
  };

  if (scratch_username) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="display_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="User0001" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full h-full min-h-[calc(100dvh-64px)]">
      スクラッチアカウントの認証...
    </div>
  );
}
