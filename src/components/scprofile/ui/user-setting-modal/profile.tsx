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
import { putScprofileUserUpdate } from "@/utils/scprofile/account";
import { toast } from "sonner";
import { IconLoader2 } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { dispatchEventByName } from "@/utils/eventHandler";

function UserSettingModalTabContentProfile({
  tab,
  user,
}: {
  tab: string;
  user: scprofileUserType;
}) {
  const t = useTranslations("user-setting-modal");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = z.object({
    display_name: z
      .string()
      .min(2, t("tabs.profile.items.display_name.validation.min2"))
      .max(10, t("tabs.profile.items.display_name.validation.max10")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      display_name: user.display_name,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const response = await putScprofileUserUpdate({ updates: values });
    if (response.success) {
      toast.success(t("tabs.profile.toast.success"));
      dispatchEventByName("scprofile-update")
    } else {
      toast.error(t("tabs.profile.toast.error"));
      console.error(response.message, response.error);
    }
    setIsLoading(false);
  };

  return (
    <TabsContent tab={tab} value="profile">
      <TabContentHeader
        title={t("tabs.profile.title")}
        description={t("tabs.profile.description")}
      />
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <ItemGroup>
            <ItemLabel>Scratch ID</ItemLabel>
            <Input defaultValue={user.scratch_id} disabled />
            <ItemDescription>
              {t("field.description.read-only")}
            </ItemDescription>
          </ItemGroup>
          <ItemGroup>
            <ItemLabel>
              {t("tabs.profile.items.scratch_username.label")}
            </ItemLabel>
            <Input defaultValue={user.scratch_username} disabled />
            <ItemDescription>
              {t("field.description.read-only")}
            </ItemDescription>
          </ItemGroup>
          <ItemGroup>
            <ItemLabel>ScProfile ID</ItemLabel>
            <Input defaultValue={user.id} disabled />
            <ItemDescription>
              {t("field.description.read-only")}
            </ItemDescription>
          </ItemGroup>
          <ItemGroup>
            <FormField
              control={form.control}
              name="display_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("tabs.profile.items.display_name.label")}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="User_0000" {...field} />
                  </FormControl>
                  <FormDescription>
                    {t.rich("tabs.profile.items.display_name.description", {
                      em: (chunks) => <em>{chunks}</em>,
                    })}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </ItemGroup>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <IconLoader2 className="animate-spin" />}
            {t("save-changes")}
          </Button>
        </form>
      </Form>
    </TabsContent>
  );
}

export default UserSettingModalTabContentProfile;
