import Control from "@/components/Control";
import { mainTitle , subTitle } from "@/config/home.data";


export default function Home() {

  return (
    <div className="relative">
      {/* 第一屏 */}
      <section className="flex flex-col items-center justify-center w-full min-h-screen bg-zinc-50 dark:bg-black">
        <h1 className="text-4xl font-bold text-center text-zinc-900 dark:text-white">
          {mainTitle}
        </h1>

        <p className="mt-4 text-lg text-center text-zinc-600 dark:text-zinc-300">
          {subTitle}
        </p>
      </section>

      {/* 👇 下面新增内容 */}
      <section className="w-full py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">More Content</h2>
          <p className="text-zinc-600 dark:text-zinc-300">
            这里就是你要加的内容，比如项目、卡片、列表等
          </p>
        </div>
      </section>
    </div>
  );
}
