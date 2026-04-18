"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface MarkdownRendererProps {
  htmlContent: string;
}

export default function MarkdownRenderer({ htmlContent }: MarkdownRendererProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const pres = contentRef.current.querySelectorAll("pre code");
    pres.forEach((code) => {
      const pre = code.parentElement;
      if (!pre) return;

      const wrapper = document.createElement("div");
      wrapper.className = "code-block-wrapper";
      wrapper.style.position = "relative";

      const header = document.createElement("div");
      header.className = "code-block-header";

      const lang = (code.className || "").replace("language-", "");
      if (lang) {
        const langLabel = document.createElement("span");
        langLabel.className = "code-lang-label";
        langLabel.textContent = lang;
        header.appendChild(langLabel);
      }

      const copyBtn = document.createElement("button");
      copyBtn.className = "code-copy-btn";
      copyBtn.textContent = "Copy";
      copyBtn.onclick = async () => {
        await navigator.clipboard.writeText(code.textContent || "");
        copyBtn.textContent = "Copied!";
        setTimeout(() => {
          copyBtn.textContent = "Copy";
        }, 2000);
      };
      header.appendChild(copyBtn);

      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(header);
      wrapper.appendChild(pre);
    });
  }, [htmlContent]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      ref={contentRef}
      className="prose-blog"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
