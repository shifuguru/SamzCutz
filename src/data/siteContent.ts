export const bookingLink = "#booking";
export const directionsLink = "https://maps.google.com/?q=Samzcutz+99+Taranaki+Street+Wellington";

export const heroContent = {
  headlineOptions: [
    "Precision cuts. Quiet luxury.",
    "Modern gentleman's grooming — done properly.",
    "Crafted fades. Sculpted beards. Premium finish."
  ],
  featuredHeadline: "Precision cuts. Quiet luxury.",
  subheadline: "Te Aro's discreet grooming atelier with direct requests to Samuel Diaz.",
  badge: "5.0 ★ (95+) — independently reviewed"
};

export const services = [
  {
    name: "Weekday beard trimming/shave",
    duration: "20 mins",
    price: "NZ$35",
    description: "Steam prep, precision line work, and a chilled eucalyptus finish.",
    availability: "Mon–Fri"
  },
  {
    name: "Weekend/after-hours beard trimming/shave",
    duration: "30 mins",
    price: "NZ$45",
    description: "Extended ritual with hot towels, blade detailing, and fragrance finish.",
    availability: "Sat–Sun & after 6pm"
  },
  {
    name: "Razor/Style Design",
    duration: "10 mins",
    price: "NZ$10",
    description: "Greek-key accents, logos, or razor detailing to finish your fade.",
    availability: "Add-on"
  },
  {
    name: "Scalp therapy add-on",
    duration: "15 mins",
    price: "NZ$20",
    description: "CBD-infused scalp massage and tonic finish for stressed skin.",
    availability: "Add-on"
  },
  {
    name: "After-hours weekend haircut + beard",
    duration: "1h 20m",
    price: "NZ$85",
    description: "Full restyle, beard sculpting, and complimentary styling consultation.",
    availability: "Premium slot"
  },
  {
    name: "Tailored haircut experience",
    duration: "45 mins",
    price: "NZ$65",
    description: "Placeholder for additional haircut services. Update via siteContent.ts.",
    availability: "Weeklong"
  }
];

export const aboutContent = {
  title: "Craft refined. Culture honored.",
  body: [
    "Samuel Diaz brings Colombian warmth, Italian tailoring, and 1950s New York precision to Wellington's creative quarter.",
    "Expect a ritual built on hot towels, bespoke fragrances, and razor work honed over a decade behind the chair.",
    "Every service is timed, tuned, and tailored to deliver a composed look that reads executive at noon and effortless after hours."
  ],
  highlights: [
    "Single-chair focus for uninterrupted service",
    "Complimentary espresso or cold brew",
    "Premium grooming range sourced from Bogotá & Milan"
  ]
};

export const galleryImages = [
  {
    src: "/placeholders/gallery-1.svg",
    label: "Sculpted fades"
  },
  {
    src: "/placeholders/gallery-2.svg",
    label: "Beard detailing"
  },
  {
    src: "/placeholders/gallery-3.svg",
    label: "Razor design"
  }
];

export const testimonials = [
  {
    quote: "Samuel is meticulous. Every fade feels bespoke and holds its shape for weeks.",
    name: "Liam T.",
    source: "from Fresha"
  },
  {
    quote: "The after-hours service is a blessing. Hot towel, espresso, and zero rush.",
    name: "Carlos J.",
    source: "from Fresha"
  },
  {
    quote: "I've never had a beard sculpted with this level of symmetry. The compliments keep coming.",
    name: "Noah P.",
    source: "from Fresha"
  }
];

export const operatingHours = [
  { day: "Mon", range: "12:00–17:00" },
  { day: "Tue", range: "12:00–19:00" },
  { day: "Wed", range: "12:00–18:30" },
  { day: "Thu", range: "12:00–19:00" },
  { day: "Fri", range: "12:00–18:00" },
  { day: "Sat", range: "13:30–16:30" },
  { day: "Sun", range: "13:30–16:30" }
];

export const locationInfo = {
  address: "99 Taranaki Street, Te Aro, Wellington 6011, New Zealand",
  shortAddress: "99 Taranaki Street, Te Aro",
  neighborhood: "Te Aro, Wellington",
  phone: "027 346 8101"
};

export const metadata = {
  ctaPrimary: {
    label: "Request appointment",
    href: bookingLink
  },
  ctaSecondary: {
    label: "Get directions",
    href: directionsLink
  }
};

export const bookingSettings = {
  title: "Request an appointment",
  subtitle: "Sammy reviews every submission personally. Expect a follow-up within the same day to confirm your chair time.",
  responseTime: "Replies within 2–6 business hours",
  email: "hello@samzcutz.com",
  phone: "027 346 8101",
  note: "Payments are handled in-studio. Please bring card or cash on the day.",
  maxAdvanceDays: 21,
  submissionEndpoint: import.meta.env.VITE_BOOKING_WEBHOOK ?? ""
};

