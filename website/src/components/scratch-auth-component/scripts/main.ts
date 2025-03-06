"use server";

import { redirect } from "next/navigation";
import { ScratchAuthComponent, ScratchUserType } from "scratch-auth-component";
import type {
  ScratchAuthComponentResult,
  ScratchAuthSessionType,
} from "./index";
import { deleteCookie, getCookie } from "./cookie";
import scratchAuthComponentConfig from "../../../../_config/scratch-auth-component.config";

export async function scratchAuthSessionGetUserName(session: string) {
  return await ScratchAuthComponent.action.getUserName(session);
}

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
      throw new Error("Failed to retrieve session. Could not decrypt session.");
    }
  } else {
    throw new Error("Cookie does not exist");
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
): Promise<ScratchAuthComponentResult<ScratchUserType>> => {
  try {
    const fetchScratchUserInfo = await fetch(
      `http://api.scratch.mit.edu/users/${username}`
    );
    const fetchScratchUserInfoData = await fetchScratchUserInfo.json();
    return {
      status: true,
      message: "ok",
      body: fetchScratchUserInfoData,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch Scratch user info: ${error.message}`);
    } else {
      throw new Error("Failed to fetch Scratch user info: Unknown error");
    }
  }
};

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
    throw new Error("privateCode is required.");
  }

  try {
    const res = await ScratchAuthComponent.action.verifyToken(privateCode);

    if (res.body) {
      if (!res.body.data?.username) {
        throw new Error("Username missing from token response.");
      }

      const save_cookie_data = await ScratchAuthComponent.action.encryptedData(
        scratchAuthComponentConfig.cookie_name,
        res.body.data.username,
        scratchAuthComponentConfig.expiration
      );

      return {
        status: true,
        message: "Session setup successful.",
        body: save_cookie_data.body,
      };
    } else {
      throw new Error("Invalid token response during session setup.");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error during session setup: ${error.message}`);
    } else {
      throw new Error("Error during session setup: Unknown error");
    }
  }
}
