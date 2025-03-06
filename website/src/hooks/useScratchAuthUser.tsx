"use client";

import { useEffect, useState } from "react";
import {
  scratchAuthCheckSession,
  scratchUserInfo,
} from "@/components/scratch-auth-component/scripts/main";
import { ScratchUserType } from "scratch-auth-component";

function useScratchAuthUser() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<unknown | null>(null);
  const [user, setUser] = useState<ScratchUserType | null>(null);

  const scratchAuthUserLoad = async () => {
    setIsLoading(true);
    try {
      const res = await scratchAuthCheckSession();
      if (res.status && res.body) {
        const fetchUserInfo = await scratchUserInfo(res.body);
        if (fetchUserInfo && fetchUserInfo.body) {
          setUser(fetchUserInfo.body);
        } else {
          setMessage(res.message);
          setError(res.error);
        }
      } else {
        setMessage(res.message);
        setError(res.error);
      }
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    scratchAuthUserLoad();
  }, []);

  return { isLoading, message, error, user, scratchAuthUserLoad };
}

export default useScratchAuthUser;
