


export default function Footer() {
    return (
        <footer className="w-full h-auto p-4 flex items-center justify-center bg-white dark:bg-black mt-auto">
            <div className="w-full max-w-3xl px-4 flex items-center justify-between">

                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        &copy; {new Date().getFullYear()} Lantxx Personal HomePage. All rights reserved.
                    </span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Designed by Lantxx</p>
                </div>
                
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex flex-col gap-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400"> Powered by</p>
                    <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="hover:underline text-zinc-700 dark:text-zinc-300">   React</a>
                    <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="hover:underline text-zinc-700 dark:text-zinc-300">   Next.js</a>
                    <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="hover:underline text-zinc-700 dark:text-zinc-300">   Tailwind CSS</a>
                    <a href="https://motion.dev/" target="_blank" rel="noopener noreferrer" className="hover:underline text-zinc-700 dark:text-zinc-300">   Framer Motion</a>
                </div>
            </div>
        </footer>
    );
}