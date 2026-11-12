import eventsData from "./eventsData";
import eventsBackground from "../../assets/events-background.webp";
import eventsBackgroundTablet from "../../assets/events-background-tablet.webp";
import eventsBackgroundMobile from "../../assets/events-background-mobile.webp";
import { useLanguage } from "../../i18n/LanguageContext";
import { getCopy, localizeDate, localizeTime } from "../../i18n/translations";

function CurvedConnector({ fromLeft }) {
  const startX = fromLeft ? 140 : 460;
  const startY = 40;
  const endX = fromLeft ? 500 : 100;
  const endY = 106;
  const cpX1 = fromLeft ? 260 : 340;
  const cpX2 = fromLeft ? 360 : 240;
  const wavePath = `M ${startX} ${startY} C ${cpX1} ${startY}, ${cpX2} ${endY}, ${endX} ${endY}`;

  return (
    <svg viewBox="0 0 600 140" className="events-curved-connector w-full h-24 md:h-28" preserveAspectRatio="none" fill="none">
      <path
        d={wavePath}
        stroke="var(--accent-pink)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={0.95}
      />
    </svg>
  );
}

export default function Events() {
  const language = useLanguage();
  const copy = getCopy(language);

  return (
    <section id="events" className="events-section relative px-6 pt-20 pb-160 overflow-hidden bg-[#F8D6C9]">
      <div className="section-portrait-fade absolute inset-0 pointer-events-none" aria-hidden="true">
        <picture className="absolute inset-0 block h-full w-full">
          <source media="(max-width: 480px) and (orientation: portrait)" srcSet={eventsBackgroundMobile} />
          <source media="(orientation: portrait)" srcSet={eventsBackgroundTablet} />
          <img
            src={eventsBackground}
            alt=""
            loading="eager"
            className="events-background-art h-full w-full object-cover object-center"
          />
        </picture>
      </div>

      <div className="events-heading relative z-10 text-center mb-12">
        <p className="text-xs uppercase tracking-[6px] font-bold text-black opacity-80 decoration-black">{copy.events.tag}</p>
        <h2 className="events-title mt-3 font-script text-4xl md:text-5xl" style={{ color: 'var(--text-primary)' }}>{copy.events.title}</h2>
        <div className="mx-auto mt-4 h-px w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(212,165,41,0.12), transparent)' }} />
      </div>

      <div className="events-timeline relative z-10 mx-auto max-w-3xl">
        <div className="events-scroll-indicator" aria-hidden="true" />
        {eventsData.map((event, index) => {
          const isLeft = index % 2 === 0;
          const title = copy.events.titles[event.title] || event.title;
          return (
            <article className="events-timeline-item" key={index}>
              <span className="events-timeline-marker" aria-hidden="true" />
              <div className={`events-item-layout relative flex items-center gap-6 md:gap-10 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:flex-row`}>
                <div className="event-photo-wrap relative flex-shrink-0">
                  <div className="event-photo-frame relative w-40 h-40 md:w-48 md:h-48">
                    <div className="absolute inset-0 overflow-hidden blob-shape" style={{ background: `linear-gradient(135deg, var(--accent-pink-2) 0%, rgba(255,255,255,0) 60%)` }}>
                      {event.image ? (
                          <img src={event.image} alt={title} loading="eager" className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center border border-white/30 bg-white/10 text-[10px] uppercase tracking-[3px] text-white/50">
                          Add Photo
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className={`events-details flex-1 ${isLeft ? "md:text-left" : "md:text-right"} text-center`}>
                  <h3 className="font-heading text-xl md:text-2xl" style={{ color: 'var(--text-primary)' }}>{title}</h3>
                  <div className={`mt-2 flex items-center gap-2 ${isLeft ? "md:justify-start" : "md:justify-end"} justify-center`}>
                    <p className="text-sm tracking-[2px] uppercase font-bold text-black opacity-80">{localizeDate(event.date, language)}</p>
                  </div>
                  <div className={`mt-1 flex items-center gap-2 ${isLeft ? "md:justify-start" : "md:justify-end"} justify-center`}>
                    <p className="text-xs tracking-wider font-bold text-black opacity-80">{localizeTime(event.time, language)}</p>
                  </div>
                </div>
              </div>

              {index < eventsData.length - 1 && <CurvedConnector fromLeft={isLeft} index={index} />}
            </article>
          );
        })}
      </div>
    </section>
  );
}
