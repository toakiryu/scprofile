import type { MDXComponents } from "mdx/types";
import { Link } from "@/i18n/routing";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: ({ href, children, ...props }: any) => {
      // 外部リンクかどうかを判定
      const isExternalLink =
        href && (href.startsWith("http") || href.startsWith("www"));

      // 外部リンクなら target="_blank" と rel="noopener noreferrer" を設定
      if (isExternalLink) {
        return (
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          >
            {children}
          </Link>
        );
      }

      // 内部リンクは Next.js の Link コンポーネントでラップ
      return (
        <Link href={href as string} {...props}>
          {children}
        </Link>
      );
    },
  };
}
