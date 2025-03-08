"use client";

import { useState, useTransition } from "react";
import { deleteCookie, setCookie } from "cookies-next/client";
import { useLocale, useTranslations } from "next-intl";
import { Link, Locale, routing, usePathname, useRouter } from "@/i18n/routing";
import useScProfileUser from "@/hooks/useScProfileUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { scratchAuthLogin } from "../../scratch-auth-component/scripts/main";
import sessionConfig from "../../../../_config/session.config";
import { ScProfileUserSettingModal } from "./user-setting-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { ClientOnly } from "@/components/ui/client-only";
import { Skeleton } from "@/components/ui/skeleton";
import { IconMoon, IconSun } from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import siteConfig from "../../../../_config/richtpl.config";
import { useParams } from "next/navigation";

function UserButton() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const locale = useLocale();

  const t = useTranslations("user-setting-modal");

  const { user } = useScProfileUser();
  const [userSettingModalOnOpen, setUserSettingModalOnOpen] =
    useState<boolean>(false);

  // テーマ切り替え
  const { theme, setTheme } = useTheme();
  const toggleColorMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // 言語切り替え
  const [isPending, startTransition] = useTransition();
  function onSelectChange(value: string) {
    const nextLocale = value as Locale;
    setCookie("NEXT_LOCALE", nextLocale);
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <div>
      {user && (
        <ScProfileUserSettingModal
          onOpen={userSettingModalOnOpen}
          onOpenChange={setUserSettingModalOnOpen}
          user={user}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="border rounded-full">
            <AvatarImage src={user?.profile.images["90x90"]} />
            <AvatarFallback>MY</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            {user?.display_name || "My Account"}
          </DropdownMenuLabel>
          {user && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href={`/users/${user.scratch_username}`}>
                  <DropdownMenuItem>{t("profile")}</DropdownMenuItem>
                </Link>
                <Link href="/profile/edit">
                  <DropdownMenuItem>{t("profile-edit")}</DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  onClick={() => setUserSettingModalOnOpen(true)}
                >
                  {t("setting")}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </>
          )}
          <DropdownMenuSeparator />
          {user ? (
            <DropdownMenuItem
              onClick={() => {
                deleteCookie(sessionConfig.account_cookie_name);
                window.location.reload();
              }}
            >
              {t("logout")}
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() => {
                scratchAuthLogin();
              }}
            >
              {t("login")}
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={toggleColorMode}
            className="border px-2 py-1 my-2"
          >
            <ClientOnly fallback={<Skeleton className="w-6 h-6" />}>
              <button
                aria-label="toggle color mode"
                className="flex justify-center items-center rounded-lg"
                suppressContentEditableWarning
                suppressHydrationWarning
              >
                {theme === "light" ? (
                  <>
                    <IconMoon className="mr-1" />
                    Dark
                  </>
                ) : (
                  <>
                    <IconSun className="mr-1" />
                    Light
                  </>
                )}
              </button>
            </ClientOnly>
          </DropdownMenuItem>
          <DropdownMenuItem className="border p-0 my-2">
            <Select
              disabled={isPending}
              defaultValue={locale}
              onValueChange={onSelectChange}
            >
              <SelectTrigger className="w-full h-full border-none px-2 py-1">
                <SelectValue placeholder="Select a Locale" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Language</SelectLabel>
                  {routing.locales.map((locale, index) => (
                    <SelectItem key={index} value={locale}>
                      {siteConfig.i18n.localeConfigs[locale].label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserButton;
