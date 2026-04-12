import Github from "@/components/SocialComponent/Github";


export default function SocialPage() {
    return (
    <div className="relative">
      <div className="flex flex-col items-center justify-center w-full max-w-full min-h-100 bg-zinc-50 font-sans dark:bg-black">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">My Social</h1>
      </div>

      <div className="flex flex-1 w-full max-w-full h-auto bg-zinc-50 font-sans dark:bg-black items-center justify-center">
        <Github/>
      </div>
    </div>
    )
}