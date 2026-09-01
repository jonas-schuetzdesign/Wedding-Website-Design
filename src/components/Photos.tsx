import { useEffect, useRef, useState } from "react";

const PHOTOS = [
  { src: "/images/IMG_1725.webp", alt: "Luca & Jonas am Bahnhof",    objectPos: "center center" },
  { src: "/images/IMG_2779.webp", alt: "Luca & Jonas im Schnee",     objectPos: "center 30%" },
  { src: "/images/IMG_2739.webp", alt: "Luca & Jonas in den Bergen", objectPos: "center 30%" },
  { src: "/images/IMG_1293.webp", alt: "Luca & Jonas im Auto",       objectPos: "center 15%" },
  { src: "/images/IMG_4478.webp", alt: "Luca & Jonas am Strand",     objectPos: "center 25%" },
  { src: "/images/IMG_3535.webp", alt: "Luca & Jonas in der Stadt",  objectPos: "center 20%" },
  { src: "/images/IMG_0448.webp", alt: "Luca & Jonas am See",        objectPos: "center 20%" },
  { src: "/images/IMG_3737.webp", alt: "Luca & Jonas",               objectPos: "center 35%" },
];

// Grid placement: [colStart, colEnd, rowStart, rowEnd]
// 4 columns, 3 rows
const DESKTOP_PLACEMENTS: [number, number, number, number][] = [
  [1, 4, 1, 2], // img0: col 1-3, row 1 (landscape wide)
  [4, 5, 1, 2], // img1: col 4,   row 1 (portrait slim)
  [1, 2, 2, 3], // img2: col 1,   row 2
  [2, 3, 2, 3], // img3: col 2,   row 2
  [3, 4, 2, 3], // img4: col 3,   row 2
  [4, 5, 2, 3], // img5: col 4,   row 2
  [1, 3, 3, 4], // img6: col 1-2, row 3 (landscape)
  [3, 5, 3, 4], // img7: col 3-4, row 3 (landscape)
];

function PhotoCell({ src, alt, objectPos, delay, style }: {
  src: string; alt: string; objectPos: string; delay: number; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(1.04)",
        transition: `opacity 0.9s ease ${delay}ms, transform 1.1s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`,
        overflow: "hidden",
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
        style={{ objectPosition: objectPos }}
      />
    </div>
  );
}

export default function Photos() {
  return (
    <section className="overflow-hidden">

      {/* Desktop: strict 3-row CSS grid, no gaps, full-bleed */}
      <div
        className="hidden sm:grid"
        style={{
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "38vw 26vw 36vw",
          gap: 0,
        }}
      >
        {PHOTOS.map((p, i) => {
          const [cs, ce, rs, re] = DESKTOP_PLACEMENTS[i];
          return (
            <PhotoCell
              key={i}
              {...p}
              delay={i * 60}
              style={{ gridColumn: `${cs} / ${ce}`, gridRow: `${rs} / ${re}` }}
            />
          );
        })}
      </div>

      {/* Mobile: 2-column square grid, no gaps */}
      <div
        className="grid sm:hidden"
        style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: 0 }}
      >
        {PHOTOS.map((p, i) => (
          <PhotoCell
            key={i}
            {...p}
            delay={i * 50}
            style={{ aspectRatio: "1/1" }}
          />
        ))}
      </div>

    </section>
  );
}
