"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      stopInertiaOnNavigate: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    const frameId = window.requestAnimationFrame(() => {
      lenis.resize();
    });

    const handleLoad = () => {
      lenis.resize();
    };

    window.addEventListener("load", handleLoad);

    void document.fonts?.ready.then(() => {
      lenis.resize();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("load", handleLoad);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    const frameId = window.requestAnimationFrame(() => {
      lenis.resize();
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [pathname]);

  return <>{children}</>;
}
