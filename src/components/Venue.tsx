// Schloss Hünigen, Freimettigenstrasse 9, 3510 Konolfingen
const COORDS = { lat: 46.8728, lng: 7.6227 };
const APPLE_MAPS =
  `https://maps.apple.com/?address=Freimettigenstrasse+9,3510+Konolfingen,Switzerland&ll=${COORDS.lat},${COORDS.lng}&q=Schloss+H%C3%BCnigen`;
const GOOGLE_MAPS =
  `https://www.google.com/maps/search/?api=1&query=Schloss+H%C3%BCnigen+Freimettigenstrasse+9+3510+Konolfingen`;

// Opens the venue in a maps app. Same button style as the RSVP link.
function MapLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="btn-sweep btn-sweep--light justify-between">
      <span className="btn-sweep__label whitespace-nowrap">{label}</span>
      <span aria-hidden="true" className="btn-sweep__arrow">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}

export default function Venue() {
  return (
    <section id="anreise" className="bg-navy">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid gap-12 py-20 md:grid-cols-[0.8fr_1.2fr] md:gap-20 md:py-28">
          <h2 className="font-display text-6xl leading-[1.05] text-white">
            So findet
            <br />
            ihr uns.
          </h2>

          <div className="md:border-l md:border-white/20 md:pl-12">
            <p className="text-base uppercase tracking-[0.16em] text-coral-light">Adresse</p>
            <p className="mt-4 font-display text-4xl text-white">Schloss Hünigen</p>
            <address className="mt-3 text-base not-italic leading-relaxed text-mist-mid">
              Freimettigenstrasse 9
              <br />
              3510 Konolfingen BE
            </address>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <MapLink href={APPLE_MAPS} label="Apple Maps" />
              <MapLink href={GOOGLE_MAPS} label="Google Maps" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
