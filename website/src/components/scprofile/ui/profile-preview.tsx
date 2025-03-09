"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { IconCalendarTime, IconLink } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { scprofileUserType } from "@/types/scprofile";
import { useFormatter } from "next-intl";
import { useTheme } from "next-themes";
import { ClientOnly } from "@/components/ui/client-only";

export default function ScProfileProfilePreview({
  user,
}: {
  user?: scprofileUserType;
}) {
  const format = useFormatter();
  const { theme } = useTheme();

  if (!user) {
    return null;
  }

  return (
    <ClientOnly>
      <div className="relative flex flex-col sm:flex-row container max-w-5xl w-full h-full sm:h-[calc(100dvh-100px)] pt-[30vh] sm:pt-[200px] mx-auto sm:rounded-3xl sm:border-2 shadow-md overflow-y-auto">
        <div className="absolute -z-10 top-0 left-0 w-full h-[35vh] sm:h-[350px] bg-center bg-cover bg-[url(/wp-content/uploads/scratch-logo.png)]" />
        <div
          className={cn(
            "relative sm:absolute bg-neutral-100 dark:bg-neutral-900 w-full sm:w-[250px] h-full sm:h-[calc(100dvh-(300px+4px))] p-5 sm:rounded-tr-[150px]",
            "sm:after:hidden after:absolute after:-top-[50%] after:left-0 after:w-full after:h-[50%] after:bg-gradient-to-b after:from-transparent after:to-neutral-900"
          )}
        >
          <div className="flex flex-col">
            <Avatar className="w-36 h-36 mx-auto mt-10 border">
              <AvatarImage src={user?.profile.images["90x90"]} />
              <AvatarFallback>{user?.display_name || "My"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-3 w-full h-full sm:h-[calc(100dvh-(300px+4px+114px+110px))] pb-5 mt-5 overflow-y-auto">
              {user.status.map((item, index) => {
                if (item.type === "link") {
                  const isExternalLink =
                    item.value &&
                    (item.value.startsWith("http") ||
                      item.value.startsWith("www"));

                  return (
                    <div key={index} className="flex flex-col">
                      <Link
                        href={item.value}
                        target={isExternalLink ? "_blank" : "_self"}
                        rel={isExternalLink ? "noopener noreferrer" : ""}
                        className="flex items-center text-blue-500 hover:underline transition-all duration-300 ease-in-out"
                      >
                        <IconLink size={15} className="mr-1" />
                        {item.label}
                      </Link>
                    </div>
                  );
                }

                return (
                  <div key={index} className="flex flex-col">
                    <h2 className="font-bold text-xl">{item.label}</h2>
                    <p className="text-sm">{item.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full h-full sm:h-[calc(100dvh-(300px+4px))] sm:ml-[250px]">
          <div className="bg-neutral-100 dark:bg-neutral-900 w-full max-w-full h-full sm:h-[calc(100dvh-(300px+4px+46px+150px))] p-5 sm:mt-[150px] border-l border-t overflow-y-auto">
            <div className="flex flex-col gap-3">
              <div className="flex flex-row flex-wrap justify-between">
                <div className="flex flex-col">
                  <h1 className="font-bold text-6xl">{user?.display_name}</h1>
                  <span className="text-xl ml-1 mt-1 opacity-80">
                    @{user?.scratch_username}
                  </span>
                </div>
                <div className="flex flex-col justify-end mt-3 sm:mt-0">
                  <div className="flex items-center opacity-80">
                    <IconCalendarTime size={20} className="mr-1" />
                    <span className="text-sm">
                      {format.dateTime(new Date(user?.joined_at), {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <h1 className="font-bold text-2xl">概要</h1>
                <MarkdownPreview
                  className="bg-neutral-100! dark:bg-neutral-900! w-full mt-3"
                  source={user.about || undefined}
                  wrapperElement={{
                    "data-color-mode": theme as "light" | "dark",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="bg-neutral-100 dark:bg-neutral-900 sm:bg-neutral-100/30 dark:sm:bg-neutral-900/30 w-full h-[46px] p-3 border-l border-t">
            <div className="flex justify-center items-center">
              <span className="text-sm">Powered by ScProfile</span>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
