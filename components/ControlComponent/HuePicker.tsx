"use client";

import { useRef, useState } from "react";

export default function HuePicker() {
  const [hue, setHue] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const color = `hsl(${hue}, 100%, 50%)`;

  function updateHue(clientX: number) {
    const rect = barRef.current!.getBoundingClientRect();
    const x = clientX - rect.left;

    const percent = Math.min(Math.max(x / rect.width, 0), 1);
    setHue(Math.round(percent * 360));
  }

  function onMouseDown(e: React.MouseEvent) {
    draggingRef.current = true;
    updateHue(e.clientX);
  }

  function onMouseMove(e: MouseEvent) {
    if (!draggingRef.current) return;
    updateHue(e.clientX);
  }

  function onMouseUp() {
    draggingRef.current = false;
  }

  // 绑定全局监听
  if (typeof window !== "undefined") {
    window.onmousemove = onMouseMove;
    window.onmouseup = onMouseUp;
  }

  return (
    <div className="w-50 h-16 flex items-center justify-center">
      <div
        ref={barRef}
        className="relative w-full h-4 cursor-pointer"
        onMouseDown={onMouseDown}
        style={{
          background: `linear-gradient(to right,
            red, yellow, lime, cyan, blue, magenta, red)`
        }}
      >
        {/* thumb */}
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