"use client";

import MarkdownPreview from "@uiw/react-markdown-preview";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { ClientOnly } from "@/components/ui/client-only";
import { useFormatter } from "next-intl";
import { IconCalendarCheck } from "@tabler/icons-react";
import { FrontmatterType } from "@/utils/loadContentFromFile";

export default function MarkdownPreviewContent({
  className,
  source,
  headerContent,
  frontmatter,
}: {
  className?: string;
  source?: string | undefined;
  frontmatter: FrontmatterType;
  headerContent?: React.ReactNode;
}) {
  const format = useFormatter();
  const { theme } = useTheme();

  return (
    <ClientOnly>
      {headerContent && headerContent}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-10">
        <h1 className="font-bold text-3xl">{frontmatter.title}</h1>
        <div className="flex items-center">
          <IconCalendarCheck size={20} className="mr-1" />
          {format.dateTime(new Date(frontmatter.date), {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>
      <MarkdownPreview
        className={cn("bg-transparent!", className)}
        source={source || undefined}
        wrapperElement={{
          "data-color-mode": theme as "light" | "dark",
        }}
      />
    </ClientOnly>
  );
}
