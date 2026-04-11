import HuePicker from "@/components/ControlComponent/HuePicker";
import { mainTitle, subTitle } from "@/config/home.data";

export default function Home() {


  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black ">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-shadow-lg">{mainTitle}</h1>
        <p className="text-2xl text-gray-600 dark:text-gray-400 ">
            {subTitle}
        </p>

        <HuePicker/>

    </div>
  );
}
