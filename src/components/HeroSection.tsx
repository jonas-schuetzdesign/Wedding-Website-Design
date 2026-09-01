import { useEffect, useRef, useState } from "react";
import Monogram from "./Monogram";


export default function Hero({ rsvpUrl: _rsvpUrl }: { rsvpUrl: string }) {
  const [visible, setVisible] = useState(false);
  const copyRef = useRef<HTMLDivElement>(null);
  const rafRef  = useRef<number>(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (copyRef.current) copyRef.current.style.transform = `translateY(${-y * 0.06}px)`;
      });
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
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-6 pt-12 pb-20 text-center"
      style={{ contain: "layout paint" }}
    >
      {/* White radial fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 52%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.6) 55%, transparent 80%)",
        }}
      />

      {/* Background monogram */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ animation: "drift 14s ease-in-out 1s infinite", willChange: "transform" }}
      >
        <Monogram
          className="w-[min(90vw,560px)] h-[min(90vw,560px)] opacity-[0.13]"
          style={{ color: "#35405a" }}
        />
      </div>

      {/* Main copy */}
      <div
        ref={copyRef}
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center"
        style={{ willChange: "transform" }}
      >
        <p
          className="font-display text-coral-deep"
          style={{
            fontSize: "clamp(3rem, 10vw, 64px)",
            lineHeight: 1,
            animation: visible
              ? "names-in 1s cubic-bezier(0.34,1.56,0.64,1) 1.05s both"
              : "none",
            opacity: visible ? undefined : 0,
          }}
        >
          Luca &amp; Jonas
        </p>
      </div>
    </section>
  );
}
