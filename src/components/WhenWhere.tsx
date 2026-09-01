import { useState } from "react";

const schedule = [
  {
    day: "Samstag",
    date: "19. Juni 2027",
    title: "Ankunft & Apéro",
    detail:
      "Anreise im Schloss Hünigen ab dem frühen Nachmittag. Wir begrüssen euch mit einem Apéro und stossen gemeinsam auf das Wochenende an.",
    time: "ab 14:00 Uhr",
  },
  {
    day: "Samstag",
    date: "19. Juni 2027",
    title: "Freie Trauung",
    detail:
      "Die Trauungszeremonie findet im Schlosspark statt, gefolgt von Dinner, Reden und Tanz bis tief in die Nacht.",
    time: "ab 15:00 Uhr",
  },
  {
    day: "Sonntag",
    date: "20. Juni 2027",
    title: "Abschlussbrunch",
    detail:
      "Ein gemütlicher Brunch zum Ausklingen des Wochenendes — bevor wir uns verabschieden und mit vielen schönen Erinnerungen nach Hause fahren.",
    time: "ab 10:00 Uhr",
  },
];

// Schloss Hünigen, Freimettigenstrasse 9, 3510 Konolfingen
const COORDS = { lat: 46.8728, lng: 7.6227 };
const APPLE_MAPS =
  `https://maps.apple.com/?address=Freimettigenstrasse+9,3510+Konolfingen,Switzerland&ll=${COORDS.lat},${COORDS.lng}&q=Schloss+H%C3%BCnigen`;
const GOOGLE_MAPS =
  `https://www.google.com/maps/search/?api=1&query=Schloss+H%C3%BCnigen+Freimettigenstrasse+9+3510+Konolfingen`;
const OSM_EMBED =
  `https://www.openstreetmap.org/export/embed.html?bbox=7.6127%2C46.8628%2C7.6327%2C46.8828&layer=mapnik&marker=${COORDS.lat}%2C${COORDS.lng}`;

function PinIcon() {
  return (
    <svg
      width="18"
      height="22"
      viewBox="0 0 18 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M9 0C5.134 0 2 3.134 2 7c0 5.25 7 15 7 15s7-9.75 7-15c0-3.866-3.134-7-7-7Z"
        fill="var(--color-coral)"
        opacity="0.18"
      />
      <path
        d="M9 1C5.686 1 3 3.686 3 7c0 4.8 6 13.5 6 13.5S15 11.8 15 7c0-3.314-2.686-6-6-6Z"
        stroke="var(--color-coral)"
        strokeWidth="1.4"
        fill="none"
      />
      <circle cx="9" cy="7" r="2.2" fill="var(--color-coral)" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M10.6 7.4c0-1.5 1.2-2.2 1.3-2.3-.7-1-1.8-1.2-2.2-1.2-1 0-1.8.6-2.3.6-.5 0-1.3-.6-2.1-.6C3.8 4 2.5 4.9 1.8 6.3c-1.3 2.3-.4 5.7.9 7.5.6.9 1.3 1.8 2.2 1.8.9 0 1.2-.6 2.2-.6 1.1 0 1.4.6 2.3.5.9 0 1.5-.8 2.1-1.7.7-1 1-1.9 1-2s-1.9-.8-1.9-2.4Z"
        fill="currentColor"
      />
      <path
        d="M9 2.7c.5-.6.8-1.4.7-2.2-.7 0-1.6.5-2.1 1.1-.4.5-.8 1.3-.7 2.1.8.1 1.6-.4 2.1-1Z"
        fill="currentColor"
      />
    </svg>
  );
}

function GoogleMapsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="6" r="5.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="7" cy="6" r="2" fill="currentColor" />
      <line x1="7" y1="11" x2="7" y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export default function WhenWhere() {
  const [mapActive, setMapActive] = useState(false);

  return (
    <section id="wann-wo" className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-6 md:px-10">

        {/* ── Zone A: Headline + Eckdaten ── */}
        <div className="border-b border-line py-16 md:py-24">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            <div className="max-w-md">
              <h2 className="font-display text-6xl leading-[1.05] text-navy">
                Zwei Tage,
                <br />
                ein Versprechen.
              </h2>
              <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-ink-strong">
                Wir feiern unsere Hochzeit über ein ganzes Wochenende im Schloss Hünigen bei
                Konolfingen — umgeben von Park, Wald und den Menschen, die uns am wichtigsten sind.
              </p>
            </div>

            <dl className="space-y-6 text-left md:shrink-0 md:text-right">
              <div>
                <dt className="text-[0.72rem] uppercase tracking-[0.2em] text-coral-deep">Datum</dt>
                <dd className="mt-2 text-lg font-medium text-navy md:text-xl">19. – 20. Juni 2027</dd>
              </div>
              <div>
                <dt className="text-[0.72rem] uppercase tracking-[0.2em] text-coral-deep">Ort</dt>
                <dd className="mt-2 text-lg font-medium text-navy md:text-xl">Schloss Hünigen</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* ── Zone B: Programm ── */}
        <ol className="divide-y divide-line border-b border-line">
          {schedule.map((item, i) => (
            <li
              key={i}
              className="flex flex-wrap items-start justify-between gap-x-4 gap-y-6 py-10 md:grid md:grid-cols-12 md:items-start md:gap-x-10 md:py-14"
            >
              <span className="font-display text-4xl text-coral-deep md:col-span-2 md:text-6xl">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="text-right md:col-span-3 md:text-left">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-coral-deep">
                  {item.day}, {item.date}
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-navy">
                  {item.time}
                </p>
              </div>

              <div className="w-full md:col-span-7 md:w-auto">
                <h3 className="font-display text-5xl text-navy md:text-5xl">{item.title}</h3>
                <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-ink-strong">
                  {item.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* ── Zone C: Karte, randabfallend, mit Adress-Overlay ── */}
      <div
        className="relative h-105 sm:h-120 md:h-150"
        onMouseLeave={() => setMapActive(false)}
      >
        <iframe
          title="Karte Schloss Hünigen"
          src={OSM_EMBED}
          className="absolute inset-0 h-full w-full border-0"
          style={{ pointerEvents: mapActive ? "auto" : "none" }}
          loading="lazy"
          referrerPolicy="no-referrer"
          aria-label="OpenStreetMap-Karte mit Markierung für Schloss Hünigen, Freimettigenstrasse 9, Konolfingen"
        />

        {!mapActive && (
          <button
            type="button"
            onClick={() => setMapActive(true)}
            aria-label="Karte aktivieren, um zu zoomen und zu verschieben"
            className="absolute inset-0 flex items-center justify-center bg-navy/5 transition-colors hover:bg-navy/10"
          >
            <span className="border border-white bg-navy/80 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white">
              Zum Interagieren klicken
            </span>
          </button>
        )}

        <div className="absolute inset-x-0 bottom-0 md:inset-x-auto md:bottom-8 md:left-8 md:right-auto">
          <div className="border border-line bg-white p-6 sm:max-w-sm sm:p-8">
            <div className="flex items-start gap-3">
              <PinIcon />
              <div>
                <p className="font-display text-xl leading-tight text-navy">
                  Schloss Hünigen
                </p>
                <p className="mt-1.5 text-base leading-snug text-ink-strong">
                  Freimettigenstrasse 9
                  <br />
                  3510 Konolfingen BE
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={APPLE_MAPS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-line bg-white px-4 py-2 text-xs uppercase tracking-[0.18em] text-ink-strong transition-all hover:border-coral/50 hover:text-coral-deep hover:shadow-sm"
              >
                <AppleIcon />
                Apple Maps
              </a>
              <a
                href={GOOGLE_MAPS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-line bg-white px-4 py-2 text-xs uppercase tracking-[0.18em] text-ink-strong transition-all hover:border-coral/50 hover:text-coral-deep hover:shadow-sm"
              >
                <GoogleMapsIcon />
                Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
