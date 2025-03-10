"use server";

import { getLocale } from "next-intl/server";
import MarkdownPreviewContent from "../../../components/ui/mdarkdownPreview";
import { loadContentFromFile } from "@/utils/loadContentFromFile";

const DIR = "terms-of-service";

export async function generateMetadata() {
  const locale = await getLocale();
  const { frontmatter } = await loadContentFromFile(DIR, locale);

  return {
    title: frontmatter?.title || "Markdown",
  };
}

export default async function MdxPageContent() {
  const locale = await getLocale();
  const { frontmatter, content } = await loadContentFromFile(DIR, locale);

  if (!frontmatter || !content) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container max-w-5xl mt-10 p-5 mx-auto">
        <MarkdownPreviewContent source={content} frontmatter={frontmatter} />
      </div>
    </div>
  );
}
