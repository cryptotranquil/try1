"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { EASE } from "@/lib/ease";

type Props = {
  src: string;
  alt: string;
  /** Tailwind background class for the block shown behind (or instead of) the photo. */
  tone: string;
  /** Size and corner radius, for example "aspect-[4/3] rounded-3xl". */
  className?: string;
  priority?: boolean;
  /** Slowly zooms the photo while the pointer is over it. */
  zoom?: boolean;
  /** CSS object-position for the photo, for example "50% 20%". */
  pos?: string;
};

/** A coloured, striped block that a photo covers once it loads. If the file is missing, the block stays. */
export default function Photo({ src, alt, tone, className = "aspect-[4/3] rounded-2xl", priority = false, zoom = true, pos = "center" }: Props) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // A photo that already failed before the page became interactive never fires onError, so check once on load.
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <motion.div initial="rest" whileHover={zoom ? "hover" : undefined} className={`stripes relative overflow-hidden ${tone} ${className}`}>
      <motion.div
        variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
        transition={{ duration: 0.8, ease: EASE }}
        className="absolute inset-0"
      >
        {!failed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
            style={{ objectPosition: pos }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
