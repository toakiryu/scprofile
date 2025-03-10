import React from "react";
import { Link } from "@/i18n/routing";
import {
  Icon,
  IconBrandGithubFilled,
  IconBrandXFilled,
  IconProps,
  IconWorld,
} from "@tabler/icons-react";

type LinkType = {
  label: string;
  href: string;
  icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
};

type LinksType = {
  label: string;
  links: LinkType[];
};

const LinkGroup: LinksType[] = [
  {
    label: "Scratch",
    links: [
      {
        label: "Scratchについて",
        href: "https://scratch.mit.edu/about",
      },
      {
        label: "保護者の方へ",
        href: "https://scratch.mit.edu/parents/",
      },
      {
        label: "教育関係者の方へ",
        href: "https://scratch.mit.edu/educators",
      },
      {
        label: "開発者向け",
        href: "https://scratch.mit.edu/developers",
      },
      {
        label: "私たちのチーム",
        href: "https://scratch.mit.edu/credits",
      },
      {
        label: "寄付者",
        href: "https://scratchfoundation.org/supporters",
      },
      {
        label: "求人",
        href: "https://www.scratchfoundation.org/careers",
      },
      {
        label: "寄付",
        href: "https://www.scratchfoundation.org/donate",
      },
    ],
  },
  {
    label: "コミュニティ",
    links: [
      {
        label: "コミュニティーガイドライン",
        href: "https://scratch.mit.edu/community_guidelines",
      },
      {
        label: "ディスカッションフォーラム",
        href: "https://scratch.mit.edu/discuss",
      },
      {
        label: "Scratch Wiki",
        href: "https://ja.scratch-wiki.info",
      },
      {
        label: "統計情報",
        href: "https://scratch.mit.edu/statistics",
      },
    ],
  },
  {
    label: "関連サイト",
    links: [
      {
        label: "ScratchEd",
        href: "http://scratched.gse.harvard.edu",
      },
      {
        label: "ScratchJr",
        href: "https://www.scratchjr.org",
      },
      {
        label: "Scratch Day",
        href: "http://day.scratch.mit.edu",
      },
      {
        label: "Scratchカンファレンス",
        href: "https://www.scratchfoundation.org/scratch-conference",
      },
      {
        label: "Scratch財団",
        href: "http://www.scratchfoundation.org",
      },
      {
        label: "Scratchストア",
        href: "https://scratch.mit.edu/store",
      },
    ],
  },
  {
    label: "Developer",
    links: [
      {
        label: "Website",
        href: "https://l.toakiryu.com/website",
        icon: IconWorld,
      },
      {
        label: "GitHub",
        href: "https://l.toakiryu.com/github",
        icon: IconBrandGithubFilled,
      },
      {
        label: "Twitter",
        href: "https://l.toakiryu.com/x",
        icon: IconBrandXFilled,
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer>
      <hr className="mt-10" />
      <div className="container max-w-6xl mx-auto sm:px-10 px-5 pt-10 pb-0">
        <Link href="/" className="relative mr-6 flex items-center space-x-2">
          {/* <img
            alt="logo"
            src="/wp-content/logo/icon_256x256.png"
            width={30}
            height={30}
          /> */}
          <span className="font-bold text-xl">ScProfile</span>
        </Link>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 mt-8">
          {LinkGroup.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-5">
              <h2 className="font-semibold">{group.label}</h2>
              <ul>
                {group.links.map((link, linkIndex) => {
                  // 外部リンクかどうかを判定
                  const isExternalLink =
                    link.href &&
                    (link.href.startsWith("http") ||
                      link.href.startsWith("www"));

                  return (
                    <li key={linkIndex} className="my-2">
                      <Link
                        title={link.label}
                        href={link.href}
                        className="group inline-flex cursor-pointer items-center justify-start gap-1 text-muted-foreground duration-200 hover:text-foreground hover:opacity-90"
                        target={isExternalLink ? "_blank" : "_self"}
                        rel={isExternalLink ? "noopener noreferrer" : ""}
                      >
                        {link.icon && <link.icon size={20} />}
                        {link.label}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-chevron-right h-4 w-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto border-t py-2 grid md:grid-cols-2 h-full justify-between w-full grid-cols-1 gap-1">
          <span className="text-sm tracking-tight text-foreground">
            Copyright © {/* */}2025{/* */}{" "}
            <Link className="cursor-pointer" href="/">
              ScProfile
            </Link>{" "}
            {/* */}- {/* */}Toa Kiryu
          </span>
          <ul className="flex justify-start md:justify-end text-sm tracking-tight text-foreground">
            <li className="mr-3 md:mx-4">
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li className="mr-3 md:mx-4">
              <Link href="/terms-of-service">Terms of Service</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
