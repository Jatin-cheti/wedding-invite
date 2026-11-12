import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLenis } from "lenis/react";
import { useLanguage } from "../i18n/LanguageContext";

export default function ScrollIndicator({ enabled }) {
  const lenis = useLenis();
  const language = useLanguage();
  const [isNearTop, setIsNearTop] = useState(true);

  useEffect(() => {
    const updateVisibility = () => setIsNearTop(window.scrollY < 80);

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToInvitation = () => {
    const target = document.getElementById("countdown") || document.getElementById("events");
    if (!target) return;

    if (lenis?.scrollTo) {
      lenis.scrollTo(target, { offset: -20, duration: 1.25 });
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const label = language === "hi" ? "नीचे स्क्रॉल करें" : "SCROLL";
  const accessibleLabel = language === "hi"
    ? "आगे देखने के लिए नीचे स्क्रॉल करें"
    : "Scroll down to continue";

  return (
    <AnimatePresence initial={false}>
      {enabled && isNearTop && (
        <motion.button
          type="button"
          className="scroll-cue"
          aria-label={accessibleLabel}
          lang={language === "hi" ? "hi" : "en"}
          initial={{ opacity: 0, y: 12, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          onClick={scrollToInvitation}
        >
          <span className="scroll-cue-shell" aria-hidden="true">
            <span className="scroll-cue-track">
              <span className="scroll-cue-bead" />
            </span>
            <ChevronDown className="scroll-cue-arrow" size={15} strokeWidth={2.5} />
          </span>
          <span className="scroll-cue-label">{label}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
