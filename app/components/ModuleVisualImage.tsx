"use client";

import { useState } from "react";

type ModuleVisualImageProps = {
  src: string;
  alt: string;
  index: number;
};

export default function ModuleVisualImage({ src, alt, index }: ModuleVisualImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="genai-deep-fallback" role="img" aria-label={alt}>
        Visual {String(index).padStart(2, "0")} will appear here after the WebP file is reviewed and uploaded.
      </div>
    );
  }

  return <img src={src} alt={alt} onError={() => setFailed(true)} />;
}
