import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import config from "../../_config/richtpl.config";
import siteConfig from "../../_config/richtpl.config";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: config.i18n.locales,

  // Used when no locale matches
  defaultLocale: config.i18n.defaultLocale,

  localePrefix: siteConfig.i18n.localePrefix,

  // pathnames: {
  //   "/account/auth": {
  //     ja: "/account/auth",
  //     en: "/en/account/auth",
  //   },
  // },
});

export type Locale = (typeof routing.locales)[number];
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
