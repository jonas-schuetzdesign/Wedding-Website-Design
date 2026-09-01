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
const COORDS = { lat: 46.8982, lng: 7.6072 };
const APPLE_MAPS =
  `https://maps.apple.com/?address=Freimettigenstrasse+9,3510+Konolfingen,Switzerland&ll=${COORDS.lat},${COORDS.lng}&q=Schloss+H%C3%BCnigen`;
const GOOGLE_MAPS =
  `https://www.google.com/maps/search/?api=1&query=Schloss+H%C3%BCnigen+Freimettigenstrasse+9+3510+Konolfingen`;
const OSM_EMBED =
  `https://www.openstreetmap.org/export/embed.html?bbox=7.5972%2C46.8882%2C7.6172%2C46.9082&layer=mapnik&marker=${COORDS.lat}%2C${COORDS.lng}`;

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
  return (
    <section id="wann-wo" className="border-t border-line bg-white px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl space-y-20">

        {/* ── Top grid: info + schedule ── */}
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <div className="md:sticky md:top-28 md:self-start space-y-9">
            <div>
              <h2 className="font-display text-4xl leading-tight text-navy md:text-5xl">
                Zwei Tage,
                <br />
                ein Versprechen.
              </h2>
              <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-ink-strong">
                Wir feiern unsere Hochzeit über ein ganzes Wochenende im Schloss Hünigen bei
                Konolfingen — umgeben von Park, Wald und den Menschen, die uns am wichtigsten sind.
              </p>
            </div>

            <dl className="space-y-4 border-t border-mist-mid pt-8 text-sm">
              <div className="flex items-baseline justify-between gap-6">
                <dt className="uppercase tracking-[0.18em] text-coral-deep">Datum</dt>
                <dd className="text-right text-coral-deep">19. – 20. Juni 2027</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6">
                <dt className="uppercase tracking-[0.18em] text-coral-deep">Ort</dt>
                <dd className="font-body font-light text-right text-coral-deep" style={{ fontSize: "14px" }}>Schloss Hünigen</dd>
              </div>
            </dl>
          </div>

          <ol className="relative space-y-10 md:space-y-14">
            <span aria-hidden className="absolute left-[7px] top-2 bottom-2 w-px bg-mist md:left-[9px]" />
            {schedule.map((item, i) => (
              <li key={i} className="relative pl-10 md:pl-14">
                <span
                  aria-hidden
                  className="absolute left-0 top-1.5 grid h-4 w-4 place-items-center border border-navy/40 bg-white md:h-5 md:w-5"
                >
                  <span className="h-1.5 w-1.5 bg-coral-deep" />
                </span>
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-coral-deep">
                  {item.day}, {item.date} · {item.time}
                </p>
                <h3 className="mt-3 font-display text-navy" style={{ fontSize: "48px" }}>{item.title}</h3>
                <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-ink-strong">{item.detail}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* ── Prominent address + map block ── */}
        <div className="overflow-hidden border border-line bg-white">

          {/* Address header */}
          <div className="px-6 py-7 sm:px-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-line">
            <div className="flex items-start gap-3">
              <PinIcon />
              <div>
                <p className="font-display text-2xl text-ink-strong leading-tight">
                  Schloss Hünigen
                </p>
                <p className="mt-1 text-[0.95rem] text-ink leading-snug">
                  Freimettigenstrasse 9<br />
                  3510 Konolfingen BE
                </p>
              </div>
            </div>

            {/* Map app buttons */}
            <div className="flex flex-wrap gap-3 shrink-0">
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

          {/* Map embed — OpenStreetMap (no API key, free) */}
          <div className="relative h-[300px] sm:h-[380px] md:h-[440px]">
            <iframe
              title="Karte Schloss Hünigen"
              src={OSM_EMBED}
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer"
              aria-label="OpenStreetMap-Karte mit Markierung für Schloss Hünigen, Freimettigenstrasse 9, Konolfingen"
            />
            {/* Subtle coral overlay tint on the map edges */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(232,145,125,0.07) 0%, transparent 60%)",
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
