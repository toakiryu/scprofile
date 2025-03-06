import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import React from "react";
import siteConfig from "../../../../../../_config/richtpl.config";

export async function generateMetadata(props: {
  params: {
    id: string;
  };
}): Promise<Metadata> {
  const { id } = await props.params;

  const locale = await getLocale();

  const title = "";
  const openGraphTitle = `Users | ScProfile`;

  const description = "";

  return {
    title: title,
    description: description,
    authors: [
      { name: quizGroupInfo.authors.name, url: quizGroupInfo.authors.url },
    ],
    creator: quizGroupInfo.authors.name,
    openGraph: {
      type: "profile",
      url: siteConfig.url,
      siteName: "VEPQ",
      title: openGraphTitle,
      description: description,
      images:
        siteConfig.themeConfig.metadata?.openGraph?.images ??
        siteConfig.themeConfig.image,
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
      creator: `@${quizGroupInfo.authors.twitter ?? "toakiryu"}`,
      images:
        siteConfig.themeConfig.metadata?.twitter?.images ??
        siteConfig.themeConfig.image,
    },
  };
}

async function PagesUserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  console.log("> Request User ID:", id);
  return <div>PagesUserProfile</div>;
}

export default PagesUserProfile;
