export function extractDominantColor(
  imageSrc: string,
  fallback = "59,130,246"
): Promise<string> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const size = 50;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, size, size);
        const data = ctx.getImageData(0, 0, size, size).data;

        let r = 0,
          g = 0,
          b = 0,
          count = 0;
        for (let i = 0; i < data.length; i += 4) {
          const pr = data[i],
            pg = data[i + 1],
            pb = data[i + 2];
          const lum = (pr * 0.299 + pg * 0.587 + pb * 0.114) / 255;
          if (lum > 0.08 && lum < 0.92) {
            r += pr;
            g += pg;
            b += pb;
            count++;
          }
        }

        if (count === 0) {
          resolve(fallback);
          return;
        }

        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const mid = (max + min) / 2;
        const boost = 1.6;
        r = Math.min(255, Math.round(mid + (r - mid) * boost));
        g = Math.min(255, Math.round(mid + (g - mid) * boost));
        b = Math.min(255, Math.round(mid + (b - mid) * boost));

        resolve(`${r},${g},${b}`);
      } catch {
        resolve(fallback);
      }
    };
    img.onerror = () => resolve(fallback);
    img.src = imageSrc;
  });
}
