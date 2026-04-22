"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";


export default function Switcher({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const pathname = usePathname();
    

    return (
        <main className="min-h-full flex flex-col bg-[var(--background)]">
        <AnimatePresence mode="wait"
        >
            <motion.div className="min-h-screen flex flex-col"
                key={pathname}
                style={{ transformOrigin: "50vw 100vh" }}
                initial={{
                    x : "-100%",
                    scale : 0.7,
                }}
                animate={{
                    x: ["-100%", 0,0],
                    scale: [0.7, 0.8, 1],
                    transition: {
                        duration: 0.7,
                        ease: ["easeOut", "easeInOut", "easeIn"],
                        times: [0, 0.5, 1],
                    }
                }}
                exit={{
                    x: [0, 0, "100%"],
                    scale : [1, 0.8, 0.7],
                    transition: {
                        duration: 0.4,
                        ease: ["easeOut", "easeInOut", "easeIn"],
                        times: [0, 0.3, 1],
                    }
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
        </main>
    );

    
}