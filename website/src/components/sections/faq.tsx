"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";

export default function SectionsFaq() {
  const t = useTranslations("sections.faq");

  return (
    <section id="faq">
      <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="mx-auto aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 dark:text-gray-100 sm:text-6xl">
            {t("title")}
          </h1>
          <Accordion
            type="single"
            collapsible
            className="w-full mt-10 text-left"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-bold text-xl">
                {t("faq.0.title")}
              </AccordionTrigger>
              <AccordionContent>{t("faq.0.content")}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-bold text-xl">
                {t("faq.1.title")}
              </AccordionTrigger>
              <AccordionContent>
                {t.rich("faq.1.content", {
                  em: (chunks) => <em>{chunks}</em>,
                })}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-bold text-xl">
                {t("faq.2.title")}
              </AccordionTrigger>
              <AccordionContent>
                {t.rich("faq.2.content", {
                  em: (chunks) => <em>{chunks}</em>,
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
