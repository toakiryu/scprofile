"use server";

import { redirect } from "next/navigation";
import { ScratchAuthComponent } from "./";
import type { ScratchAuthSessionType, ScratchUserType } from "./type";
import scratchAuthComponentConfig from "../../../../_config/scratch-auth-component.config";
import { ResultType } from "@/types/api";
import { deleteCookie, getCookie } from "./cookie";
import sessionConfig from "../../../../_config/session.config";

export async function scratchAuthSessionGetUserName(
  session: string
): Promise<ResultType<string>> {
  try {
    const result = await ScratchAuthComponent.action.getUserName(session);

    if (result.data) {
      return {
        success: true,
        data: result.data,
      };
    } else {
      return {
        success: false,
        message: result.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getSession(
  cookie_name?: string
): Promise<ResultType<string>> {
  const response = await getCookie(
    cookie_name || sessionConfig.account_cookie_name
  );
  if (response) {
    const res = await ScratchAuthComponent.action.getUserName(response.value);
    if (res.data) {
      return {
        success: true,
        data: response.value,
      };
    } else {
      await deleteCookie(sessionConfig.account_cookie_name);
      return {
        success: false,
        message: "Failed to retrieve session. Could not decrypt session.",
      };
    }
  } else {
    return {
      success: false,
      message: "Cookie does not exist.",
    };
  }
}

// セッションが存在するか確認
export async function scratchAuthCheckSession({
  cookie_name,
  session,
}: {
  cookie_name?: string;
  session?: string;
}): Promise<ResultType<ScratchAuthSessionType>> {
  if (!session) {
    const res = await getCookie(
      cookie_name || sessionConfig.account_cookie_name
    );
    session = res?.value;
  }
  if (session) {
    const res = await ScratchAuthComponent.action.getUserName(session);
    if (res.data) {
      return {
        success: true,
        data: res.data,
      };
    } else {
      await deleteCookie(sessionConfig.account_cookie_name);
      return {
        success: false,
        message: "Failed to retrieve session. Could not decrypt session.",
      };
    }
  } else {
    return {
      success: false,
      message: "Cookie does not exist.",
    };
  }
}

export const scratchAuthLogin = async (redirect_url?: string) => {
  const redirectLocation = btoa(
    redirect_url || scratchAuthComponentConfig.redirect_url
  );
  redirect(
    `https://auth.itinerary.eu.org/auth/?redirect=${redirectLocation}&name=${scratchAuthComponentConfig.title}`
  );
};

export const scratchUserInfo = async (
  username: string
): Promise<ResultType<ScratchUserType>> => {
  try {
    const fetchScratchUserInfo = await fetch(
      `http://api.scratch.mit.edu/users/${username}`
    );
    const fetchScratchUserInfoData = await fetchScratchUserInfo.json();
    return {
      success: true,
      data: fetchScratchUserInfoData,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        message: "Failed to fetch Scratch user info.",
        error: error.message,
      };
    } else {
      return {
        success: false,
        message: "Failed to fetch Scratch user info: Unknown error.",
      };
    }
  }
};

// セッションを設定
export async function setScratchAuthSession(
  privateCode: ScratchAuthSessionType
): Promise<
  ResultType<{
    name: string;
    value: string;
    options: {
      expires: Date;
      path: string;
    };
  }>
> {
  if (!privateCode) {
    return {
      success: false,
      message: "privateCode is required..",
    };
  }

  try {
    const res = await ScratchAuthComponent.action.verifyToken(privateCode);

    if (res.data) {
      if (!res.data.data?.username) {
        return {
          success: false,
          message: "Username missing from token response.",
        };
      }

      const save_cookie_data = await ScratchAuthComponent.action.encryptedData(
        sessionConfig.account_cookie_name,
        res.data.data.username,
        scratchAuthComponentConfig.expiration
      );

      return {
        success: true,
        data: save_cookie_data.data,
      };
    } else {
      return {
        success: false,
        message: "Invalid token response during session setup.",
      };
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        message: "Error during session setup.",
        error: error.message,
      };
    } else {
      return {
        success: false,
        message: "Error during session setup: Unknown error.",
      };
    }
  }
}
