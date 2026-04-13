// ─── CONTACT DATA — Sielska Chata ────────────────────────────────────────────
// Single source of truth for all contact and NAP (Name/Address/Phone) data.
// Update here and changes propagate across the entire site.

export const CONTACT = {
  name: 'Sielska Chata',

  address: {
    street: 'ul. Piłsudskiego 18',
    postalCode: '34-700',
    city: 'Rabka-Zdrój',
    /** Full formatted address — use for display and NAP citations */
    full: 'ul. Piłsudskiego 18, 34-700 Rabka-Zdrój',
  },

  phone: {
    /** Display format — used in visible text */
    display: '+48 780 285 859',
    /** href value for <a href> */
    href: 'tel:+48780285859',
    /** E.164 format — used in JSON-LD schema */
    schema: '+48780285859',
  },

  hours: {
    /** Full display string */
    display: 'Pon.–Pt. 12:00–22:00, Sob. 12:00–01:00, Niedz. 12:00–22:00',
    /** Short version for compact UI */
    short: '12:00–22:00 / 01:00',
    /** Detailed schedule for list views */
    schedule: [
      { days: 'Poniedziałek – Piątek', time: '12:00 – 22:00' },
      { days: 'Sobota', time: '12:00 – 01:00' },
      { days: 'Niedziela', time: '12:00 – 22:00' },
    ],
  },

  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61584598020581',
  },

  maps: {
    /** Google Maps navigation link */
    googleMaps: 'https://maps.google.com/?q=Sielska+Chata+Rabka-Zdr%C3%B3j',
  },

  geo: {
    latitude: 49.60580,
    longitude: 19.96110,
  },

  website: 'https://www.sielskachatarabka.pl',
}
