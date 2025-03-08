"use client";

import { useEffect, useState } from "react";
import { deleteCookie } from "cookies-next/client";
import { scprofileUserType } from "@/types/scprofile";
import { scratchAuthCheckSession } from "@/components/scratch-auth-component/scripts/main";
import { getScprofileUserInfo } from "@/utils/scprofile/account";
import sessionConfig from "../../_config/session.config";
import { addEventListenerByName } from "@/utils/eventHandler";

function useScProfileUser() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);
  const [user, setUser] = useState<scprofileUserType | null>(null);

  const getScProfileUserLoad = async () => {
    setIsLoading(true);

    let account_username;

    try {
      const response = await scratchAuthCheckSession({
        cookie_name: sessionConfig.account_cookie_name,
      });
      if (response.data) {
        account_username = response.data;
      } else {
        setError(response.error);
      }
    } catch (error) {
      deleteCookie(sessionConfig.account_cookie_name);
      setError(error);
    }

    if (account_username) {
      const response = await getScprofileUserInfo({
        scratch_username: account_username,
      });
      if (response.success && response.data) {
        setUser(response.data);
      } else {
        deleteCookie(sessionConfig.account_cookie_name);
        setError(error);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getScProfileUserLoad();

    const cleanup = addEventListenerByName("scprofile-update", () => {
      getScProfileUserLoad();
    });

    return () => {
      cleanup();
    };
  }, []);

  return { isLoading, error, user, getScProfileUserLoad };
}

export default useScProfileUser;
