import ReactDOMServer from 'react-dom/server'
import App from './App'
import reviewsData from './data/reviews.json'

const DOMAIN = 'https://sielskachata.pl'

const reviewsSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Sielska Chata',
  url: DOMAIN,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.6',
    reviewCount: '96',
    bestRating: '5',
  },
  review: reviewsData.map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.name },
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    reviewBody: r.review,
  })),
}

const routesMeta = {
  '/': {
    title: 'Restauracja w Rabce-Zdrój — Sielska Chata | Kuchnia polska',
    description: 'Sielska Chata — restauracja w Rabce-Zdrój z kuchnią polską i europejską. Szeroka karta dań, imprezy okolicznościowe, jedzenie na wynos. Czynne Pon.–Pt. 12–22, Sob. 12–01, Niedz. 12–22. Laureat Orłów Gastronomii 2026.',
    canonical: `${DOMAIN}/`,
    breadcrumb: [],
  },
  '/menu/': {
    title: 'Menu Restauracji — Sielska Chata Rabka-Zdrój',
    description: 'Pełna karta dań Sielskiej Chaty w Rabce-Zdrój. Przystawki, zupy, dania główne, ryby, pierogi, desery i menu dla dzieci. Jedzenie na wynos dostępne Pon.–Pt. 12–22, Sob. 12–01, Niedz. 12–22.',
    canonical: `${DOMAIN}/menu/`,
    breadcrumb: [
      { name: 'Sielska Chata', url: `${DOMAIN}/` },
      { name: 'Menu', url: `${DOMAIN}/menu/` },
    ],
  },
  '/imprezy/': {
    title: 'Imprezy Okolicznościowe Rabka-Zdrój — Sielska Chata',
    description: 'Organizacja komunii, chrzcin, urodzin i bankietów firmowych w Rabce-Zdrój. Klimatyczne wnętrze, kuchnia polska i europejska, bezpłatny parking. Zadzwoń i zarezerwuj termin.',
    canonical: `${DOMAIN}/imprezy/`,
    breadcrumb: [
      { name: 'Sielska Chata', url: `${DOMAIN}/` },
      { name: 'Imprezy', url: `${DOMAIN}/imprezy/` },
    ],
  },
  '/o-nas/': {
    title: 'O nas — Sielska Chata | Restauracja w centrum Rabki-Zdrój',
    description: 'Sielska Chata w Rabce-Zdrój — restauracja rodzinna z kuchnią polską i europejską. Laureat Orłów Gastronomii 2026 z oceną 8.9. Ul. Piłsudskiego 18, czynni Pon.–Pt. 12–22, Sob. 12–01, Niedz. 12–22.',
    canonical: `${DOMAIN}/o-nas/`,
    breadcrumb: [
      { name: 'Sielska Chata', url: `${DOMAIN}/` },
      { name: 'O nas', url: `${DOMAIN}/o-nas/` },
    ],
  },
  '/kontakt/': {
    title: 'Kontakt i Rezerwacja — Sielska Chata Rabka-Zdrój',
    description: 'Kontakt z restauracją Sielska Chata w Rabce-Zdrój. Tel: +48 780 285 859. Czynni Pon.–Pt. 12:00–22:00, Sob. 12:00–01:00, Niedz. 12:00–22:00. Ul. Piłsudskiego 18, 34-700 Rabka-Zdrój. Bezpłatny parking.',
    canonical: `${DOMAIN}/kontakt/`,
    breadcrumb: [
      { name: 'Sielska Chata', url: `${DOMAIN}/` },
      { name: 'Kontakt', url: `${DOMAIN}/kontakt/` },
    ],
  },
  '/opinie/': {
    title: 'Opinie — Sielska Chata | Google 4.6/5, Orły Gastronomii 8.9',
    description: 'Przeczytaj opinie gości Sielskiej Chaty w Rabce-Zdrój. Ocena 4.6/5 na Google (96 opinii). Laureaci Orłów Gastronomii 2026 z oceną 8.9. Zostaw swoją opinię.',
    canonical: `${DOMAIN}/opinie/`,
    breadcrumb: [
      { name: 'Sielska Chata', url: `${DOMAIN}/` },
      { name: 'Opinie', url: `${DOMAIN}/opinie/` },
    ],
    additionalSchema: reviewsSchema,
  },
}

export function getRoutes() {
  return Object.keys(routesMeta)
}

export function getRouteMeta(path) {
  return routesMeta[path] || routesMeta['/']
}

export function render(path) {
  const meta = routesMeta[path] || routesMeta['/']
  const html = ReactDOMServer.renderToString(
    <App ssrPath={path} />
  )
  return { html, meta }
}
