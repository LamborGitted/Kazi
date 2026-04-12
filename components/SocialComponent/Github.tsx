"use client";

import { github_config } from "@/config/social.data";
import Image from "next/image";

export default function GithubCard() {
  if (!github_config.show) return null;

  return (
    <div
      className="w-[70vw] h-64 rounded-2xl overflow-hidden relative group cursor-pointer flex"
      onClick={() => window.open(github_config.homepage_url, "_blank")}
    >
      {/* 背景图 */}
      {github_config.background_img && (
        <Image
          src={github_config.background_img}
          alt="Github"
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
        />
      )}

      {/* 遮罩 */}
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition" />

      {/* 内容层 */}
      <div className="relative z-10 flex w-full text-white">
        
        {/* 左侧（图 + 数据） */}
        <div className="w-2/3 p-4 flex flex-col justify-between">
        
        </div>

        {/* 右侧（信息） */}
        <div className="w-1/3 p-4 flex flex-col justify-center backdrop-blur-md bg-black/30">

        {/* 贡献图 */}
          <div>
            <img
              src="https://ghchart.rshah.org/LamborGitted"
              alt="contributions"
              className="w-full h-16 object-cover rounded"
            />
          </div>
          
        </div>
      </div>
    </div>
  );
}