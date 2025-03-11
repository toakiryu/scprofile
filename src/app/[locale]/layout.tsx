import type { Metadata } from "next";
import "./globals.css";
import "../../css/wmde-markdown.css";
import "../../css/githubMarkdown.css";

// config
import config from "../../../_config/richtpl.config";

// next-intl (i18n)
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

import { Toaster } from "sonner";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import localFont from "next/font/local";
import {
  Geist,
  Geist_Mono,
  Dela_Gothic_One,
  M_PLUS_Rounded_1c,
} from "next/font/google";
import "yakuhanjp";

import LoadingOverlay from "@/components/LoadingOverlay";
import Header from "@/components/header";
import Banner from "@/components/banner";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// https://fonts.google.com/specimen/Dela+Gothic+One
const delaGothicOne = Dela_Gothic_One({
  variable: "--font-dela-gothic-one",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// https://fonts.google.com/specimen/M+PLUS+Rounded+1c
const mPlusRounded1c = M_PLUS_Rounded_1c({
  variable: "--font-m-plus-rounded-1c",
  weight: ["100", "300", "400", "500", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const IBM_Plex_Sans_JP = localFont({
  variable: "--font-ibm-plex-sans-jp",
  src: [
    {
      path: "../../../public/wp-content/fonts/IBMPlexSansJP-Thin.ttf",
      weight: "100",
      style: "thin",
    },
    {
      path: "../../../public/wp-content/fonts/IBMPlexSansJP-ExtraLight.ttf",
      weight: "200",
      style: "extralight",
    },
    {
      path: "../../../public/wp-content/fonts/IBMPlexSansJP-Light.ttf",
      weight: "300",
      style: "light",
    },
    {
      path: "../../../public/wp-content/fonts/IBMPlexSansJP-Normal.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/wp-content/fonts/IBMPlexSansJP-Medium.ttf",
      weight: "500",
      style: "medium",
    },
    {
      path: "../../../public/wp-content/fonts/IBMPlexSansJP-SemiBold.ttf",
      weight: "600",
      style: "semibold",
    },
    {
      path: "../../../public/wp-content/fonts/IBMPlexSansJP-Bold.ttf",
      weight: "700",
      style: "bold",
    },
  ],
  display: "swap",
});

const Helvetica_Neue = localFont({
  variable: "--font-helvetica-neue",
  src: [
    {
      path: "../../../public/wp-content/fonts/HelveticaNeue-UltraLight.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../../public/wp-content/fonts/HelveticaNeue-UltraLightItalic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../../public/wp-content/fonts/HelveticaNeue-Thin.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../../public/wp-content/fonts/HelveticaNeue-ThinItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../../public/wp-content/fonts/HelveticaNeue-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/wp-content/fonts/HelveticaNeue-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../../public/wp-content/fonts/HelveticaNeue-Roman.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/wp-content/fonts/HelveticaNeue-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../public/wp-content/fonts/HelveticaNeue-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/wp-content/fonts/HelveticaNeue-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../../public/wp-content/fonts/HelveticaNeue-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/wp-content/fonts/HelveticaNeue-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../../public/wp-content/fonts/HelveticaNeue-Heavy.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../../public/wp-content/fonts/HelveticaNeue-HeavyItalic.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../../../public/wp-content/fonts/HelveticaNeue-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../../public/wp-content/fonts/HelveticaNeue-BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const header = await headers();
  const pathname = header.get("x-pathname");
  const path = pathname ? pathname : "";

  const generateAlternates = () => {
    const alternates: {
      canonical: string;
      languages: { [key: string]: string };
    } = {
      canonical: `${config.url}${path}`,
      languages: {},
    };

    for (const locale of config.i18n.locales) {
      const localeConfig = config.i18n.localeConfigs[locale];
      const cleanPath = path.replace(`/${locale}`, ""); // Remove current locale from path
      alternates.languages[
        localeConfig.htmlLang
      ] = `${config.url}/${localeConfig.path}${cleanPath}`;
    }

    return alternates;
  };

  // titleの値を判別
  const titleData = config.themeConfig?.metadata?.title;
  let title: string;
  if (t.has(`title.template`)) {
    title = t(`title.template`);
  } else if (typeof titleData === "string") {
    title = titleData;
  } else if (titleData && "default" in titleData) {
    title = titleData.default;
  } else if (titleData && "absolute" in titleData) {
    title = titleData.absolute;
  } else {
    title = config.title;
  }

  const description =
    (t.has(`description`) && t(`description`)) ||
    config.themeConfig.metadata?.description ||
    config.description;

  return {
    title: {
      template: `%s | ${
        (t.has(`title.template`) && t(`title.template`)) ?? config.title
      }`,
      default: `${
        (t.has(`title.default`) && t(`title.default`)) ?? config.title
      }`,
    },
    description: description,
    referrer: "origin-when-cross-origin",
    keywords: ["Vercel", "Next.js"],
    authors: [{ name: "Toa Kiryu", url: "https://toakiryu.com" }],
    creator: "Toa Kiryu",
    icons: config.favicon ?? "/favicon.ico",
    generator: "Next.js",
    publisher: "Vercel",
    robots: "follow, index",
    metadataBase:
      config.themeConfig?.metadata?.metadataBase ?? new URL(config.url),
    alternates: generateAlternates(),
    openGraph: {
      type: "website",
      url: config.url,
      siteName: title,
      title: title,
      description: description,
      images:
        config.themeConfig.metadata?.openGraph?.images ??
        config.themeConfig.image,
      locale:
        config.themeConfig?.metadata?.openGraph?.locale ??
        config.i18n.localeConfigs[locale].htmlLang ??
        "ja-JP",
    },
    twitter: {
      card: "summary_large_image",
      site: `@${config.themeConfig?.metadata?.creator ?? "toakiryu"}`,
      title: title,
      description: description,
      creator: `@${config.themeConfig?.metadata?.creator ?? "toakiryu"}`,
      images:
        config.themeConfig.metadata?.twitter?.images ??
        config.themeConfig.image,
    },
    ...config.themeConfig?.metadata,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const GA_ID = process.env.GA_ID || "";
  return (
    <html lang={locale} suppressHydrationWarning>
      <GoogleTagManager gtmId={GA_ID} />
      <GoogleAnalytics gaId={GA_ID} />
      <body
        className={cn(
          "relative w-full h-full overflow-x-clip font-main antialiased scroll-smooth",
          `${geistSans.variable} ${geistMono.variable} ${delaGothicOne.variable} ${mPlusRounded1c.variable} ${IBM_Plex_Sans_JP.variable} ${Helvetica_Neue.variable}`
        )}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          disableTransitionOnChange
          defaultTheme={config.themeConfig.colorMode.defaultMode}
          {...config.themeConfig.colorMode.custom}
        >
          <NextIntlClientProvider messages={messages}>
            <LoadingOverlay />
            <Banner />
            <Header />
            <main className="relative w-full h-full">{children}</main>
            <Footer />
            <Toaster richColors />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
