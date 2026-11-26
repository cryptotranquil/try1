/** A logo on a white chip, so the navy lettering stays readable in dark mode and on dark panels. */
export default function Logo({ src, alt, className = "h-12" }: { src: string; alt: string; className?: string }) {
  return (
    <span className="inline-flex rounded-xl bg-white px-3 py-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className={`${className} w-auto`} />
    </span>
  );
}
