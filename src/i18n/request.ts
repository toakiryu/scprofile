import { AbstractIntlMessages } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import deepmerge from "deepmerge";
import { routing } from "./routing";
import siteConfig from "../../_config/richtpl.config";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !siteConfig.i18n.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const userMessages = (await import(`../../.translations/${locale}.json`))
    .default;
  const defaultMessages = (
    await import(`../../.translations/${siteConfig.i18n.defaultLocale}.json`)
  ).default;
  const messages = deepmerge(defaultMessages, userMessages);

  return {
    locale,
    messages: messages as AbstractIntlMessages,
  };
});
