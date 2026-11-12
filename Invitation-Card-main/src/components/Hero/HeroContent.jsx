import { motion } from "framer-motion";
import { useId } from "react";
import weddingData from "../../data/weddingData";
import ScratchPhoto from "./ScratchPhoto";
import namesDateBackground from "../../assets/shiv-parvati-background.png";
import namesDateBackgroundPortrait from "../../assets/shiv-parvati-background-portrait.jpg";
import dateMedallion from "../../assets/round-medallion.webp";
import { useLanguage } from "../../i18n/LanguageContext";
import { getCopy, localizeDate, localizeName } from "../../i18n/translations";

function RevealText({ text, className = "", delay = 0, start = false }) {
  const words = text.split(" ");
  return (
    <motion.span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: start ? 1 : 0, y: start ? 0 : 20 }}
          transition={{ delay: start ? delay + i * 0.15 : 0, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

function RevealName({ text, className = "", delay = 0, start = false }) {
  const letters = typeof Intl.Segmenter === "function"
    ? Array.from(new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text), ({ segment }) => segment)
    : [text];
  return (
    <motion.span className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: start ? 1 : 0, x: start ? 0 : -24 }}
          transition={{ delay: start ? delay + i * 0.06 : 0, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

function OrnamentalLine() {
  return (
    <div className="flex items-center justify-center gap-4" style={{ color: 'var(--accent-pink-2)' }}>
      <span className="h-px w-12 sm:w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(212,165,41,0.12), transparent)' }} />
      <span className="h-1 w-1 rounded-full" style={{ backgroundColor: 'var(--accent-pink-2)', opacity: 0.8 }} />
      <span className="h-px w-12 sm:w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(212,165,41,0.12), transparent)' }} />
    </div>
  );
}

function CircularDate({ dateStr, delay, start, language }) {
  const clean = localizeDate(String(dateStr || "").replace(/[{}]/g, "").trim(), language);
  const cleanUpper = clean.toUpperCase();
  const pathId = `dateCurve-${useId()}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: start ? 1 : 0, scale: start ? 1 : 0.5 }}
      transition={{ delay: start ? delay : 0, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className="hero-date-medallion relative z-10 mx-auto mt-5 mb-8 aspect-square w-[clamp(180px,15vw,205px)]"
      aria-label={`${getCopy(language).hero.dateLabel} ${clean}`}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
      >
        <img
          src={dateMedallion}
          alt=""
          aria-hidden="true"
          className="absolute inset-[7%] z-0 h-[86%] w-[86%] object-contain"
          loading="eager"
        />
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 z-10 h-full w-full overflow-visible"
          role="img"
          aria-label={`${getCopy(language).hero.dateLabel} ${clean}`}
        >
          <path
            id={pathId}
            d="M 50, 50 m -44.5, 0 a 44.5,44.5 0 1,1 89,0 a 44.5,44.5 0 1,1 -89,0"
            fill="transparent"
          />
          <text
            textAnchor="middle"
            style={{
              fontSize: language === "hi" ? "9px" : "11px",
              fontFamily: language === "hi" ? '"Noto Sans Devanagari", sans-serif' : '"Playfair Display", serif',
              fontWeight: 900,
              letterSpacing: "0.035em",
              fill: "#482817",
              stroke: "rgba(255,248,233,0.95)",
              strokeWidth: "0.65px",
              paintOrder: "stroke",
            }}
          >
            <textPath href={`#${pathId}`} startOffset="50%">
              {cleanUpper}
            </textPath>
          </text>
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default function HeroContent({ scratched, onScratched }) {
  const { hero, invitation } = weddingData;
  const language = useLanguage();
  const copy = getCopy(language);
  const brideName = localizeName(hero.bride, language);
  const groomName = localizeName(hero.groom, language);
  const brideRole = language === "hi" ? copy.hero.brideRole : invitation.brideRole;
  const brideParents = language === "hi" ? copy.hero.brideRelation : invitation.brideParents;
  const groomRole = language === "hi" ? copy.hero.groomRole : invitation.groomRole;
  const groomParents = language === "hi" ? copy.hero.groomRelation : invitation.groomParents;

  return (
    <div className="relative z-20">
      <div className="relative h-[100svh]">
        {scratched && (
          <div className="hero-scratch-position absolute left-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-4">
            <ScratchPhoto onScratchComplete={onScratched} />
          </div>
        )}
      </div>

      <motion.div initial={{ opacity: 1 }} className="relative flex w-full flex-col items-center">
        <div className="-mt-[clamp(40px,6svh,64px)] relative flex w-full max-w-none flex-col items-center px-5 pb-[clamp(120px,18svh,220px)] pt-[calc(clamp(40px,6svh,64px)+1.75rem)] sm:px-10 sm:pt-[calc(clamp(40px,6svh,64px)+2.25rem)] md:pb-[clamp(180px,23svh,260px)]">
          <div
            aria-hidden="true"
            className="hero-content-portrait-fade pointer-events-none absolute inset-0 z-0 overflow-hidden"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0px, #000 112px, #000 calc(100% - 160px), transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0px, #000 112px, #000 calc(100% - 160px), transparent 100%)",
            }}
          >
            <picture className="block h-full w-full">
              <source media="(orientation: portrait)" srcSet={namesDateBackgroundPortrait} />
              <img src={namesDateBackground} alt="" className="h-full w-full object-cover object-center" />
            </picture>
          </div>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: scratched ? 1 : 0 }} transition={{ delay: scratched ? 3.5 : 0, duration: 1.2 }} className="relative z-10 mx-auto mt-2">
            <OrnamentalLine />
          </motion.div>

          <h1 className="relative z-10 mt-2 font-script text-[clamp(2.5rem,10vw,6rem)] leading-none text-[#1a1415]">
            <RevealName text={brideName} delay={3.8} start={scratched} />
          </h1>

          <p className="relative z-10 mt-1 text-[10px] uppercase tracking-[0.2em] font-medium text-[#2b1f20]">
            <RevealText text={brideRole} delay={4.2} start={scratched} />
          </p>
          <p lang={language} className="relative z-10 mt-0.5 max-w-[min(92vw,38rem)] text-center text-sm leading-snug sm:text-lg font-bold tracking-wide text-black" style={{ fontFamily: language === "hi" ? '"Mukta", "Noto Sans Devanagari", sans-serif' : '"Playfair Display", serif' }}>
            <RevealText text={brideParents} delay={4.5} start={scratched} />
          </p>

          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: scratched ? 1 : 0, opacity: scratched ? 1 : 0 }} transition={{ delay: scratched ? 5.0 : 0, duration: 1.2 }} className="relative z-10 my-1.5 text-2xl sm:text-4xl font-script font-bold text-[#1a1415]">
            {language === "hi" ? (
              <span className="couple-name-connector" lang="hi">संग</span>
            ) : (
              <span className="ampersand-symbol" lang="en">&amp;</span>
            )}
          </motion.div>

          <h1 className="relative z-10 font-script text-[clamp(2.5rem,10vw,6rem)] leading-none text-[#1a1415]">
            <RevealName text={groomName} delay={5.5} start={scratched} />
          </h1>

          <p className="relative z-10 mt-1 text-[10px] uppercase tracking-[0.2em] font-medium text-[#2b1f20]">
            <RevealText text={groomRole} delay={6.0} start={scratched} />
          </p>
          <p lang={language} className="relative z-10 mt-0.5 max-w-[min(92vw,38rem)] text-center text-sm leading-snug sm:text-lg font-bold tracking-wide text-black" style={{ fontFamily: language === "hi" ? '"Mukta", "Noto Sans Devanagari", sans-serif' : '"Playfair Display", serif' }}>
            <RevealText text={groomParents} delay={6.3} start={scratched} />
          </p>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: scratched ? 1 : 0 }} transition={{ delay: scratched ? 7.0 : 0, duration: 1.2 }} className="relative z-10 mx-auto mt-1 mb-2 border-t border-[#d4a529] w-12 opacity-60"></motion.div>

          <CircularDate dateStr={invitation.date} delay={7.5} start={scratched} language={language} />
        </div>
      </motion.div>
    </div>
  );
}
