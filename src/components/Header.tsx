import Monogram from "./Monogram";

const links = [
  { href: "#willkommen", label: "Willkommen" },
  { href: "#wann-wo", label: "Wann & Wo" },
  { href: "#faq", label: "FAQ" },
];

export default function Header({ rsvpUrl }: { rsvpUrl: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#willkommen" className="flex items-center gap-3 text-ink transition-opacity hover:opacity-70">
          <Monogram className="h-6 w-6 md:h-7 md:w-7" />
          <span className="font-display hidden text-lg tracking-wide text-ink-strong sm:inline">
            Luca &amp; Jonas
          </span>
        </a>

        <nav className="flex items-center gap-6 md:gap-9">
          <ul className="hidden items-center gap-7 text-[0.7rem] font-normal uppercase tracking-[0.22em] text-ink md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative py-1 transition-colors hover:text-coral-deep focus-visible:text-coral-deep focus-visible:outline-none"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={rsvpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-coral/60 px-5 py-2 text-[0.7rem] uppercase tracking-[0.2em] text-coral-deep transition-all hover:bg-coral hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
          >
            Anmeldung
          </a>
        </nav>
      </div>
    </header>
  );
}
