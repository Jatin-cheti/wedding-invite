import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import { useRef } from "react";
import details from "../../data/details.json";
import venueBgDesktop from "../../assets/venue-background-desktop.webp";
import venueBgMobile from "../../assets/venue-background-mobile.webp";
import venuePhoto from "../../assets/triyuginarayan-temple.webp";
import cardBackground from "../../assets/ornate-card-background.webp";
import { useLanguage } from "../../i18n/LanguageContext";
import { getCopy } from "../../i18n/translations";
function ScrollRevealText({ children, className = "", delay = 0 }) {
  return (<motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>);
}

export default function Venue() {
  const language = useLanguage();
  const copy = getCopy(language);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <section ref={ref} id="venue" className="relative py-20 px-5 md:px-8 overflow-hidden" style={{ backgroundColor: '#F8D6C9' }}>
      { }
      <div
        className="section-portrait-fade absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <picture className="block h-full w-full">
          <source media="(orientation: portrait)" srcSet={venueBgMobile} />
          <img src={venueBgDesktop} alt="" loading="eager" className="h-full w-full object-cover" />
        </picture>
      </div>

      <motion.div style={{ scale, opacity, y }} className="relative z-10 mx-auto max-w-4xl">
        <div className="venue-card-stage flex justify-center pt-8">
          <div className="relative w-full max-w-2xl rounded-2xl p-4 transition-all duration-500 hover:-translate-y-2" style={{ backgroundImage: `url(${cardBackground})`, backgroundSize: "100% 100%", backgroundPosition: "center", backgroundRepeat: "no-repeat", border: '1px solid rgba(212,165,41,0.2)', boxShadow: '0 25px 60px rgba(0,0,0,0.1)' }}>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30">
              <span className="inline-block rounded-full px-8 py-3 text-xs uppercase tracking-[5px] shadow-lg" style={{ border: '1px solid rgba(0,0,0,0.06)', background: 'var(--bg-card)', color: 'var(--text-secondary)', boxShadow: '0 6px 14px rgba(0,0,0,0.1)' }}>{copy.venue.tag}</span>
            </div>
            <img src={venuePhoto} alt={copy.venue.name} loading="eager" className="h-[320px] w-full rounded-xl object-cover md:h-[430px]" />
            <div className="pt-6 px-2">
              <ScrollRevealText><h2 className="font-heading text-3xl md:text-4xl" style={{ color: 'var(--text-primary)' }}>{copy.venue.name}</h2></ScrollRevealText>
              <ScrollRevealText delay={0.1}><p className="mt-3 flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}><MapPin size={18} style={{ color: 'var(--accent-pink-2)' }} />{copy.venue.location}</p></ScrollRevealText>
              <div className="my-6"><span className="block h-px w-full" style={{ backgroundColor: 'rgba(212,165,41,0.3)' }} /></div>
              <ScrollRevealText delay={0.2}><p className="leading-7" style={{ color: 'var(--text-secondary)' }}>{copy.venue.address}</p></ScrollRevealText>
              <ScrollRevealText delay={0.3}>
                <a href={details.venueMapLink} target="_blank" rel="noopener noreferrer" aria-label={`${copy.venue.map}: ${copy.venue.mapAlt}`} className="mt-4 inline-flex min-h-14 items-center gap-3 rounded-full px-8 py-4 text-base font-semibold shadow-sm transition-all duration-300 hover:-translate-y-0.5" style={{ border: '1px solid rgba(212,165,41,0.25)', color: 'var(--accent-pink-2)', background: 'rgba(255,255,255,0.58)' }}>
                  {copy.venue.map} <ExternalLink size={18} />
                </a>
              </ScrollRevealText>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
