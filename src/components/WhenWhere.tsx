type ScheduleItem = {
  day: string;
  date: string;
  title: string;
  detail: string;
  time: string;
  // A part of the programme that isn't fixed yet. The row is shown behind a frosted layer
  // with a "more soon" banner in front, so its title, time and detail are only placeholders.
  teaser?: boolean;
};

const schedule: ScheduleItem[] = [
  {
    day: "Samstag",
    date: "19. Juni 2027",
    // \u200C (zero-width non-joiner) stops Bigilla's "ri" ligature, which makes "Drink" read as "Dnnk".
    title: "Ankunft & Welcome Dr\u200Cink",
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
    day: "Samstag",
    date: "19. Juni 2027",
    // Placeholders: only visible through the frosted layer and hidden from screen readers.
    title: "Dinner, Reden & Tanz",
    time: "ab 00:00 Uhr",
    detail:
      "Nach der Trauung geht es weiter mit Dinner, Reden und Tanz bis tief in die Nacht. Mehr dazu verraten wir bald hier.",
    teaser: true,
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

const ROW_CLASSES =
  "flex flex-wrap items-start justify-between gap-x-4 gap-y-6 py-12 md:grid md:grid-cols-12 md:items-start md:gap-x-10 md:py-14";

// Number, date/time and text of one schedule row. `hideAccents` keeps the space of the coral
// number and date but doesn't draw them, so no coral shows through the teaser's frosted layer.
function RowContent({ item, number, hideAccents = false }: { item: ScheduleItem; number: number; hideAccents?: boolean }) {
  const accent = hideAccents ? "invisible" : "";
  return (
    <>
      <span className={`font-display text-4xl text-coral-deep md:col-span-2 md:text-6xl ${accent}`}>
        {String(number).padStart(2, "0")}
      </span>

      <div className="text-right md:col-span-3 md:w-fit md:mx-auto md:text-left">
        {/* One line on phones ("Samstag, 19. Juni 2027"). From md the column is narrow, so the
            weekday gets its own line (without the comma) and all dates wrap the same way. */}
        <p className={`text-base uppercase tracking-[0.16em] text-coral-deep ${accent}`}>
          <span className="md:block">
            {item.day}
            <span className="md:hidden">,</span>
          </span>{" "}
          {item.date}
        </p>
        <p className="mt-2 text-base font-semibold tracking-[0.16em] text-navy">{item.time}</p>
      </div>

      <div className="w-full md:col-span-7 md:w-auto">
        <h3 className="font-display text-5xl text-navy">{item.title}</h3>
        <p className="mt-3 text-base leading-relaxed text-ink-strong">{item.detail}</p>
      </div>
    </>
  );
}

// A row that isn't announced yet: the placeholder row sits behind a frosted layer
// (background blur), and a banner in front says more is coming.
function TeaserRow({ item, number }: { item: ScheduleItem; number: number }) {
  return (
    <li className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex select-none items-center">
        <div className={`w-full ${ROW_CLASSES}`}>
          <RowContent item={item} number={number} hideAccents />
        </div>
      </div>

      <div className="relative flex justify-center bg-white/20 py-12 backdrop-blur-md md:py-16">
        <div className="mx-5 max-w-lg border border-coral/30 bg-white/65 px-6 py-8 text-center sm:mx-0 md:px-12 md:py-10">
          <p className="text-base uppercase tracking-[0.16em] text-coral-deep">Samstagabend</p>
          <h3 className="mt-3 font-display text-4xl text-navy md:text-5xl">Mehr verraten wir bald.</h3>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink-strong">
            Ein paar Wochen vor der Hochzeit findet ihr hier das definitive Programm — schaut also gerne
            nochmals vorbei.
          </p>
        </div>
      </div>
    </li>
  );
}

export default function WhenWhere() {
  return (
    <section id="wann-wo" className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-6 md:px-10">

        {/* ── Zone A: Headline + Eckdaten ── */}
        <div className="border-b border-line py-20 md:py-24">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            <div className="max-w-md">
              <h2 className="font-display text-6xl leading-[1.05] text-navy">
                Zwei Tage,
                <br />
                ein Versprechen.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ink-strong">
                Wir feiern unsere Hochzeit über ein ganzes Wochenende im Schloss Hünigen bei
                Konolfingen — umgeben von Park, Wald und den Menschen, die uns am wichtigsten sind.
              </p>
            </div>

            <dl className="space-y-6 text-left md:shrink-0 md:text-right">
              <div>
                <dt className="text-base uppercase tracking-[0.16em] text-coral-deep">Datum</dt>
                <dd className="mt-2 text-base font-semibold tracking-[0.16em] text-navy">19. – 20. Juni 2027</dd>
              </div>
              <div>
                <dt className="text-base uppercase tracking-[0.16em] text-coral-deep">Ort</dt>
                <dd className="mt-2 text-base font-semibold tracking-[0.16em] text-navy">Schloss Hünigen</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* ── Zone B: Programm ── */}
        <ol className="divide-y divide-line">
          {schedule.map((item, i) =>
            item.teaser ? (
              <TeaserRow key={item.title} item={item} number={i + 1} />
            ) : (
              <li key={item.title} className={ROW_CLASSES}>
                <RowContent item={item} number={i + 1} />
              </li>
            ),
          )}
        </ol>
      </div>
    </section>
  );
}
