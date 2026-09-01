import { useState } from "react";

const faqs = [
  {
    q: "Was sollen wir anziehen?",
    a: "Wir wünschen uns festliche, sommerliche Garderobe. Der Dresscode lautet Garden Party Elegant: leichte Anzüge, Leinen, gerne Farbe. Alles, worin man auf einer Wiese anstossen und später noch tanzen kann. <br />Bitte verzichtet auf ein komplett weisses Outfit, das ist unser Tag zum Strahlen. Weisse Hemden sind selbstverständlich willkommen. <br />Zwei praktische Hinweise: Wir feiern zu einem grossen Teil draussen, auf Rasen und Kies. Hohe Absätze haben es da schwer. Und am Abend wird es im Emmental frisch, packt also etwas Wärmeres ein.",
  },
  {
    q: "Können wir vor Ort übernachten?",
    a: "Ja, und wir hoffen sehr, dass ihr bleibt. Für jede Einladung ist ein Zimmer im Schloss reserviert, passend zur Anzahl der eingeladenen Personen. Die Übernachtung und der Brunch am Sonntag sind unser Geschenk an euch, ihr müsst euch um nichts kümmern.<br />Sagt uns bei der Anmeldung einfach Bescheid, ob ihr das Zimmer nutzt. Wer ein Kinderbett braucht, schreibt es uns bitte gleich dazu.",
  },
  {
    q: "Wie reisen wir am besten an?",
    a: "Mit dem Auto seid ihr in rund 20 Minuten von Bern in Konolfingen. Kostenlose Parkplätze sind direkt beim Schloss vorhanden. Mit dem ÖV könnt ihr bis Stalden i.E. fahren. Das ist direkt neben dem Schloss.",
  },
  {
    q: "Dürfen wir unsere Kinder mitbringen?",
    a: "Wir lieben eure Kinder und wünschen uns für diesen Abend trotzdem eine Feier unter Erwachsenen. Seht es als Einladung an euch beide: ein Wochenende im Schloss, ausschlafen, Brunch und einmal keine Verhandlungen ums Zubettgehen. <br />Ganz Kleine bis 4 Jahre sind natürlich willkommen. Wir wissen, dass sich das nicht immer organisieren lässt.",
  },
  {
    q: "Was wünscht ihr euch zur Hochzeit?",
    a: "Das grösste Geschenk ist eure Anwesenheit. Wer uns darüber hinaus etwas schenken möchte, unterstützt gerne unsere Hochzeitsreise — Details dazu findet ihr ebenfalls über den Anmeldelink.",
  },
  {
    q: "Bis wann sollen wir uns anmelden?",
    a: "Bitte gebt uns bis am 19. Oktober 2026 Bescheid, ob ihr dabei seid. So können wir rechtzeitig planen und alles für ein unvergessliches Wochenende vorbereiten.",
  },
];

function FaqItem({
  q,
  a,
  isOpen,
  onToggle,
  index,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="group flex w-full items-baseline gap-5 py-6 text-left focus-visible:outline-none md:py-7"
        >
          <span className="font-display text-4xl text-coral-deep tabular-nums md:text-6xl">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="flex-1 font-body text-xl text-navy transition-colors group-hover:text-navy/70 md:text-2xl" style={{ fontWeight: 200 }}>
            {q}
          </span>
          <span
            aria-hidden
            className={`grid h-8 w-8 shrink-0 self-center place-items-center border border-mist-mid bg-white text-mist transition-all duration-300 group-hover:border-coral/60 group-hover:text-coral-deep ${
              isOpen ? "rotate-45" : ""
            }`}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 0v13M0 6.5h13" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </span>
        </button>
      </h3>
      <div
        className="grid overflow-hidden transition-all duration-500 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="min-h-0">
          <p className="max-w-2xl pb-7 pl-16 pr-4 text-[0.97rem] leading-relaxed text-ink-strong md:pl-24">
            {a.split("<br />").map((line, i) => (
              <span key={i} className={i > 0 ? "mt-3 block" : "block"}>
                {line.trim()}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid gap-12 py-16 md:grid-cols-[0.8fr_1.2fr] md:gap-20 md:py-24">
          <div className="md:sticky md:top-28 md:self-start">
            <h2 className="font-display text-6xl leading-[1.05] text-navy">
              Häufige Fragen
            </h2>
            <p className="mt-6 max-w-xs text-[0.95rem] leading-relaxed text-ink-strong">
              Das Wichtigste im Überblick. Sollte eure Frage offen bleiben, meldet euch jederzeit
              bei uns.
            </p>
          </div>

          <div className="border-t border-line">
            {faqs.map((item, i) => (
              <FaqItem
                key={item.q}
                index={i}
                q={item.q}
                a={item.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
