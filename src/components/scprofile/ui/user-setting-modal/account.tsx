"use client";

import React, { useState } from "react";
import { scprofileUserType } from "@/types/scprofile";
import {
  ItemDescription,
  ItemGroup,
  ItemLabel,
  TabContentHeader,
  TabsContent,
} from "./_tab";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
import {
  deleteScprofileUserDelete,
  postScprofileUserSignout,
} from "@/utils/scprofile/account";
import { toast } from "sonner";
import { IconLoader2 } from "@tabler/icons-react";
import { useFormatter, useTranslations } from "next-intl";
import { dispatchEventByName } from "@/utils/eventHandler";
import { sendGAEvent } from "@next/third-parties/google";

function AccountDelete({ user }: { user: scprofileUserType }) {
  const t = useTranslations("user-setting-modal");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Zod スキーマ: `display_name` が `user.display_name` と完全一致することをバリデーション
  const formSchema = z.object({
    display_name: z
      .string()
      .min(1, t("tabs.account.items.account_delete.validation.min1"))
      .refine((val) => val === user.display_name, {
        message: t("tabs.account.items.account_delete.validation.refine"),
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      display_name: "",
    },
  });

  const onSubmit = async () => {
    setIsLoading(true);
    const response = await deleteScprofileUserDelete();
    if (response.success) {
      const res = await postScprofileUserSignout();
      if (res.success) {
        sendGAEvent("event", "user_setting_save", {
          value: "account",
        });
        toast.success(t("tabs.account.items.account_delete.toast.success"));
        dispatchEventByName("scprofile-update");
        window.location.reload();
      } else {
        toast.warning(t("tabs.account.items.account_delete.toast.warning"));
        console.warn(res.message, res.error);
      }
    } else {
      toast.error(t("tabs.account.items.account_delete.toast.error"));
      console.error(response.message, response.error);
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <hr className="my-5" />
        <ItemGroup>
          <FormField
            control={form.control}
            name="display_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("tabs.account.items.account_delete.label")}
                </FormLabel>
                <FormControl>
                  <Input placeholder={user.display_name} {...field} />
                </FormControl>
                <FormDescription>
                  {t("tabs.account.items.account_delete.description")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </ItemGroup>
        <Button
          type="submit"
          variant="destructive"
          className="text-white"
          disabled={isLoading}
        >
          {isLoading && <IconLoader2 className="animate-spin" />}
          {t("tabs.account.items.account_delete.button")}
        </Button>
      </form>
    </Form>
  );
}

function UserSettingModalTabContentAccount({
  tab,
  user,
}: {
  tab: string;
  user: scprofileUserType;
}) {
  const t = useTranslations("user-setting-modal");
  const format = useFormatter();

  return (
    <TabsContent tab={tab} value="account">
      <TabContentHeader
        title={t("tabs.account.title")}
        description={t("tabs.account.description")}
      />
      <form className="space-y-8">
        <ItemGroup>
          <ItemLabel>{t("tabs.account.items.admin.label")}</ItemLabel>
          <Input
            value={
              user.admin
                ? t("tabs.account.items.admin.option.true")
                : t("tabs.account.items.admin.option.false")
            }
            disabled
          />
          <ItemDescription>{t("field.description.read-only")}</ItemDescription>
        </ItemGroup>
        <ItemGroup>
          <ItemLabel>{t("tabs.account.items.premium.label")}</ItemLabel>
          <Input
            value={
              user.premium
                ? t("tabs.account.items.premium.option.true")
                : t("tabs.account.items.premium.option.false")
            }
            disabled
          />
          <ItemDescription>{t("field.description.read-only")}</ItemDescription>
        </ItemGroup>
        {user.premium && (
          <ItemGroup>
            <ItemLabel>
              {t("tabs.account.items.premium_expires_at.label")}
            </ItemLabel>
            <Input
              value={
                user.premium_expires_at
                  ? format.dateTime(new Date(user.premium_expires_at), {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    })
                  : t("tabs.account.items.premium_expires_at.option.null")
              }
              disabled
            />
            <ItemDescription>
              {t("field.description.read-only")}
            </ItemDescription>
          </ItemGroup>
        )}
        <ItemGroup>
          <ItemLabel>{t("tabs.account.items.joined_at.label")}</ItemLabel>
          <Input
            value={format.dateTime(new Date(user.joined_at), {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            })}
            disabled
          />
          <ItemDescription>{t("field.description.read-only")}</ItemDescription>
        </ItemGroup>
        <ItemGroup>
          <ItemLabel>{t("tabs.account.items.created_at.label")}</ItemLabel>
          <Input
            value={format.dateTime(new Date(user.created_at), {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            })}
            disabled
          />
          <ItemDescription>{t("field.description.read-only")}</ItemDescription>
        </ItemGroup>
        <ItemGroup>
          <ItemLabel>{t("tabs.account.items.updated_at.label")}</ItemLabel>
          <Input
            value={format.dateTime(new Date(user.updated_at), {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            })}
            disabled
          />
          <ItemDescription>{t("field.description.read-only")}</ItemDescription>
        </ItemGroup>
      </form>
      <AccountDelete user={user} />
    </TabsContent>
  );
}

export default UserSettingModalTabContentAccount;
