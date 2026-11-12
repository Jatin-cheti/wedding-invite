import { useState } from "react";
import { motion } from "framer-motion";
import { Image } from "lucide-react";

import galleryBgDesktop from "../../assets/gallerybd.png";
import galleryBgMobile from "../../assets/gallery-background-portrait.webp";
import galleryPhoto1 from "../../assets/gallery-photo-1.webp";
import galleryPhoto2 from "../../assets/gallery-photo-2.webp";
import galleryPhoto3 from "../../assets/gallery-photo-3.webp";
import galleryPhoto4 from "../../assets/gallery-photo-4.webp";
import galleryPhoto5 from "../../assets/gallery-photo-5.webp";
import { useLanguage } from "../../i18n/LanguageContext";
import { getCopy } from "../../i18n/translations";

const galleryImages = [
    { id: 1, src: galleryPhoto1, alt: "Couple smiling together on a mountain balcony" },
    { id: 2, src: galleryPhoto2, alt: "Couple taking a portrait together at their celebration" },
    { id: 3, src: galleryPhoto3, alt: "Couple standing beneath a floral wedding arch" },
    { id: 4, src: galleryPhoto4, alt: "Couple posing together against a mountain view" },
    { id: 5, src: galleryPhoto5, alt: "Couple with family on a decorated wedding stage" },
];

function GalleryCard({ image, paused, language }) {
    const copy = getCopy(language);
    const alt = language === "hi" ? `${copy.gallery.alt} ${image.id}` : image.alt;
    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            className="group relative flex min-h-[300px] w-[240px] md:w-[320px] lg:w-[360px] shrink-0 flex-col overflow-hidden rounded-[1.75rem] p-3 md:p-4 text-left transition-all duration-300"
            style={{
                opacity: paused ? 0.9 : 1,
                border: '1px solid rgba(212,165,41,0.06)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.12)',
                background: 'radial-gradient(circle at top, rgba(212,165,41,0.05), transparent 60%)',
            }}
        >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] border" style={{ borderColor: 'rgba(255,255,255,0.06)', backgroundColor: 'var(--bg-base)' }}>
                {image.src ? (
                    <img src={image.src} alt={alt} loading="eager" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" style={{ pointerEvents: 'none' }} />
                ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center" style={{ background: 'radial-gradient(circle at top, rgba(212,165,41,0.12), transparent 60%)' }}>
                        <Image size={34} className="" style={{ color: 'var(--accent-pink-2)', opacity: 0.3 }} />
                        <p className="mt-3 text-[10px] uppercase tracking-[0.35em]" style={{ color: 'var(--accent-pink-2)', opacity: 0.3 }}>Photo {image.id}</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default function Gallery() {
    const language = useLanguage();
    const copy = getCopy(language);
    const [paused, setPaused] = useState(false);
    const trackImages = [...galleryImages, ...galleryImages];

    return (
        <section id="gallery" className="relative px-5 py-20 md:px-8 overflow-hidden" style={{ backgroundColor: '#F8D6C9' }}>

            {}
            <div
                className="gallery-background-fade absolute inset-0 pointer-events-none"
                aria-hidden="true"
            >
                <picture className="block h-full w-full">
                    <source media="(orientation: portrait)" srcSet={galleryBgMobile} />
                    <img src={galleryBgDesktop} alt="" loading="eager" className="gallery-background-art h-full w-full object-cover" />
                </picture>
            </div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative z-10 mb-12 text-center">
                <p className="text-xs uppercase tracking-[8px] font-bold text-black opacity-80">{copy.gallery.tag}</p>
                <h2 className="mt-4 font-script text-5xl" style={{ color: 'var(--text-primary)' }}>{copy.gallery.title}</h2>
                <div className="mx-auto mt-4 h-px w-24" style={{ background: 'linear-gradient(to right, transparent, rgba(212,165,41,0.12), transparent)' }} />
            </motion.div>

            {}
            <div className="relative z-10">
                <div className="mx-auto max-w-[1600px] overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onTouchStart={() => setPaused(true)} onTouchEnd={() => setPaused(false)}>
                    <div className="flex w-fit">
                        <motion.div className="flex gap-4 md:gap-8 px-2 md:px-4" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 35, ease: "linear", repeat: Infinity, repeatType: "loop" }} style={{ animationPlayState: paused ? 'paused' : 'running' }}>
                            {trackImages.map((img, i) => (
                                <GalleryCard key={`${img.id}-${i}`} image={img} paused={paused} language={language} />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
            {/* Click-to-zoom disabled: no modal rendered */}
        </section>
    );
}
