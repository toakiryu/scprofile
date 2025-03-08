"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { scprofileUserType } from "@/types/scprofile";

import { TabsTrigger } from "./user-setting-modal/_tab";
import UserSettingModalTabContentProfile from "./user-setting-modal/profile";
import UserSettingModalTabContentAccount from "./user-setting-modal/account";
import UserSettingModalTabContentSecurity from "./user-setting-modal/security";
import { useTranslations } from "next-intl";

const ScProfileUserSettingModal = ({
  onOpen,
  onOpenChange,
  children,
  user,
}: {
  onOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  children?: React.ReactNode;
  user: scprofileUserType;
}) => {
  const t = useTranslations("user-setting-modal");
  const [tab, setTab] = useState<string>("profile");

  return (
    <Dialog open={onOpen} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="w-full max-w-full sm:max-w-[900px] max-h-[calc(100dvh-100px)] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{t("account-setting")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 overflow-hidden">
          <aside className="overflow-auto">
            <nav className="flex flex-row lg:flex-col p-1">
              <TabsTrigger tab={tab} setTab={setTab} value="profile">
                {t("tabs.profile.title")}
              </TabsTrigger>
              <TabsTrigger tab={tab} setTab={setTab} value="account">
                {t("tabs.account.title")}
              </TabsTrigger>
              <TabsTrigger tab={tab} setTab={setTab} value="security">
                {t("tabs.security.title")}
              </TabsTrigger>
            </nav>
          </aside>
          <div className="flex-1 w-full h-full max-h-[500px] lg:max-w-2xl overflow-auto">
            <UserSettingModalTabContentProfile tab={tab} user={user} />
            <UserSettingModalTabContentAccount tab={tab} user={user} />
            <UserSettingModalTabContentSecurity tab={tab} user={user} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { ScProfileUserSettingModal };
