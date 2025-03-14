import React from "react";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/routing";
import { getScprofileUserInfo } from "@/utils/scprofile/account";
import UserProfilePreview from "./preview";
import siteConfig from "../../../../../../_config/richtpl.config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  let user;
  const response = await getScprofileUserInfo({
    scratch_username: id,
  });
  if (response.success) {
    user = response.data;
  } else {
    console.error(response.message, response.error);
  }

  const locale = await getLocale();

  const title = `${user?.scratch_username}`;
  const openGraphTitle = `${user?.scratch_username} | ScProfile`;

  const description =
    user?.about ??
    "ScProfileでは、Scratchアカウントを使って自分のプロフィールを作成することができます。";

  if (user) {
    return {
      title: title,
      description: description,
      icons: {
        icon: user.profile.images["90x90"],
        apple: user.profile.images["90x90"],
      },
      authors: [
        {
          name: user.scratch_username,
          url: `https://scratch.mit.edu/users/${user.scratch_username}`,
        },
      ],
      creator: user.display_name,
      openGraph: {
        type: "profile",
        username: user.scratch_username,
        url: siteConfig.url,
        siteName: "ScProfile",
        title: openGraphTitle,
        description: description,
        images: user.profile.images["90x90"],
        locale:
          siteConfig.themeConfig?.metadata?.openGraph?.locale ??
          siteConfig.i18n.localeConfigs[locale].htmlLang ??
          "ja-JP",
      },
      twitter: {
        card: "summary",
        site: `@toakiryu`,
        title: openGraphTitle,
        description: description,
        creator: `@${user.scratch_username ?? "toakiryu"}`,
        images: user.profile.images["90x90"],
      },
    };
  }

  return {};
}

export default async function PagesUserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getLocale();

  let user;
  const response = await getScprofileUserInfo({
    scratch_username: id,
  });
  if (response.success) {
    user = response.data;
  } else {
    console.error(response.message, response.error);
  }

  if (!user) {
    redirect({
      href: "/",
      locale,
    });
    return;
  }

  return <UserProfilePreview user={user} analyticsEvent />;
}
