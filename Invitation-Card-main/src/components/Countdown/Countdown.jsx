import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import cardBackground from "../../assets/ornate-card-background.webp";
import { useLanguage } from "../../i18n/LanguageContext";
import { getCopy } from "../../i18n/translations";

const WEDDING_TIMESTAMP = new Date("2026-12-11T00:00:00").getTime();

function getTimeLeft(now = Date.now()) {
  const difference = Math.max(0, WEDDING_TIMESTAMP - now);
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function ScrollRevealText({ children, className = "" }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>
  );
}

function CountdownUnit({ value, label }) {
  const displayValue = String(value).padStart(2, "0");
  return (
    <div className="text-center">
      <p
        className="min-w-[2ch] font-heading text-3xl leading-none tabular-nums sm:text-4xl md:text-5xl"
        style={{ color: "var(--text-primary)" }}
      >
        {displayValue}
      </p>
      <p className="mt-2 text-[10px] uppercase tracking-[4px] sm:text-xs" style={{ color: "var(--accent-pink-2)", opacity: 0.7 }}>
        {label}
      </p>
    </div>
  );
}

export default function Countdown() {
  const language = useLanguage();
  const copy = getCopy(language);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const updateTimeLeft = () => setTimeLeft(getTimeLeft());
    updateTimeLeft();
    const timer = setInterval(() => {
      updateTimeLeft();
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="countdown" ref={sectionRef} className="relative overflow-hidden bg-transparent px-5 py-20">
      <motion.div style={{ scale, opacity, backgroundImage: `url(${cardBackground})`, backgroundSize: "100% 100%", backgroundPosition: "center", backgroundRepeat: "no-repeat", borderRadius: '35px', border: '1px solid var(--border-accent)' }} className="relative z-10 mx-auto max-w-4xl shadow-2xl px-4 py-12 sm:px-12">
        <ScrollRevealText className="text-center"><p className="uppercase tracking-[7px] text-xs" style={{ color: 'var(--accent-pink-2)', opacity: 0.7 }}>{copy.countdown.eyebrow}</p></ScrollRevealText>
        <ScrollRevealText className="text-center"><h2 className="mt-4 font-script text-4xl sm:text-5xl" style={{ color: 'var(--text-primary)' }}>{copy.countdown.title}</h2></ScrollRevealText>
        <div className="mx-auto mt-6 h-[1px] w-16" style={{ background: 'linear-gradient(to right, transparent, var(--accent-pink-2), transparent)' }} />
        <div className="mt-8 flex justify-center items-center gap-2 sm:gap-5 md:gap-10">
          <CountdownUnit value={timeLeft.days} label={copy.countdown.days} /><span aria-hidden="true" className="text-xl" style={{ color: 'var(--accent-pink-2)' }}>:</span>
          <CountdownUnit value={timeLeft.hours} label={copy.countdown.hours} /><span aria-hidden="true" className="text-xl" style={{ color: 'var(--accent-pink-2)' }}>:</span>
          <CountdownUnit value={timeLeft.minutes} label={copy.countdown.minutes} /><span aria-hidden="true" className="text-xl" style={{ color: 'var(--accent-pink-2)' }}>:</span>
          <CountdownUnit value={timeLeft.seconds} label={copy.countdown.seconds} />
        </div>
      </motion.div>
    </section>
  );
}
