"use client";

import { motion } from "framer-motion";
import { tracks } from "@/config/music.data";
import MusicPlayer from "@/components/MusicPlayer";
import { useLanguage } from "@/components/LanguageProvider";

const charVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.4 + i * 0.06,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export default function MusicPage() {
  const { t } = useLanguage();
  const music = t.music as Record<string, string>;

  return (
    <main className="flex flex-col min-h-screen relative">
      <section className="relative flex flex-col items-center justify-center py-28 sm:py-36 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-float" />
          <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-accent/5 blur-3xl animate-float-delay" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xs font-mono text-accent tracking-widest uppercase"
          >
            {music.subtitle}
          </motion.span>

          <h1 className="mt-6 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none overflow-hidden [perspective:600px]">
            {(music.heading as string).toUpperCase().split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={charVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>

          <div className="mt-8 h-px w-full max-w-xs mx-auto relative overflow-hidden" style={{ background: "var(--border)" }}>
            <motion.div
              className="absolute inset-y-0 left-0 bg-accent"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{
                delay: 1.2,
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="mt-6 text-base sm:text-lg font-light text-foreground/50 max-w-md mx-auto"
          >
            {music.description}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="mt-12"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border-2 border-muted/30 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 rounded-full bg-muted/40" />
          </motion.div>
        </motion.div>
      </section>

      <section className="relative w-full pb-24 px-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {tracks.map((track, i) => (
            <MusicPlayer
              key={track.id}
              track={track}
              index={i}
              downloadLabel={music.download}
            />
          ))}

          {tracks.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center mb-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--muted)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-7 h-7"
                >
                  <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
                </svg>
              </div>
              <p className="text-sm text-muted font-mono">{music.noTracks}</p>
            </motion.div>
          )}
        </div>
      </section>

      <div className="h-24" />
    </main>
  );
}
