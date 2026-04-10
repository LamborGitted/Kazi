import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full h-16 flex items-center justify-center bg-white dark:bg-black mt-auto">
            <div className="w-full max-w-3xl px-4 flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} Lantxx Blog. All rights reserved.
                </span>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/privacy" className="hover:underline">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link href="/terms" className="hover:underline">
                                Terms of Service
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
}