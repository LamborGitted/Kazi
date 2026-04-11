"use client";

import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString("zh-CN", { hour12: false }));
    };

    update(); // 立即执行一次
    const timer = setInterval(update, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-3xl font-mono text-gray-800 dark:text-gray-200">
      {time || "--:--:--"}
    </div>
  );
}