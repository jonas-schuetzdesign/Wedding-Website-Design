import { useEffect, useRef, useState } from "react";
import Monogram from "./Monogram";

const BG_PHOTOS = [
  "/images/IMG_1725.webp",
  "/images/IMG_2779.webp",
  "/images/IMG_2739.webp",
  "/images/IMG_1293.webp",
  "/images/IMG_4478.webp",
  "/images/IMG_3535.webp",
  "/images/IMG_0448.webp",
  "/images/IMG_3737.webp",
];

export default function Hero({ rsvpUrl: _rsvpUrl }: { rsvpUrl: string }) {
  const [visible, setVisible] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentImg(i => (i + 1) % BG_PHOTOS.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {});
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      id="willkommen"
      className="relative min-h-[100svh] overflow-hidden"
      style={{ contain: "layout paint" }}
    >
      {/* Crossfading background images — grayscale */}
      {BG_PHOTOS.map((src, i) => (
        <div
          key={src}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: i === currentImg ? 1 : 0,
            transition: "opacity 1.4s ease-in-out",
          }}
        >
          <img
            src={src}
            alt=""
            className="h-full w-full object-cover"
            style={{ filter: "grayscale(1) sepia(1) hue-rotate(195deg) saturate(0.18) brightness(0.75)" }}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        </div>
      ))}

      {/* Bottom gradient for text readability */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{
          height: "40%",
          background: "linear-gradient(to top, rgba(0,0,0,0.52) 0%, transparent 100%)",
        }}
      />

      {/* Bottom-left: monogram */}
      <div
        className="absolute bottom-8 left-8 z-10"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease 0.6s",
        }}
      >
        <Monogram className="h-14 w-14 text-white" />
      </div>

      {/* Bottom-right: names */}
      <div
        className="absolute bottom-8 right-8 z-10 text-right"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.9s ease 1s, transform 0.9s ease 1s",
        }}
      >
        <p
          className="font-display font-bold text-white leading-none"
          style={{ fontSize: "clamp(2rem, 5vw, 52px)" }}
        >
          Luca &amp; Jonas
        </p>
      </div>
    </section>
  );
}
