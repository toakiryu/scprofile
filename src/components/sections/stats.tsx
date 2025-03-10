"use client";

import { useEffect, useState } from "react";
import { scprofileStatsType } from "@/types/scprofile";
import { getScProfileStats } from "@/utils/scprofile/account";

export default function Stats() {
  const [stats, setStats] = useState<scprofileStatsType | null>(null);

  useEffect(() => {
    const getStats = async () => {
      const response = await getScProfileStats();
      if (response.success) {
        setStats(response.data || null);
      } else {
        console.error(response.message, response.error);
      }
    };
    getStats();
  }, []);

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-center">
          {stats ? (
            <>
              <div className="flex max-w-xs flex-col gap-y-4 w-full p-3 mx-auto rounded-lg bg-neutral-100">
                <div className="text-base/7 text-gray-600 dark:text-gray-400">
                  ユーザー
                </div>
                <div className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
                  {stats.totalUsers}人
                </div>
              </div>
              <div className="flex max-w-xs flex-col gap-y-4 w-full p-3 mx-auto rounded-lg bg-neutral-100">
                <div className="text-base/7 text-gray-600 dark:text-gray-400">
                  プレミアムユーザー
                </div>
                <div className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
                  {stats.premiumUsers}人
                </div>
              </div>
              <div className="flex max-w-xs flex-col gap-y-4 w-full p-3 mx-auto rounded-lg bg-neutral-100">
                <div className="text-base/7 text-gray-600 dark:text-gray-400">
                  公開プロフィール
                </div>
                <div className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
                  {stats.publicProfiles}件
                </div>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">統計情報を取得中...</p>
          )}
        </div>
      </div>
    </div>
  );
}
