import Monogram from "./Monogram";

export default function Rsvp({ rsvpUrl }: { rsvpUrl: string }) {
  return (
    <section id="anmeldung" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-3xl">
        <div
          className="relative overflow-hidden border border-coral/20 px-8 py-16 text-center md:px-16 md:py-20"
          style={{
            background: "linear-gradient(145deg, rgba(232,145,125,0.13) 0%, rgba(240,168,150,0.07) 40%, rgba(255,255,255,0.0) 100%), #fdfcfb",
          }}
        >
          <div className="relative">
            <Monogram className="mx-auto h-12 w-12 text-coral" />
            <h2 className="mt-5 font-display text-3xl leading-snug text-navy md:text-4xl">
              Wir bitten um Anmeldung
              <br />
              bis am 19. Oktober 2026.
            </h2>
            <p className="mx-auto mt-6 max-w-md text-[0.98rem] leading-relaxed text-ink-strong">
              Alle Informationen zu Ablauf, Übernachtung und Anreise findet ihr über den Link unten.
              Dort könnt ihr euch auch direkt anmelden. Wir freuen uns riesig auf euch!
            </p>

            <a
              href={rsvpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sweep mt-10 inline-flex items-center gap-4"
            >
              <span className="btn-sweep__label">Zur Anmeldung</span>
              <span aria-hidden className="btn-sweep__arrow" style={{ border: "none" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
