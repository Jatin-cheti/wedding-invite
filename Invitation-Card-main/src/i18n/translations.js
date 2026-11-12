const copy = {
  en: {
    toggle: { group: "Choose language", english: "English", hindi: "Hindi" },
    hero: { brideRole: "Daughter of", groomRole: "Son of", dateLabel: "Wedding date" },
    countdown: {
      eyebrow: "Counting down to forever",
      title: "Our Wedding Day",
      days: "Days",
      hours: "Hours",
      minutes: "Min",
      seconds: "Sec",
    },
    gifts: {
      tag: "Gifts",
      title: "A Little Surprise",
      instruction: "Scratch the card below.",
      scratch: "Scratch here",
      thankYou: "Thank You",
      presence: "Your presence",
      greatestGift: "is the greatest gift.",
      closing: "We can't wait to celebrate with you.",
    },
    events: {
      tag: "Our Events",
      title: "Wedding Festivities",
      titles: {
        "Haldi Ceremony": "Haldi Ceremony",
        "Mehendi & Sangeet Ceremony": "Mehendi & Sangeet Ceremony",
        "Wedding Ceremony": "Wedding Ceremony",
        Reception: "Reception",
      },
    },
    gallery: { tag: "Captured Moments", title: "Our Gallery", alt: "Wedding celebration photo" },
    venue: {
      tag: "Venue",
      name: "Triyuginarayan Temple",
      location: "Rudraprayag, Uttarakhand",
      address: "Triyuginarayan Village, Rudraprayag district, Uttarakhand",
      map: "View on Google Maps",
      mapAlt: "Map location of Triyuginarayan Temple in Rudraprayag, Uttarakhand",
    },
    footer: {
      signoff: "With all our love,",
      message: "Thank you for celebrating with us. Your love, blessings and presence are the greatest gifts we could ask for.",
      home: "Home",
      countdown: "Countdown",
      gifts: "Gifts",
      events: "Events",
      gallery: "Gallery",
      venue: "Venue",
      credit: "Made with love by Jatin",
    },
    scratchPhoto: "Scratch to reveal",
  },
  hi: {
    toggle: { group: "भाषा चुनें", english: "English", hindi: "हिन्दी" },
    hero: { brideRole: "श्रीमती सुनीता राणा एवं श्री धरमवीर सिंह राणा की", groomRole: "श्रीमती संगीता देवी एवं स्वर्गीय श्री धर्मेंद्र प्रसाद के", brideRelation: "सुपुत्री", groomRelation: "सुपुत्र", dateLabel: "विवाह की तिथि" },
    countdown: {
      eyebrow: "शुभ विवाह तक शेष समय",
      title: "विवाह का शुभ दिवस",
      days: "दिन",
      hours: "घंटे",
      minutes: "मिनट",
      seconds: "सेकंड",
    },
    gifts: {
      tag: "शुभाशीष",
      title: "एक छोटी-सी भेंट",
      instruction: "नीचे दिए कार्ड को खुरचकर देखें।",
      scratch: "खुरचकर देखें",
      thankYou: "हार्दिक आभार",
      presence: "आपकी उपस्थिति",
      greatestGift: "हमारे लिए सबसे अनमोल उपहार है।",
      closing: "इस शुभ अवसर पर आपके साथ का हमें इंतज़ार रहेगा।",
    },
    events: {
      tag: "विवाह के कार्यक्रम",
      title: "शुभ विवाह समारोह",
      titles: {
        "Haldi Ceremony": "हल्दी समारोह",
        "Mehendi & Sangeet Ceremony": "मेहंदी एवं संगीत संध्या",
        "Wedding Ceremony": "विवाह संस्कार",
        Reception: "स्वागत समारोह",
      },
    },
    gallery: { tag: "यादगार पल", title: "हमारी तस्वीरें", alt: "विवाह समारोह की तस्वीर" },
    venue: {
      tag: "विवाह स्थल",
      name: "त्रियुगीनारायण मंदिर",
      location: "रुद्रप्रयाग, उत्तराखंड",
      address: "त्रियुगीनारायण गाँव, ज़िला रुद्रप्रयाग, उत्तराखंड",
      map: "गूगल मैप्स पर देखें",
      mapAlt: "रुद्रप्रयाग, उत्तराखंड स्थित त्रियुगीनारायण मंदिर का मानचित्र",
    },
    footer: {
      signoff: "स्नेह सहित,",
      message: "हमारे इस शुभ अवसर पर पधारने और अपना स्नेह एवं आशीर्वाद देने के लिए आपका हार्दिक धन्यवाद। आपकी उपस्थिति हमारे लिए अनमोल है।",
      home: "मुखपृष्ठ",
      countdown: "शुभ दिन की उलटी गिनती",
      gifts: "शुभाशीष",
      events: "कार्यक्रम",
      gallery: "स्मृतियाँ",
      venue: "विवाह स्थल",
      credit: "जतिन द्वारा सप्रेम निर्मित",
    },
    scratchPhoto: "खुरचकर देखें",
  },
};

const hindiMonths = {
  January: "जनवरी", February: "फ़रवरी", March: "मार्च", April: "अप्रैल",
  May: "मई", June: "जून", July: "जुलाई", August: "अगस्त",
  September: "सितंबर", October: "अक्टूबर", November: "नवंबर", December: "दिसंबर",
};

export const getCopy = (language) => copy[language] || copy.en;

export function localizeDate(value, language) {
  if (language !== "hi") return value;
  const match = String(value).match(/^(?:(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),?\s+)?(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (!match) return value;
  const [, weekday, day, month, year] = match;
  const hindiWeekdays = {
    Monday: "सोमवार", Tuesday: "मंगलवार", Wednesday: "बुधवार", Thursday: "गुरुवार",
    Friday: "शुक्रवार", Saturday: "शनिवार", Sunday: "रविवार",
  };
  const date = `${day} ${hindiMonths[month] || month} ${year}`;
  return weekday ? `${hindiWeekdays[weekday]}, ${date}` : date;
}

export function localizeTime(value, language) {
  if (language !== "hi") return value;
  const match = String(value).match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return value;
  const [, hour, minute, period] = match;
  const timeOfDay = period.toUpperCase() === "AM" ? "प्रातः" : "सायं";
  return `${timeOfDay} ${hour}:${minute} बजे`;
}

export function localizeName(value, language) {
  if (language !== "hi") return value;
  const names = { Sakshi: "साक्षी", Abhishek: "अभिषेक" };
  return names[value] || value;
}
