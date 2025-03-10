import { Link } from "@/i18n/routing";
import React from "react";

function Banner() {
  return (
    <div className="group relative top-0 bg-indigo-600 py-3 text-white transition-all duration-300 md:py-0">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-12 px-3 mx-auto md:flex-row">
        <Link
          className="inline-flex text-xs leading-normal md:text-sm"
          href="https://pro.magicui.design"
          target="_blank"
        >
          ✨{"  "}
          <span className="ml-1 font-[580] dark:font-[550]">
            このプロジェクトは現在開発段階です。
          </span>{" "}
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
            className="lucide lucide-chevron-right ml-1 mt-[3px] hidden size-4 transition-all duration-300 ease-out group-hover:translate-x-1 lg:inline-block"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      </div>
      <hr className="absolute bottom-0 m-0 h-px w-full bg-border" />
    </div>
  );
}

export default Banner;
