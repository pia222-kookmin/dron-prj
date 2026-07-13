"use client";

import { useEffect, useRef } from "react";

interface WhiteBgRemovedImageProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  className?: string;
  threshold?: number; // 0~255, 흰색으로 간주할 밝기 기준 (기본 230)
}

/**
 * PNG 이미지에서 흰색 배경을 제거하는 컴포넌트
 * Canvas를 이용해 흰색에 가까운 픽셀을 투명하게 처리합니다.
 */
export default function WhiteBgRemovedImage({
  src,
  alt,
  style,
  className,
  threshold = 230,
}: WhiteBgRemovedImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        // 흰색(밝은 픽셀)을 투명하게
        if (r >= threshold && g >= threshold && b >= threshold) {
          // 부드러운 전환: 밝을수록 더 투명
          const brightness = (r + g + b) / 3;
          const alpha = Math.round(((255 - brightness) / (255 - threshold)) * 255);
          data[i + 3] = Math.min(alpha * 3, 255); // 살짝 증폭
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };
    img.src = src;
  }, [src, threshold]);

  return (
    <canvas
      ref={canvasRef}
      aria-label={alt}
      role="img"
      style={style}
      className={className}
    />
  );
}
