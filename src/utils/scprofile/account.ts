"use server";

import { getSession } from "@/components/scratch-auth-component/scripts/main";
import { ResultNotDataType, ResultType } from "@/types/api";
import { scprofileStatsType, scprofileUserType } from "@/types/scprofile";
import { cookies } from "next/headers";
import sessionConfig from "../../../_config/session.config";

type getScprofileUserInfoType = {
  user_id?: string;
  scratch_id?: string;
  scratch_username?: string;
};

export const getScprofileUserInfo = async ({
  user_id,
  scratch_id,
  scratch_username,
}: getScprofileUserInfoType): Promise<ResultType<scprofileUserType>> => {
  let searchParams;

  if (user_id) {
    searchParams = `user_id=${user_id}`;
  } else if (scratch_id) {
    searchParams = `scratch_id=${scratch_id}`;
  } else if (scratch_username) {
    searchParams = `scratch_username=${scratch_username}`;
  } else {
    return {
      success: false,
      message:
        "`user_id`, `scratch_id`, または `scratch_username` を指定してください。",
    };
  }

  try {
    const response = await fetch(
      `${process.env.BASE_URL}/api/account/users?${searchParams}`
    );
    const resData: ResultType<scprofileUserType> = await response.json();
    if (resData.success) {
      return {
        success: true,
        data: resData.data,
      };
    } else {
      return {
        success: false,
        message: resData.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "ユーザー情報の取得に失敗しました。",
      error: (error as Error).message,
    };
  }
};

export const postScprofileUserSignup = async ({
  scratch_username,
  display_name,
}: {
  scratch_username: string;
  display_name?: string;
}): Promise<ResultType<scprofileUserType>> => {
  let body = {};

  if (!scratch_username) {
    return {
      success: false,
      message: "`scratch_username` を指定してください。",
    };
  } else {
    body = {
      scratch_username: scratch_username,
      display_name: display_name || scratch_username,
    };
  }

  try {
    const response = await fetch(`${process.env.BASE_URL}/api/account/signup`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const resData: ResultNotDataType = await response.json();
    if (resData.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: resData.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "ユーザー情報の登録に失敗しました。",
      error: (error as Error).message,
    };
  }
};

export const postScprofileUserSignin = async ({
  session,
}: {
  session: string;
}): Promise<ResultType<boolean>> => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/account/signin`, {
      method: "POST",
      body: JSON.stringify({
        session: session,
      }),
    });
    const resData: ResultNotDataType = await response.json();
    if (resData.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: resData.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "ScProfileアカウントへのログインに失敗しました。",
      error: (error as Error).message,
    };
  }
};

export const postScprofileUserSignout = async (): Promise<
  ResultType<boolean>
> => {
  try {
    const cookieStore = await cookies();

    // セッション情報を削除
    cookieStore.delete(sessionConfig.account_cookie_name);

    return {
      success: true,
      message: "ログアウトに成功しました。",
    };
  } catch (error) {
    return {
      success: false,
      message: "ログアウトに失敗しました。",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const putScprofileUserUpdate = async ({
  updates,
}: {
  updates: { [key: string]: any };
}): Promise<ResultType<boolean>> => {
  try {
    // セッションを取得
    const session = await getSession();

    if (!session.success) {
      return {
        success: false,
        message: session.message,
        error: session.error,
      };
    }

    // APIリクエストを送信
    const response = await fetch(`${process.env.BASE_URL}/api/account/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session: session.data, // sessionのデータのみ渡す
        updates: updates,
      }),
    });

    const resData: ResultNotDataType = await response.json();

    if (resData.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: resData.message,
        error: resData.error,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "ScProfileアカウント情報の更新に失敗しました。",
      error: (error as Error).message,
    };
  }
};

export const deleteScprofileUserDelete = async (): Promise<
  ResultType<boolean>
> => {
  try {
    // セッションを取得
    const session = await getSession();

    if (!session.success) {
      return {
        success: false,
        message: session.message,
        error: session.error,
      };
    }

    // APIリクエストを送信
    const response = await fetch(`${process.env.BASE_URL}/api/account`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session: session.data, // sessionのデータのみ渡す
      }),
    });

    const resData: ResultNotDataType = await response.json();

    if (resData.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: resData.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "ScProfileアカウントの削除に失敗しました。",
      error: (error as Error).message,
    };
  }
};

export const getScProfileStats = async (): Promise<
  ResultType<scprofileStatsType>
> => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/scprofile/stats`);
    const data = await response.json();
    if (data.success) {
      return {
        success: true,
        data: data.data,
      };
    } else {
      return {
        success: false,
        message: data.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "統計情報の取得に失敗しました。",
      error: (error as Error).message,
    };
  }
};
