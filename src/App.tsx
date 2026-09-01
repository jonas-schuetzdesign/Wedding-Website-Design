import Hero from "./components/HeroV3";
import WhenWhere from "./components/WhenWhere";
import Rsvp from "./components/Rsvp";
import Faq from "./components/Faq";
import Footer from "./components/Footer";

// Placeholder external RSVP destination — swap for the real form/link.
const RSVP_URL = "https://forms.gle/lucaundjonas-rsvp";

export default function App() {
  return (
    <div className="min-h-full bg-white">
      <main>
        <Hero rsvpUrl={RSVP_URL} />
        <WhenWhere />
        <Rsvp rsvpUrl={RSVP_URL} />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
