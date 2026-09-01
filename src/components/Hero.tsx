import { useEffect, useRef, useState } from "react";
import Monogram from "./Monogram";

const PETALS = [
  { left: "7%",  delay: "0s",   dur: "14s", sway: "50px",  rot: "160deg", w: 10, h: 16 },
  { left: "17%", delay: "3.5s", dur: "18s", sway: "-35px", rot: "220deg", w: 7,  h: 12 },
  { left: "31%", delay: "1.2s", dur: "16s", sway: "60px",  rot: "140deg", w: 12, h: 18 },
  { left: "54%", delay: "5.8s", dur: "20s", sway: "-50px", rot: "200deg", w: 8,  h: 14 },
  { left: "67%", delay: "0.6s", dur: "15s", sway: "40px",  rot: "170deg", w: 11, h: 17 },
  { left: "79%", delay: "4.2s", dur: "17s", sway: "-45px", rot: "230deg", w: 9,  h: 13 },
  { left: "90%", delay: "2.4s", dur: "19s", sway: "30px",  rot: "150deg", w: 7,  h: 11 },
  { left: "43%", delay: "7.1s", dur: "13s", sway: "-60px", rot: "190deg", w: 13, h: 20 },
];

export default function Hero({ rsvpUrl }: { rsvpUrl: string }) {
  const [visible, setVisible] = useState(false);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (copyRef.current) copyRef.current.style.transform = `translateY(${-y * 0.06}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="willkommen"
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-6 pt-12 pb-20 text-center"
    >
      {PETALS.map((p, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 rounded-full"
          style={{
            left: p.left,
            width: p.w,
            height: p.h,
            background: i % 2 === 0
              ? "radial-gradient(circle, #e8917d 0%, #f0a896 100%)"
              : "radial-gradient(circle, #b5b9c2 0%, #c8cdd8 100%)",
            opacity: 0,
            animation: `float-petal ${p.dur} linear ${p.delay} infinite`,
            ["--sway" as string]: p.sway,
            ["--rot"  as string]: p.rot,
          }}
        />
      ))}

      {/* White radial fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 52%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.6) 55%, transparent 80%)",
        }}
      />

      {/* Large background monogram */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ animation: "drift 14s ease-in-out 1s infinite" }}
      >
        <Monogram
          className="w-[min(90vw,560px)] h-[min(90vw,560px)] opacity-[0.07]"
          style={{ color: "#35405a" }}
        />
      </div>

      {/* Main copy */}
      <div
        ref={copyRef}
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-y-0"
        style={{ willChange: "transform" }}
      >
        <div
          style={{
            animation: visible ? "orb-spring-in 1s cubic-bezier(0.34,1.56,0.64,1) 0.1s both" : "none",
            opacity: visible ? undefined : 0,
            marginBottom: "1.25rem",
          }}
        >
          <Monogram
            className="h-12 w-12 text-navy md:h-14 md:w-14"
            style={{ animation: "pulse-glow 4s ease-in-out 2s infinite" }}
          />
        </div>

        <p
          className="text-[0.72rem] font-extralight uppercase text-ink-soft"
          style={{
            letterSpacing: "0.2em",
            marginBottom: "1.5rem",
            animation: visible ? "eyebrow-in 1s ease-out 0.35s both" : "none",
            opacity: visible ? undefined : 0,
          }}
        >
          Einladung zur Hochzeit
        </p>

        <h1
          className="font-display leading-[1.08] tracking-tight text-navy"
          style={{
            fontSize: "clamp(2rem, 6vw, 4.25rem)",
            marginBottom: "1rem",
            animation: visible ? "rise 0.9s ease-out 0.55s both" : "none",
            opacity: visible ? undefined : 0,
          }}
        >
          Gerne laden wir zu
          <br />
          unserer Hochzeit ein.
        </h1>

        <p
          className="font-display text-coral-deep"
          style={{
            fontSize: "64px",
            lineHeight: 1,
            marginBottom: "1.5rem",
            animation: visible
              ? "names-in 1s cubic-bezier(0.34,1.56,0.64,1) 1.05s both"
              : "none",
            opacity: visible ? undefined : 0,
          }}
        >
          Luca &amp; Jonas
        </p>

        <div
          className="flex flex-col items-center gap-4 sm:flex-row mt-2"
          style={{
            animation: visible ? "rise 0.8s ease-out 1.55s both" : "none",
            opacity: visible ? undefined : 0,
          }}
        >
          <a
            href={rsvpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-[0.78rem] uppercase tracking-[0.2em] text-white transition-all hover:scale-[1.04] hover:brightness-110 active:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
            style={{
              background: "linear-gradient(135deg, var(--color-coral) 0%, var(--color-coral-deep) 100%)",
              boxShadow: "0 4px 20px rgba(232,145,125,0.38)",
            }}
          >
            Jetzt anmelden
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
