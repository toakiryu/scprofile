"use client";

import { IconCheck } from "@tabler/icons-react";
import { useTranslations } from "next-intl"; // ローカリゼーションのためにnext-intlを使用

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function SectionsPricing() {
  const t = useTranslations("sections.pricing");

  const tiers = [
    {
      name: t("tiers.hobby.name"),
      id: "tier-hobby",
      href: "#",
      priceMonthly: t("tiers.hobby.priceMonthly"),
      description: t("tiers.hobby.description"),
      features: [
        t("tiers.hobby.features.0"),
        t("tiers.hobby.features.1"),
        t("tiers.hobby.features.2"),
        t("tiers.hobby.features.3"),
      ],
      featured: false,
    },
    {
      name: t("tiers.pro.name"),
      id: "tier-pro",
      href: "#",
      priceMonthly: t("tiers.pro.priceMonthly"),
      description: t("tiers.pro.description"),
      features: [
        t("tiers.pro.features.0"),
        t("tiers.pro.features.1"),
        t("tiers.pro.features.2"),
        t("tiers.pro.features.3"),
        t("tiers.pro.features.4"),
        t("tiers.pro.features.5"),
      ],
      featured: true,
    },
  ];

  return (
    <section id="pricing">
      <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="mx-auto aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
            {t("title")}
          </h2>
          <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 dark:text-gray-100 sm:text-6xl">
            {t("description")}
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 dark:text-gray-400 sm:text-xl/8">
          {t("cta")}
        </p>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={classNames(
                tier.featured
                  ? "relative bg-gray-900 shadow-2xl"
                  : "bg-white/60 sm:mx-8 lg:mx-0",
                tier.featured
                  ? ""
                  : tierIdx === 0
                  ? "rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl"
                  : "sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none",
                "rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10"
              )}
            >
              <h3
                id={tier.id}
                className={classNames(
                  tier.featured ? "text-indigo-400" : "text-indigo-600",
                  "text-base/7 font-semibold"
                )}
              >
                {tier.name}
              </h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span
                  className={classNames(
                    tier.featured ? "text-white" : "text-gray-900",
                    "text-5xl font-semibold tracking-tight"
                  )}
                >
                  {tier.priceMonthly}
                </span>
                <span
                  className={classNames(
                    tier.featured ? "text-gray-400" : "text-gray-500",
                    "text-base"
                  )}
                >
                  /month
                </span>
              </p>
              <p
                className={classNames(
                  tier.featured ? "text-gray-300" : "text-gray-600",
                  "mt-6 text-base/7"
                )}
              >
                {tier.description}
              </p>
              <ul
                role="list"
                className={classNames(
                  tier.featured ? "text-gray-300" : "text-gray-600",
                  "mt-8 space-y-3 text-sm/6 sm:mt-10"
                )}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <IconCheck
                      aria-hidden="true"
                      className={classNames(
                        tier.featured ? "text-indigo-400" : "text-indigo-600",
                        "h-6 w-5 flex-none"
                      )}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.featured
                    ? "bg-indigo-500 text-white shadow-xs hover:bg-indigo-400 dark:hover:bg-indigo-600 focus-visible:outline-indigo-500"
                    : "text-indigo-600 ring-1 ring-indigo-200 dark:ring-indigo-800 ring-inset hover:ring-indigo-300 dark:hover:ring-indigo-700 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-400",
                  "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10"
                )}
              >
                {t("cta")}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
