"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "accent-hue";

function hslToRgb(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function updateAccentColor(hue: number) {
  const rgb = hslToRgb(hue, 100, 50);
  const rgbStr = rgb.join(",");
  const hex = `#${rgb.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
  document.documentElement.style.setProperty("--accent", hex);
  document.documentElement.style.setProperty(
    "--accent-glow",
    `rgba(${rgbStr}, 0.15)`
  );
}

function getInitialHue() {
  if (typeof window === "undefined") return 0;
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? parseInt(stored, 10) : 0;
}

export default function HuePicker() {
  const [hue, setHue] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const initializedRef = useRef(false);

  const color = `hsl(${hue}, 100%, 50%)`;

  const updateHue = useCallback((clientX: number) => {
    const rect = barRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = clientX - rect.left;
    const percent = Math.min(Math.max(x / rect.width, 0), 1);
    const newHue = Math.round(percent * 360);
    setHue(newHue);
    localStorage.setItem(STORAGE_KEY, newHue.toString());
    updateAccentColor(newHue);
  }, []);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    const initialHue = getInitialHue();
    setHue(initialHue);
    updateAccentColor(initialHue);
  }, []);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!draggingRef.current) return;
      updateHue(e.clientX);
    }

    function onMouseUp() {
      draggingRef.current = false;
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [updateHue]);

  return (
    <div className="w-50 h-16 flex items-center justify-center">
      <div
        ref={barRef}
        className="relative w-full h-4 cursor-pointer"
        onMouseDown={(e) => {
          draggingRef.current = true;
          updateHue(e.clientX);
        }}
        style={{
          background: `linear-gradient(to right,
            red, yellow, lime, cyan, blue, magenta, red)`
        }}
      >
        <div
          className="absolute top-1/2 w-6 h-6 border-2 border-white shadow"
          style={{
            left: `${(hue / 360) * 100}%`,
            transform: "translate(-50%, -50%)",
            backgroundColor: color
          }}
        />
      </div>
    </div>
  );
}