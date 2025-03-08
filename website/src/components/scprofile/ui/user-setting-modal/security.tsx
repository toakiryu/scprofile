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

function UserSettingModalTabContentSecurity({
  tab,
  user,
}: {
  tab: string;
  user: scprofileUserType;
}) {
  return (
    <TabsContent tab={tab} value="security">
      <TabContentHeader
        title="Security"
        description="セキュリティーの設定を更新します。"
      />
      <form className="space-y-8">
        <ItemGroup>
          <ItemLabel>最終ログイン日時</ItemLabel>
          <Input value={user.last_login_at} disabled />
          <ItemDescription>
            この項目を変更することは出来ません。
          </ItemDescription>
        </ItemGroup>
      </form>
    </TabsContent>
  );
}

export default UserSettingModalTabContentSecurity;
