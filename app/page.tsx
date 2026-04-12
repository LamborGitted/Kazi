import Control from "@/components/Control";
import { mainTitle , subTitle } from "@/config/home.data";


export default function Home() {

  return (
    <div className="relative">
      <div className="flex flex-col items-center justify-center w-full max-w-full min-h-[100vh] bg-zinc-50 font-sans dark:bg-black">
        <h1 className="text-4xl font-bold text-center text-zinc-900 dark:text-white">{mainTitle}</h1>
        <p className="mt-4 text-lg text-center text-zinc-600 dark:text-zinc-300">{subTitle}</p>
      </div>
    </div>
  );
}
