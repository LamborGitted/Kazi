import BilibiliCard from "@/components/SocialComponent/Bilibili";
import Github from "@/components/SocialComponent/Github";
import OsuCard from "@/components/SocialComponent/OSU";

export default function SocialPage() {
  return (
    <main className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black font-sans">
      
      {/* Header */}
      <section className="flex flex-col items-center justify-center py-20">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          My Social
        </h1>
      </section>

      {/* Content */}
      <section className="flex flex-col items-center justify-center px-4 gap-16">
              {/* <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Github
              </h1> */}
              <Github />
              
              {/* <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Bilibili
              </h1> */}
              <BilibiliCard />

              {/* <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                OSU!
              </h1> */}
              <OsuCard />
      </section>

    </main>
  );
}