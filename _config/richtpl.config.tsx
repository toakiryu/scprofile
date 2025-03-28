import siteConfigType from "@/types/richtpl.config";

/**
 * Site configuration object.
 * Contains general site information, i18n settings, and theme configuration.
 */
const siteConfig: siteConfigType = {
  // Tagline for the site
  tagline: "Next.js Template",

  // URL to the favicon
  favicon: "/favicon.ico",

  // Production URL of the site
  url: "https://scprofile.toakiryu.com",

  // Base URL pathname (for GitHub Pages deployment)
  baseUrl: "/",

  title: "scprofile",

  // GitHub deployment configuration
  organizationName: "toakiryu", // GitHub organization/user name
  projectName: "scprofile", // GitHub repository name

  // Internationalization (i18n) configuration
  i18n: {
    // Default locale for the site
    defaultLocale: "ja",
    // List of supported locales
    locales: ["ja", "en"],
    // Locale-specific configurations
    localeConfigs: {
      ja: {
        label: "日本語", // Label for the Japanese locale
        htmlLang: "ja-JP", // HTML language attribute for Japanese
        path: "ja", // Path prefix for Japanese locale
      },
      en: {
        label: "English", // Label for the English locale
        htmlLang: "en-US", // HTML language attribute for English
        path: "en", // Path prefix for English locale
      },
    },
    selectButton: true, // Option to include a locale selection button
    localePrefix: "as-needed",
  },

  // Theme and layout configuration
  themeConfig: {
    // Color mode settings
    colorMode: {
      defaultMode: "system", // Default color mode (light, dark, or system)
      selectSwitch: true, // Whether to allow switching color modes
    },
    // URL to the social card image (replace with your project's image)
    image: "/wp-content/brand/scratch/icon-256x256.png",
    // Metadata for the site
    metadata: {
      authors: { name: "toakiryu", url: "https://toakiryu.com" },
      creator: "toakiryu",
      icons: {
        icon: "/wp-content/brand/scratch/icon-256x256.ico",
        apple: "/wp-content/brand/scratch/icon-256x256.png",
      },
      generator: "Next.js",
      publisher: "Vercel",
      robots: "follow, index",
      metadataBase: new URL("https://scprofile.toakiryu.com"),
    },
    // Sitemap Configuration
    sitemap: {
      excludedDirs: [
        "error", // Directory for error pages
        "not-found", // Directory for 404 pages
        "[...rest]", // Directory for [...rest] pages
      ],
    },
  },
};

export default siteConfig;
