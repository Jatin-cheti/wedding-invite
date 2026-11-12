import { motion, useScroll, useTransform } from "framer-motion";

import { useRef } from "react";
import GoldDivider from "../Dividers/GoldDivider";
import weddingData from "../../data/weddingData";

import footerBgDesktop from "../../assets/footer-background-desktop.webp";
import footerBgMobile from "../../assets/footer-background-portrait.webp";
import { useLanguage } from "../../i18n/LanguageContext";
import { getCopy, localizeName } from "../../i18n/translations";

function RevealWords({ text, className = "", delay = 0 }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <motion.span key={i} initial={{ opacity: 0, y: 15, filter: "blur(4px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ delay: delay + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="inline-block mr-[0.25em]">{word}</motion.span>
      ))}
    </span>
  );
}

export default function Footer() {
  const language = useLanguage();
  const copy = getCopy(language);
  const bride = localizeName(weddingData.hero.bride, language);
  const groom = localizeName(weddingData.hero.groom, language);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <footer ref={ref} className="wedding-footer relative overflow-hidden px-6" style={{ backgroundColor: '#F8D6C9', zIndex: 99999, position: 'relative', pointerEvents: 'auto' }}>
      {}
      <div
        className="footer-art-layer section-portrait-fade absolute inset-x-0 top-0 bottom-[116px] pointer-events-none"
        aria-hidden="true"
      >
        <picture className="block h-full w-full">
          <source media="(orientation: portrait)" srcSet={footerBgMobile} />
          <img src={footerBgDesktop} alt="" loading="eager" className="footer-portrait-art h-full w-full object-cover" />
        </picture>
      </div>

      <motion.div initial={{ opacity: 1, y: 0 }} style={{ y, opacity }} className="footer-content relative z-10 mx-auto w-full text-center">
        <div className="footer-main">
        <GoldDivider className="mb-10" />
        <motion.p lang={language} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg italic font-semibold" style={{ color: 'var(--text-primary)' }}>{copy.footer.signoff}</motion.p>
        <motion.h2 key={`footer-names-${language}`} lang={language} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-5 font-script text-[clamp(2.6rem,12vw,4rem)] leading-none font-bold sm:text-6xl" style={{ color: 'var(--text-primary)' }}>
          {bride} {language === "hi" ? <span className="couple-name-connector" lang="hi">संग</span> : <span className="ampersand-symbol" lang="en">&amp;</span>} {groom}
        </motion.h2>
        <p lang={language} className="mx-auto mt-6 max-w-md leading-7 font-semibold" style={{ color: 'var(--text-primary)' }}>
          <RevealWords text={copy.footer.message} delay={0.3} />
        </p>
        </div>
        <nav className="footer-nav" aria-label={language === "hi" ? "पृष्ठ नेविगेशन" : "Page navigation"}>
          <ul className="mx-auto flex max-w-3xl flex-wrap justify-center gap-x-4 gap-y-2 text-sm font-bold">
            <li><a href="#hero" className="uppercase tracking-widest text-sm font-black hover:underline" style={{ color: '#000000' }}>{copy.footer.home}</a></li>
            <li><a href="#countdown" className="uppercase tracking-widest text-sm font-black hover:underline" style={{ color: '#000000' }}>{copy.footer.countdown}</a></li>
            <li><a href="#gifts" className="uppercase tracking-widest text-sm font-black hover:underline" style={{ color: '#000000' }}>{copy.footer.gifts}</a></li>
            <li><a href="#events" className="uppercase tracking-widest text-sm font-black hover:underline" style={{ color: '#000000' }}>{copy.footer.events}</a></li>
            <li><a href="#gallery" className="uppercase tracking-widest text-sm font-black hover:underline" style={{ color: '#000000' }}>{copy.footer.gallery}</a></li>
            <li><a href="#venue" className="uppercase tracking-widest text-sm font-black hover:underline" style={{ color: '#000000' }}>{copy.footer.venue}</a></li>
          </ul>
        </nav>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="footer-credit relative z-20 flex justify-center">
            <p aria-label="Made with love by Jatin" lang="en" className="text-sm font-semibold tracking-wide" style={{ color: '#000000', fontFamily: '"Poppins", sans-serif' }}>
              Made with love by Jatin{" "}
              <span aria-hidden="true" className="mx-1 inline-block">❤️</span>
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
