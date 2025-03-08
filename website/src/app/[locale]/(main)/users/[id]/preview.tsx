"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { scprofileUserType } from "@/types/scprofile";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconLink } from "@tabler/icons-react";

function UserProfilePreview({ user }: { user: scprofileUserType }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full min-h-dvh sm:p-5">
      <div className="relative flex flex-col sm:flex-row container max-w-5xl w-full h-full sm:h-[calc(100dvh-100px)] pt-[200px] mx-auto sm:rounded-3xl sm:border-2 shadow-md overflow-auto">
        <div className="absolute -z-10 top-0 left-0 w-full h-[350px] bg-center bg-cover bg-[url(/wp-content/uploads/scratch-logo.png)]" />
        <div className="sm:absolute bg-neutral-900 w-[250px] h-full sm:h-[calc(100dvh-(300px+4px))] p-5 rounded-tr-[150px]">
          <div className="flex flex-col">
            <Avatar className="w-36 h-36 mx-auto mt-10 border">
              <AvatarImage src={user?.profile.images["90x90"]} />
              <AvatarFallback>{user?.display_name || "MY"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-3 w-full h-full sm:h-[calc(100dvh-(300px+4px+114px+110px))] pb-5 mt-5 overflow-auto">
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
                    <p>{item.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full h-full sm:h-[calc(100dvh-(300px+4px))] sm:ml-[250px]">
          <div className="bg-neutral-900 w-full h-full sm:h-[calc(100dvh-(300px+4px+46px+150px))] p-5 sm:mt-[150px] border-l border-t overflow-auto">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <h1 className="font-bold text-6xl">{user?.display_name}</h1>
                <span className="text-xl ml-1 mt-1 opacity-80">
                  @{user?.scratch_username}
                </span>
              </div>
              <div className="mt-5">
                <h1 className="font-bold text-2xl">概要</h1>
                <MarkdownPreview
                  className="!bg-neutral-900 mt-3"
                  source={user.about || undefined}
                />
              </div>
            </div>
          </div>
          <div className="bg-neutral-900 sm:bg-neutral-900/30 w-full h-[46px] p-3 border-l border-t">
            <div className="flex justify-center items-center">
              <span className="text-sm">Powered by ScProfile</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePreview;
