"use server";

import { redirect } from "next/navigation";
import { ScratchAuthComponent, ScratchUserType } from "scratch-auth-component";
import type {
  ScratchAuthComponentResult,
  ScratchAuthSessionType,
} from "./index";
import { deleteCookie, getCookie } from "./cookie";
import scratchAuthComponentConfig from "../../../../_config/scratch-auth-component.config";

// セッションが存在するか確認
export async function scratchAuthCheckSession(): Promise<
  ScratchAuthComponentResult<ScratchAuthSessionType>
> {
  const session = await getCookie(scratchAuthComponentConfig.cookie_name);
  if (session) {
    const res = await ScratchAuthComponent.action.getUserName(session.value);
    if (res.status && res.body) {
      return {
        status: true,
        message: "Session successfully retrieved.",
        body: res.body,
      };
    } else {
      await deleteCookie(scratchAuthComponentConfig.cookie_name);
      return {
        status: false,
        message: "Failed to retrieve session.",
        error: "Could not decrypt session.",
        body: null,
      };
    }
  } else {
    return {
      status: false,
      message: "Cookie does not exist",
      body: null,
    };
  }
}

// セッションを設定
export async function setScratchAuthSession(
  privateCode: ScratchAuthSessionType
): Promise<
  ScratchAuthComponentResult<{
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
      status: false,
      message: "privateCode is required.",
      body: null,
    };
  }

  try {
    const res = await ScratchAuthComponent.action.verifyToken(privateCode);

    if (res.body) {
      if (!res.body.data?.username) {
        return {
          status: false,
          message: "Username missing from token response.",
          body: null,
        };
      }

      const save_cookie_data = await ScratchAuthComponent.action.encryptedData(
        scratchAuthComponentConfig.cookie_name,
        res.body.data.username,
        scratchAuthComponentConfig.expiration
      );

      return {
        status: true,
        message: "Invalid token response during session setup.",
        body: save_cookie_data.body,
      };
    } else {
      return {
        status: false,
        message: "Invalid token response during session setup.",
        body: null,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `${error}`,
      body: null,
    };
  }
}

export const scratchAuthLogin = async (redirect_url?: string) => {
  const session = await scratchAuthCheckSession();
  if (session.status) {
    return false;
  }
  const redirectLocation = btoa(
    redirect_url || scratchAuthComponentConfig.redirect_url
  );
  redirect(
    `https://auth.itinerary.eu.org/auth/?redirect=${redirectLocation}&name=${scratchAuthComponentConfig.title}`
  );
};

export const scratchUserInfo = async (
  username: string
): Promise<ScratchAuthComponentResult<ScratchUserType>> => {
  try {
    const fetchScratchUserInfo = await fetch(
      `http://api.scratch.mit.edu/users/${username}`
    );
    const fetchScratchUserInfoData = await fetchScratchUserInfo.json();
    return {
      status: true,
      message: "",
      body: fetchScratchUserInfoData,
    };
  } catch (error) {
    return {
      status: false,
      message: "",
      error: error,
      body: null,
    };
  }
};
