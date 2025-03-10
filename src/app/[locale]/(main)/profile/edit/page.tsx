"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { useFormatter } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { IconCalendarTime, IconLoader2 } from "@tabler/icons-react";
import { putScprofileUserUpdate } from "@/utils/scprofile/account";
import useScProfileUser from "@/hooks/useScProfileUser";
import { cn } from "@/lib/utils";
import {
  scprofileUserProfileStatusType,
  scprofileUserProfileType,
  scprofileUserType,
} from "@/types/scprofile";
import { scratchAuthLogin } from "@/components/scratch-auth-component/scripts/main";
import ScProfileProfilePreview from "@/components/scprofile/ui/profile-preview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

function ProfileEditPage() {
  const router = useRouter();
  const { user, isLoading: userLoading } = useScProfileUser();

  const format = useFormatter();

  const [newUser, setNewUser] = useState<scprofileUserType | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [about, setAbout] = useState<string | null>("");
  const [publicProfile, setPublicProfile] = useState<boolean>(true);
  const [status, setStatus] = useState<scprofileUserProfileStatusType[]>([
    { type: "text", label: "X(Twitter)", value: "@scratch" },
    { type: "link", label: "Website", value: "https://scratch.mit.edu/" },
  ]);

  useEffect(() => {
    if (userLoading === false) {
      if (user) {
        setAbout(user?.about);
        setStatus(user?.status);
        return;
      } else {
        scratchAuthLogin();
        return;
      }
    }
  }, [router, userLoading, user]);

  useEffect(() => {
    if (!user) return;
    const newUserData: scprofileUserType = {
      ...user,
      about: about,
      status: status,
      public_profile: publicProfile,
    };
    setNewUser(newUserData);
  }, [user, about, status, publicProfile]);

  const validate = (data: scprofileUserProfileType) => {
    if (data.about && data.about.length > 500) {
      return "概要は最大500文字です。";
    }
    if (!data.status) {
      return "Status is required.";
    }
    if (!Array.isArray(data.status)) {
      return "Status must be an array.";
    }
    for (const item of data.status) {
      if (!item.type || !["text", "link"].includes(item.type)) {
        return "Invalid status type.";
      }
      if (!item.label) {
        return "Status label is required.";
      }
      if (item.label.length > 50) {
        return "ステータスカードのラベルは最大50文字です。";
      }
      if (!item.value) {
        return "Status value is required.";
      }
      if (item.label.length > 50) {
        return "ステータスカードの値は最大50文字です。";
      }
    }
    return null;
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    setPublicProfile(true);
    const profileData: scprofileUserProfileType = {
      public_profile: publicProfile,
      status: status as scprofileUserProfileStatusType[],
      about: about,
    };
    const error = validate(profileData);
    if (error) {
      setError(error);
      toast.error(error);
      setIsLoading(false);
      return;
    }

    const response = await putScprofileUserUpdate({
      updates: {
        public_profile: publicProfile,
        status: status,
        about: about,
      },
    });
    if (response.success) {
      toast.success("変更内容を保存しました。");
    } else {
      console.error(response.message, response.error);
      toast.error("変更内容の保存に失敗しました。");
    }
    setIsLoading(false);
  };

  const handleStatusChange = (
    index: number,
    field: "type" | "label" | "value",
    value: string
  ) => {
    const newStatus = [...status];
    newStatus[index][field] = value as "text" | "link";
    setStatus(newStatus);
  };

  const handleStatusDelete = (index: number) => {
    const newStatus = status.filter((_, i) => i !== index);
    setStatus(newStatus);
  };

  const handleStatusAdd = () => {
    setStatus([...status, { type: "text", label: "", value: "" }]);
  };

  return (
    <div className="flex flex-col justify-start sm:justify-center items-center w-full h-full min-h-dvh sm:p-5">
      {user ? (
        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="grid w-full grid-cols-2 container max-w-5xl mx-auto mt-3 sm:mt-0">
            <TabsTrigger value="editor">編集</TabsTrigger>
            <TabsTrigger value="preview">プレビュー</TabsTrigger>
          </TabsList>
          <TabsContent value="editor">
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
                    <AvatarFallback>
                      {user?.display_name || "My"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-3 w-full h-full sm:h-[calc(100dvh-(300px+4px+114px+110px))] pb-5 mt-5 overflow-y-auto">
                    {status.map((item, index) => (
                      <Card
                        key={index}
                        className="flex flex-col gap-1 p-1 rounded-lg"
                      >
                        <Select
                          value={item.type} // valueに変更
                          onValueChange={(value) =>
                            handleStatusChange(index, "type", value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Type</SelectLabel>
                              <SelectItem value="text">Text</SelectItem>
                              <SelectItem value="link">Link</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <Input
                          type="text"
                          placeholder="Label"
                          value={item.label}
                          onChange={(e) =>
                            handleStatusChange(index, "label", e.target.value)
                          }
                        />
                        <Input
                          type="text"
                          placeholder="Value"
                          value={item.value}
                          onChange={(e) =>
                            handleStatusChange(index, "value", e.target.value)
                          }
                        />
                        <Button
                          variant="destructive"
                          className="text-white"
                          onClick={() => handleStatusDelete(index)}
                        >
                          削除
                        </Button>
                      </Card>
                    ))}
                    <Button onClick={handleStatusAdd}>追加</Button>
                  </div>
                </div>
              </div>
              <div className="w-full sm:max-w-[calc(100%-250px)] h-full sm:h-[calc(100dvh-(300px+4px))] sm:ml-[250px]">
                <div className="bg-neutral-100 dark:bg-neutral-900 w-full h-full sm:h-[calc(100dvh-(300px+4px+46px+150px))] p-5 sm:mt-[150px] border-l border-t overflow-y-auto">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-row flex-wrap justify-between">
                      <div className="flex flex-col">
                        <h1 className="font-bold text-6xl">
                          {user?.display_name}
                        </h1>
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
                      <MarkdownEditor
                        className="mt-3"
                        onChange={(e) => setAbout(e)}
                        value={about || undefined}
                        enableScroll
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
            <div className="container max-w-5xl p-5 mt-5 mx-auto">
              <Button
                className="w-full"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading && <IconLoader2 className="animate-spin" />}
                変更内容を保存する
              </Button>
              {error && <p className="text-sm text-red-500 mt-5">{error}</p>}
            </div>
          </TabsContent>
          <TabsContent value="preview">
            <ScProfileProfilePreview user={newUser} />
          </TabsContent>
        </Tabs>
      ) : (
        <ScProfileProfilePreview />
      )}
    </div>
  );
}

export default ProfileEditPage;
