import Link from "next/link";
import Image from "next/image";
import { appName , navLinks} from "@/config/header.data";

export default function Header() {

    

  return (
    <header className="sticky top-0 z-50 shrink-0 w-full h-16 flex items-center justify-center bg-white dark:bg-black">
      <div className="w-full max-w-3xl px-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-pink-600 dark:text-pink-400">
          {appName}
        </Link>
        <nav className="gap-4 flex">
            {navLinks.map((link) => (
              <div key={link.id} className=" group gap-4 flex relative">
                <Link href={link.href || "/"} className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-300 group">
                  {link.children && (
                    <Image src="/chevron-down.svg" alt="dropdown" width={20} height={20} className="inline-block w-3 h-3 ml-1  dark:invert" />
                  )}
                  {link.label}
                </Link>
                <div className="absolute top-full left-0 bg-white dark:bg-black shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible">
                  {link.children && link.children.map((child) => (
                    <Link key={child.id} href={child.href || "/"} className="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 items-center  transition-colors duration-300">
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <Image src={"/squares-2x2.svg"} alt="logo" width={24} height={24} className="w-6 h-6 text-gray-600 dark:text-gray-400" />

        </nav>
      </div>
    </header>
  );
}