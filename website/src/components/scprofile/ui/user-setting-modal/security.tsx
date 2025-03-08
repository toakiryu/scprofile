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
import { useFormatter, useTranslations } from "next-intl";

function UserSettingModalTabContentSecurity({
  tab,
  user,
}: {
  tab: string;
  user: scprofileUserType;
}) {
  const t = useTranslations("user-setting-modal");
  const format = useFormatter();

  return (
    <TabsContent tab={tab} value="security">
      <TabContentHeader
        title={t("tabs.security.title")}
        description={t("tabs.security.description")}
      />
      <form className="space-y-8">
        <ItemGroup>
          <ItemLabel>{t("tabs.security.items.last_login_at.label")}</ItemLabel>
          <Input
            value={format.dateTime(new Date(user.last_login_at), {
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
    </TabsContent>
  );
}

export default UserSettingModalTabContentSecurity;