export const bookingCatalog = [
  {
    id: "weekday-cut",
    name: "Weekday haircut + finish",
    duration: "45 mins",
    durationMinutes: 45,
    price: "NZ$65",
    priceValue: 65,
    description: "Classic fade or tailored scissor work, available Monday through Friday.",
    tags: ["Weekday", "Fade", "Executive"],
    serviceType: "cut"
  },
  {
    id: "weekend-cut",
    name: "Weekend / after-hours haircut",
    duration: "50 mins",
    durationMinutes: 50,
    price: "NZ$85",
    priceValue: 85,
    description: "Premium slots for Saturdays, Sundays, or after 6pm on request.",
    tags: ["Weekend", "Premium"],
    serviceType: "cut"
  },
  {
    id: "weekday-beard",
    name: "Weekday beard ritual",
    duration: "20 mins",
    durationMinutes: 20,
    price: "NZ$35",
    priceValue: 35,
    description: "Steam prep, precision line work, and chilled eucalyptus splash.",
    tags: ["Weekday", "Beard"],
    serviceType: "beard"
  },
  {
    id: "weekend-beard",
    name: "Weekend beard ritual",
    duration: "30 mins",
    durationMinutes: 30,
    price: "NZ$45",
    priceValue: 45,
    description: "Extended ritual with hot towels, blade detailing, and fragrance finish.",
    tags: ["Weekend", "Beard"],
    serviceType: "beard"
  },
  {
    id: "razor-detail",
    name: "Razor detailing add-on",
    duration: "10 mins",
    durationMinutes: 10,
    price: "NZ$10",
    priceValue: 10,
    description: "Greek-key accents, micro logos, or razor-sculpted patterns.",
    tags: ["Add-on", "Design"],
    serviceType: "addon"
  },
  {
    id: "scalp-therapy",
    name: "Scalp therapy add-on",
    duration: "15 mins",
    durationMinutes: 15,
    price: "NZ$20",
    priceValue: 20,
    description: "CBD-infused scalp massage and tonic finish for stressed skin.",
    tags: ["Add-on", "Care"],
    serviceType: "addon"
  },
  {
    id: "full-service-premium",
    name: "After-hours haircut + beard",
    duration: "80 mins",
    durationMinutes: 80,
    price: "NZ$120",
    priceValue: 120,
    description: "Full restyle with beard sculpting, espresso, and fragrance consultation.",
    tags: ["After-hours", "Premium"],
    serviceType: "signature"
  }
];

export const bookingSchedule = {
  monday: {
    label: "Monday",
    slots: ["12:00", "12:45", "13:30", "14:15", "15:00", "15:45", "16:30"],
    services: ["weekday-cut", "weekday-beard", "razor-detail", "scalp-therapy"],
    note: "Weekday rates apply"
  },
  tuesday: {
    label: "Tuesday",
    slots: ["12:00", "12:45", "13:30", "14:15", "15:00", "15:45", "16:30", "17:15", "18:00", "18:45"],
    services: ["weekday-cut", "weekday-beard", "razor-detail", "scalp-therapy", "full-service-premium"],
    note: "Extended evening slots mirror the Fresha roster"
  },
  wednesday: {
    label: "Wednesday",
    slots: ["12:00", "12:45", "13:30", "14:30", "15:15", "16:00", "16:45"],
    services: ["weekday-cut", "weekday-beard", "razor-detail", "scalp-therapy"],
    note: "Single-chair focus"
  },
  thursday: {
    label: "Thursday",
    slots: ["12:00", "12:45", "13:30", "14:15", "15:00", "15:45", "16:30", "17:15", "18:00", "18:45"],
    services: ["weekday-cut", "weekday-beard", "razor-detail", "scalp-therapy", "full-service-premium"],
    note: "After 6pm incurs premium pricing"
  },
  friday: {
    label: "Friday",
    slots: ["12:00", "12:45", "13:30", "14:15", "15:00", "16:00", "17:00"],
    services: ["weekday-cut", "weekday-beard", "razor-detail", "scalp-therapy", "full-service-premium"],
    note: "Popular end-of-week resets"
  },
  saturday: {
    label: "Saturday",
    slots: ["13:30", "14:15", "15:00", "15:45", "16:30"],
    services: ["weekend-cut", "weekend-beard", "razor-detail", "scalp-therapy", "full-service-premium"],
    note: "Weekend premium enforced"
  },
  sunday: {
    label: "Sunday",
    slots: ["13:30", "14:15", "15:00", "15:45"],
    services: ["weekend-cut", "weekend-beard", "razor-detail", "scalp-therapy"],
    note: "Limited Sunday ritual"
  }
} as const;
