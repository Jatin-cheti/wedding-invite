import Hero from "../components/Hero/Hero";
import Countdown from "../components/Countdown/Countdown";
import Events from "../components/Events/Events";
import Venue from "../components/Venue/Venue";
import Gallery from "../components/Gallery/Gallery";
import Gifts from "../components/Gifts/Gifts";
import Footer from "../components/Footer/Footer";
import countdownGiftsBackground from "../assets/countdown-gifts-background.webp";
import countdownGiftsBackgroundPortrait from "../assets/countdown-background-portrait.webp";

export default function Home({ scratched, onScratched, envelopeOpened }) {
  return (
    <div className="relative overflow-x-hidden" style={{ color: 'var(--text-primary)' }}>
      <Hero scratched={scratched} onScratched={onScratched} envelopeOpened={envelopeOpened} />

      <div style={{
        opacity: scratched ? 1 : 0,
        transform: scratched ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 2s ease 1s, transform 2s ease 1s",
        pointerEvents: scratched ? "auto" : "none"
      }}>
        <div className="relative isolate overflow-hidden bg-[#F8D6C9]">
          <div className="section-portrait-fade pointer-events-none absolute inset-0" aria-hidden="true">
            <picture className="block h-full w-full">
              <source media="(orientation: portrait)" srcSet={countdownGiftsBackgroundPortrait} />
              <img
                src={countdownGiftsBackground}
                alt=""
                className="countdown-background-art h-full w-full object-cover object-center"
              />
            </picture>
          </div>
          <div className="relative z-10">
            <Countdown />
            <Gifts />
          </div>
        </div>
        <Events />
        <Gallery />
        <Venue />
        <Footer />
      </div>
    </div>
  );
}
