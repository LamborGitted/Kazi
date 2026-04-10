import Link from "next/link";
import Image from "next/image";
import { appName , navLinks} from "@/config/header.data";

export default function Header() {

    

  return (
    <header className="w-full h-16 flex items-center justify-center bg-white dark:bg-black">
      <div className="w-full max-w-3xl px-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-pink-600 dark:text-pink-400">
          {appName}
        </Link>
        <nav className="gap-4 flex">
          {
            navLinks.map((link, index) => (
              <div key={index} className="relative">
                <Link href={link.href} className="flex text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-300 ">
                  {link.name} {link.children && (
                    <Image src="/chevron-down.svg" alt="Dropdown" width={16} height={16} />
                  )}
                </Link>
                {link.children && (
                  <ul className="absolute top-full left-0 bg-white dark:bg-black shadow-lg">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} className="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-300">
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          }
        </nav>
      </div>
    </header>
  );
}