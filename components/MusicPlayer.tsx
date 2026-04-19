"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import type { Track } from "@/config/music.data";

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function generatePalette(title: string) {
  const h = hashStr(title) % 360;
  const [r1, g1, b1] = hslToRgb(h, 65, 55);
  const [r2, g2, b2] = hslToRgb((h + 40) % 360, 70, 40);
  const [r3, g3, b3] = hslToRgb((h + 20) % 360, 50, 75);
  return {
    from: `rgb(${r1},${g1},${b1})`,
    to: `rgb(${r2},${g2},${b2})`,
    text: `rgb(${r3},${g3},${b3})`,
    rgb: `${r1},${g1},${b1}`,
    hex: `#${r1.toString(16).padStart(2, "0")}${g1.toString(16).padStart(2, "0")}${b1.toString(16).padStart(2, "0")}`,
  };
}

function formatTime(s: number): string {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

const placeholder = "/image/13.jpg";

function CoverArt({
  title,
  coverSrc,
  palette,
  playing,
}: {
  title: string;
  coverSrc: string | null;
  palette: ReturnType<typeof generatePalette>;
  playing: boolean;
}) {
  const src = coverSrc || placeholder;

  return (
    <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-2xl">
      <Image
        src={src}
        alt={title}
        fill
        className="object-cover"
        unoptimized={!!coverSrc}
      />

      {!coverSrc && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${palette.from}, ${palette.to})` }}>
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="0.3" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="0.2" />
              <line x1="50" y1="5" x2="50" y2="95" stroke="white" strokeWidth="0.1" />
              <line x1="5" y1="50" x2="95" y2="50" stroke="white" strokeWidth="0.1" />
            </svg>
          </div>
          <svg viewBox="0 0 48 48" className="w-16 h-16 text-white/40 relative z-10" fill="currentColor">
            <path d="M20 36V10l16-4v26M20 36c0 2.2-2.7 4-6 4s-6-1.8-6-4 2.7-4 6-4 6 1.8 6 4zm16-4c0 2.2-2.7 4-6 4s-6-1.8-6-4 2.7-4 6-4 6 1.8 6 4z" />
          </svg>
        </div>
      )}

      {playing && (
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
          <div className="flex items-end gap-[3px] h-6">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-[3px] bg-white rounded-full"
                animate={{ height: ["30%", "100%", "50%", "80%", "30%"] }}
                transition={{
                  duration: 0.8 + i * 0.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Visualizer({
  analyserRef,
  palette,
  playing,
}: {
  analyserRef: React.RefObject<AnalyserNode | null>;
  palette: ReturnType<typeof generatePalette>;
  playing: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      animRef.current = requestAnimationFrame(draw);
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const analyser = analyserRef.current;
      if (!analyser || !playing) return;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      const bars = 64;
      const barWidth = width / bars;
      const step = Math.floor(bufferLength / bars);

      for (let i = 0; i < bars; i++) {
        const val = dataArray[i * step] / 255;
        const barHeight = val * height * 0.9;
        const x = i * barWidth;

        ctx.fillStyle = `rgba(${palette.rgb}, ${0.3 + val * 0.7})`;
        ctx.beginPath();
        ctx.roundRect(x + 1, height - barHeight, barWidth - 2, barHeight, 2);
        ctx.fill();
      }
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [analyserRef, palette, playing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-16 rounded-lg opacity-80"
      style={{ display: playing ? "block" : "none" }}
    />
  );
}

export default function MusicPlayer({
  track,
  index,
  downloadLabel,
}: {
  track: Track;
  index: number;
  downloadLabel: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const palette = useMemo(() => generatePalette(track.title), [track.title]);

  const audioRef = useRef<HTMLAudioElement>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [coverSrc, setCoverSrc] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);

  const src = `/music/${track.filename}`;

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/music-cover?file=${encodeURIComponent(track.filename)}`)
      .then((r) => {
        if (r.ok) return r.blob();
        throw new Error("no cover");
      })
      .then((blob) => {
        if (!cancelled) setCoverSrc(URL.createObjectURL(blob));
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [track.filename]);

  const ensureAudioContext = useCallback(() => {
    if (ctxRef.current) return;
    if (!audioRef.current) return;
    const ac = new AudioContext();
    const source = ac.createMediaElementSource(audioRef.current);
    const analyser = ac.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    analyser.connect(ac.destination);
    ctxRef.current = ac;
    sourceRef.current = source;
    analyserRef.current = analyser;
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    ensureAudioContext();
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  }, [playing, ensureAudioContext]);

  const seek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const audio = audioRef.current;
      if (!audio || !duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      audio.currentTime = pct * duration;
      setProgress(pct * 100);
    },
    [duration]
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };
    const onDuration = () => setDuration(audio.duration);
    const onEnd = () => setPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onDuration);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onDuration);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: index * 0.12,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative rounded-2xl border overflow-hidden"
        style={{
          borderColor: hovered ? `rgba(${palette.rgb}, 0.4)` : "var(--border)",
          background: hovered ? "var(--surface)" : "transparent",
          transition: "border-color 0.4s, background 0.4s",
          boxShadow: hovered
            ? `0 20px 60px -15px rgba(${palette.rgb}, 0.2)`
            : "none",
        }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 30% 80%, rgba(${palette.rgb}, 0.06), transparent 60%)`,
          }}
        />

        <div className="relative z-10 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            <div className="w-full sm:w-48 sm:min-w-48 flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <CoverArt
                  title={track.title}
                  coverSrc={coverSrc}
                  palette={palette}
                  playing={playing}
                />
              </motion.div>
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full border"
                    style={{
                      color: palette.hex,
                      borderColor: `rgba(${palette.rgb}, 0.3)`,
                      background: `rgba(${palette.rgb}, 0.06)`,
                    }}
                  >
                    {track.year}
                  </span>
                  {track.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-border text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3
                  className="text-2xl sm:text-3xl font-bold tracking-tight mb-1 transition-colors duration-300"
                  style={{
                    color: hovered ? palette.hex : "var(--foreground)",
                  }}
                >
                  {track.title}
                </h3>
                <p className="text-sm text-foreground/50 mb-3">{track.artist}</p>
                <p className="text-sm text-foreground/40 leading-relaxed line-clamp-2">
                  {track.description}
                </p>
              </div>

              <div className="mt-6">
                <Visualizer
                  analyserRef={analyserRef}
                  palette={palette}
                  playing={playing}
                />

                <div
                  className="relative h-1.5 rounded-full cursor-pointer group/bar mt-3"
                  style={{ background: `rgba(${palette.rgb}, 0.12)` }}
                  onClick={seek}
                >
                  <div
                    className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-100"
                    style={{
                      width: `${progress}%`,
                      background: `linear-gradient(90deg, ${palette.from}, ${palette.to})`,
                    }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200"
                    style={{
                      left: `calc(${progress}% - 6px)`,
                      background: palette.hex,
                      borderColor: "var(--background)",
                      boxShadow: `0 0 8px rgba(${palette.rgb}, 0.5)`,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-[11px] font-mono text-muted">
                    {formatTime(currentTime)}
                  </span>
                  <span className="text-[11px] font-mono text-muted">
                    {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <motion.button
                    onClick={togglePlay}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
                    style={{
                      background: playing
                        ? `rgba(${palette.rgb}, 0.15)`
                        : palette.hex,
                      color: playing ? palette.hex : "var(--background)",
                      boxShadow: playing
                        ? "none"
                        : `0 4px 16px rgba(${palette.rgb}, 0.3)`,
                    }}
                  >
                    {playing ? (
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="w-5 h-5 ml-0.5" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </motion.button>

                  <a
                    href={src}
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border cursor-pointer"
                    style={{
                      borderColor: `rgba(${palette.rgb}, 0.25)`,
                      color: palette.hex,
                      background: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = `rgba(${palette.rgb}, 0.1)`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }}
                  >
                    <svg
                      viewBox="0 0 16 16"
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M8 2v9M4 8l4 4 4-4M2 13h12" />
                    </svg>
                    {downloadLabel}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 h-px transition-all duration-500"
          style={{
            width: hovered ? "100%" : "0%",
            background: `linear-gradient(90deg, ${palette.from}, ${palette.to})`,
          }}
        />
      </motion.div>

      <audio ref={audioRef} preload="metadata" src={src} />
    </motion.div>
  );
}
