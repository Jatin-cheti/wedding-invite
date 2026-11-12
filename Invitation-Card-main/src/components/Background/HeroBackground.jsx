import heroBackground from "../../assets/ganesh-intro-background-bells.png";
import mobileHeroBackground from "../../assets/ganesh-intro-background-portrait.webp";

export default function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[100svh] overflow-hidden bg-[#F8D6C9]">
      <picture className="block h-full w-full">
        <source media="(orientation: portrait)" srcSet={mobileHeroBackground} />
        <img
          src={heroBackground}
          alt="Pastel Indian wedding illustration"
          className="hero-portrait-fade h-full w-full object-cover object-center"
          style={{
            maskImage: "linear-gradient(to bottom, #000 0%, #000 calc(100% - 112px), transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 calc(100% - 112px), transparent 100%)",
          }}
          loading="eager"
        />
      </picture>
    </div>
  );
}
