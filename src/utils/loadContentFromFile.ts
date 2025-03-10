import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

// キャッシュ用のグローバル変数
const cache: Record<
  string,
  { frontmatter: FrontmatterType; content: string; timestamp: number }
> = {};
const CACHE_EXPIRATION = 1000 * 60 * 60 * 24;

export interface FrontmatterType {
  title: string;
  date: string;
}

export async function loadContentFromFile(DIR: string, locale: string) {
  const cacheKey = `${DIR}-${locale}`;
  const currentTimestamp = Date.now();

  // キャッシュが存在し、キャッシュが有効ならばキャッシュを返す
  if (
    cache[cacheKey] &&
    currentTimestamp - cache[cacheKey].timestamp < CACHE_EXPIRATION
  ) {
    console.log("キャッシュを使用");
    return cache[cacheKey];
  }

  // キャッシュがない、もしくはキャッシュが無効ならばファイルを読み込む
  let frontmatter: FrontmatterType | null = null;
  let content: string | null = null;

  try {
    // ローカライズされたコンテンツを最初に試す
    const filePath = path.join(process.cwd(), `_content/${DIR}/${locale}.md`);
    const fileContent = await fs.readFile(filePath, "utf-8");

    // gray-matterを使用してfrontmatterとコンテンツを分離
    const { content: mdxContent, data } = matter(fileContent);
    frontmatter = data as FrontmatterType;
    content = mdxContent;

    // キャッシュに保存
    cache[cacheKey] = { frontmatter, content, timestamp: currentTimestamp };
  } catch (error) {
    console.warn(error);
    try {
      // デフォルトロケールのコンテンツにフォールバック
      const filePath = path.join(
        process.cwd(),
        `_content/${DIR}/${routing.defaultLocale}.md`
      );
      const fileContent = await fs.readFile(filePath, "utf-8");

      // gray-matterを使用してfrontmatterとコンテンツを分離
      const { content: mdxContent, data } = matter(fileContent);
      frontmatter = data as FrontmatterType;
      content = mdxContent;

      // キャッシュに保存
      cache[cacheKey] = { frontmatter, content, timestamp: currentTimestamp };
    } catch (error) {
      console.error(error);
      notFound();
    }
  }

  return { frontmatter, content };
}
