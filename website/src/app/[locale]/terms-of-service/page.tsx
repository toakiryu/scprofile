import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

export default async function MdxPageContent() {
  const locale = await getLocale();

  async function GetContent() {
    try {
      const Content = (await import(`./_${locale}.mdx`)).default;
      return <Content />;
    } catch (error) {
      console.warn(error);
      try {
        const Content = (await import(`./_${routing.defaultLocale}.mdx`))
          .default;
        return <Content />;
      } catch (error) {
        console.error(error);
        notFound();
      }
    }
  }

  return (
    <div>
      <div className="container max-w-5xl mt-10 p-5 mx-auto">
        <div className="markdown-body">
          <GetContent />
        </div>
      </div>
    </div>
  );
}
