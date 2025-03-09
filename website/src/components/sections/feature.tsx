import React from "react";
import { IconBrush, IconCloudUpload, IconServer } from "@tabler/icons-react";

export default function SectionsFeature() {
  const features = [
    {
      name: "Scratch アカウントで簡単登録",
      description:
        "ScProfile は Scratch のアカウントと連携するだけでプロフィールページを作成できます。新たにアカウントを作成する必要はありません。",
      icon: IconCloudUpload,
    },
    {
      name: "自由にカスタマイズ",
      description:
        "プロフィールのデザインや背景を変更し、自分だけの個性的なページを作成できます。将来的にはさらに多くのカスタマイズオプションを追加予定。",
      icon: IconBrush,
    },
    {
      name: "Scratch プロジェクトを簡単に紹介",
      description:
        "あなたが Scratch で制作したプロジェクトをプロフィールページに掲載し、訪れた人にすぐに見てもらえるようになります。",
      icon: IconServer,
    },
  ];

  return (
    <section id="feature">
      <div className="overflow-hidden py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
                  プロフィールを簡単に作成
                </h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-gray-100 sm:text-5xl">
                  あなたの Scratch 活動をもっと魅力的に
                </p>
                <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-400">
                  ScProfile は、Scratch
                  ユーザーのためのプロフィール作成サービスです。 Scratch
                  アカウントと連携するだけで、あなただけのプロフィールページを簡単に作成できます。
                  プロジェクトや自己紹介を自由にカスタマイズし、あなたの活動をもっと魅力的に発信しましょう。
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 dark:text-gray-400 lg:max-w-none">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900 dark:text-gray-100">
                        <feature.icon
                          aria-hidden="true"
                          className="absolute top-1 left-1 size-5 text-indigo-600 dark:text-indigo-400"
                        />
                        {feature.name}
                      </dt>{" "}
                      <dd className="inline">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <img
              alt="Product screenshot"
              src="/wp-content/uploads/profile-editor.png"
              width={2432}
              height={1442}
              className="w-[48rem] max-w-none rounded-3xl ring-1 shadow-xl ring-gray-400/10 dark:ring-gray-600/10 sm:w-[57rem] md:-ml-4 lg:-ml-0 overflow-hidden"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
