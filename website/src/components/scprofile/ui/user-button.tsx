"use client";

import { useState } from "react";
import { deleteCookie } from "cookies-next/client";
import useScProfileUser from "@/hooks/useScProfileUser";
import { scratchAuthLogin } from "../../scratch-auth-component/scripts/main";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import sessionConfig from "../../../../_config/session.config";
import { ScProfileUserSettingModal } from "./user-setting-modal";

function UserButton() {
  const { user } = useScProfileUser();
  const [userSettingModalOnOpen, setUserSettingModalOnOpen] =
    useState<boolean>(false);

  return (
    <div>
      {user && (
        <ScProfileUserSettingModal
          onOpen={userSettingModalOnOpen}
          onOpenChange={setUserSettingModalOnOpen}
          user={user}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="rounded-full">
            <AvatarImage src={user?.profile.images["90x90"]} />
            <AvatarFallback>MY</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            {user?.display_name || "My Account"}
          </DropdownMenuLabel>
          {user && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setUserSettingModalOnOpen(true)}
                >
                  Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </>
          )}
          <DropdownMenuSeparator />
          {user ? (
            <DropdownMenuItem
              onClick={() => {
                deleteCookie(sessionConfig.account_cookie_name);
                window.location.reload();
              }}
            >
              Log out
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() => {
                scratchAuthLogin();
              }}
            >
              Log in
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserButton;
