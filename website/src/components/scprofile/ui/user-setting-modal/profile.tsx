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

const formSchema = z.object({
  display_name: z.string().min(2).max(10),
});

function UserSettingModalTabContentProfile({
  tab,
  user,
}: {
  tab: string;
  user: scprofileUserType;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      toast.success(
        "変更内容をを保存しました。反映には時間がかかる可能性がります。"
      );
    } else {
      toast.error("変更内容の保存に失敗しました。");
      console.error(response.message, response.error);
    }
    setIsLoading(false);
  };

  return (
    <TabsContent tab={tab} value="profile">
      <TabContentHeader
        title="Profile"
        description="これは、サイト上で他のユーザーからあなたがどのように見えるかを示します。"
      />
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <ItemGroup>
            <ItemLabel>Scratch ID</ItemLabel>
            <Input defaultValue={user.scratch_id} disabled />
            <ItemDescription>
              この項目を変更することは出来ません。
            </ItemDescription>
          </ItemGroup>
          <ItemGroup>
            <ItemLabel>Scratch Username</ItemLabel>
            <Input defaultValue={user.scratch_username} disabled />
            <ItemDescription>
              この項目を変更することは出来ません。
            </ItemDescription>
          </ItemGroup>
          <ItemGroup>
            <ItemLabel>ScProfile ID</ItemLabel>
            <Input defaultValue={user.id} disabled />
            <ItemDescription>
              この項目を変更することは出来ません。
            </ItemDescription>
          </ItemGroup>
          <ItemGroup>
            <FormField
              control={form.control}
              name="display_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="User_0000" {...field} />
                  </FormControl>
                  <FormDescription>
                    この項目は <em>ScProfile</em> アカウントの表示名です。
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </ItemGroup>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <IconLoader2 className="animate-spin" />}
            変更内容を保存
          </Button>
        </form>
      </Form>
    </TabsContent>
  );
}

export default UserSettingModalTabContentProfile;
