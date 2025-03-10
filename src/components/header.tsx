import { Link } from "@/i18n/routing";
import React from "react";
import UserButton from "./scprofile/ui/user-button";
import { IconBrandGithub, IconBrandX } from "@tabler/icons-react";

function Header() {
  return (
    <header className="supports-backdrop-blur:bg-background/90 sticky top-0 z-50 w-full border-b border-border bg-background/40 backdrop-blur-lg left-0 transition-all duration-500 ease-in-out select-none shadow-md">
      <div className="container flex h-16 mx-auto items-center">
        <div className="flex mr-4">
          <Link href="/" className="relative mr-6 flex items-center">
            {/* <img
              title="logo"
              alt="logo"
              src="/wp-content/logo/icon_256x256.png"
              width={30}
              height={30}
            /> */}
            <span className="inline-block font-bold ml-2">ScProfile</span>
            <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 ml-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
              Beta
            </div>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between gap-2 md:justify-end pr-3 md:pr-0">
          <nav className="flex items-center gap-1">
            <Link
              target="_blank"
              rel="noreferrer"
              href="https://l.toakiryu.com/github"
            >
              <div className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0">
                <IconBrandGithub size={20} />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              target="_blank"
              rel="noreferrer"
              href="https://l.toakiryu.com/x"
            >
              <div className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0">
                <IconBrandX size={20} />
                <span className="sr-only">X(Twitter)</span>
              </div>
            </Link>
          </nav>
          <UserButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
