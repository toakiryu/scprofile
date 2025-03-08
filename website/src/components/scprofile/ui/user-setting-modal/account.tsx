import React from "react";
import { scprofileUserType } from "@/types/scprofile";
import {
  ItemDescription,
  ItemGroup,
  ItemLabel,
  TabContentHeader,
  TabsContent,
} from "./_tab";
import { Input } from "@/components/ui/input";

function UserSettingModalTabContentAccount({
  tab,
  user,
}: {
  tab: string;
  user: scprofileUserType;
}) {
  return (
    <TabsContent tab={tab} value="account">
      <TabContentHeader
        title="Account"
        description="アカウント設定を更新します。"
      />
      <form className="space-y-8">
        <ItemGroup>
          <ItemLabel>アカウントロール</ItemLabel>
          <Input value={user.admin ? "管理者" : "一般"} disabled />
          <ItemDescription>
            この項目を変更することは出来ません。
          </ItemDescription>
        </ItemGroup>
        <ItemGroup>
          <ItemLabel>利用プラン</ItemLabel>
          <Input value={user.premium ? "Premium" : "Free"} disabled />
          <ItemDescription>
            この項目を変更することは出来ません。
          </ItemDescription>
        </ItemGroup>
        {user.premium && (
          <ItemGroup>
            <ItemLabel>Premiumプランの期限</ItemLabel>
            <Input
              value={
                user.premium_expires_at ? user.premium_expires_at : "無期限"
              }
              disabled
            />
            <ItemDescription>
              この項目を変更することは出来ません。
            </ItemDescription>
          </ItemGroup>
        )}
        <ItemGroup>
          <ItemLabel>Scratch参加日</ItemLabel>
          <Input value={user.joined_at} disabled />
          <ItemDescription>
            この項目を変更することは出来ません。
          </ItemDescription>
        </ItemGroup>
        <ItemGroup>
          <ItemLabel>ScProfileアカウント作成日</ItemLabel>
          <Input value={user.created_at} disabled />
          <ItemDescription>
            この項目を変更することは出来ません。
          </ItemDescription>
        </ItemGroup>
        <ItemGroup>
          <ItemLabel>最終変更日時</ItemLabel>
          <Input value={user.updated_at} disabled />
          <ItemDescription>
            この項目を変更することは出来ません。
          </ItemDescription>
        </ItemGroup>
      </form>
    </TabsContent>
  );
}

export default UserSettingModalTabContentAccount;
