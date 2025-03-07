"use client";

import { useEffect, useState } from "react";
import { deleteCookie } from "cookies-next/client";
import { scprofileUserType } from "@/types/scprofile";
import { scratchAuthCheckSession } from "@/components/scratch-auth-component/scripts/main";
import sessionConfig from "../../_config/session.config";

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
      try {
        const get_userInfo_res = await fetch(
          `/en/api/account/users?scratch_username=${account_username}`
        );
        const get_userInfo = await get_userInfo_res.json();
        if (get_userInfo.success) {
          setUser(get_userInfo.data);
        } else {
          setError(get_userInfo.error);
        }
      } catch (error) {
        deleteCookie(sessionConfig.account_cookie_name);
        setError(error);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getScProfileUserLoad();
  }, []);

  return { isLoading, error, user, getScProfileUserLoad };
}

export default useScProfileUser;
