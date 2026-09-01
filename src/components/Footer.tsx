import Monogram from "./Monogram";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white px-6 py-20 text-center md:px-10">
      <div className="mx-auto flex max-w-2xl flex-col items-center">
        <Monogram className="h-14 w-14 text-coral" />
        <p className="font-display mt-8 text-3xl leading-relaxed text-navy md:text-4xl">
          Wir freuen uns auf euch!
        </p>
        <p className="font-display mt-6 text-navy" style={{ fontSize: "30px" }}>Luca &amp; Jonas</p>
        <div aria-hidden className="mt-10 h-px w-16 bg-mist-mid" />
      </div>
    </footer>
  );
}
