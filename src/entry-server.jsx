import ReactDOMServer from 'react-dom/server'
import App from './App'
import reviewsData from './data/reviews.json'

const DOMAIN = 'https://www.sielskachatarabka.pl'

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
    description: 'Sielska Chata w Rabce-Zdrój to najlepsza kuchnia polska i europejska. Szeroka karta dań, imprezy okolicznościowe i jedzenie na wynos. Laureat Orłów Gastronomii.',
    keywords: 'restauracja Rabka-Zdrój, kuchnia polska, kuchnia europejska, Sielska Chata, obiad Rabka, jedzenie na wynos Rabka, gdzie zjeść Rabka',
    canonical: `${DOMAIN}/`,
    breadcrumb: [],
  },
  '/menu/': {
    title: 'Menu Restauracji — Sielska Chata Rabka-Zdrój',
    description: 'Odkryj menu Sielskiej Chaty w Rabce-Zdrój. Tradycyjne pierogi, żurek, dania mięsne, świeże ryby i pyszne desery. Sprawdź naszą kartę dań i zamów na wynos.',
    keywords: 'menu Sielska Chata, karta dań, pierogi Rabka, żurek, ryby, desery, jedzenie na wynos Rabka, restauracja menu',
    canonical: `${DOMAIN}/menu/`,
    breadcrumb: [
      { name: 'Sielska Chata', url: `${DOMAIN}/` },
      { name: 'Menu', url: `${DOMAIN}/menu/` },
    ],
  },
  '/imprezy/': {
    title: 'Imprezy Okolicznościowe Rabka-Zdrój — Sielska Chata',
    description: 'Planujesz imprezę w Rabce-Zdrój? Organizujemy komunie, chrzciny, urodziny i bankiety firmowe. Klimatyczna sala, wyśmienite jedzenie i profesjonalna obsługa.',
    keywords: 'imprezy okolicznościowe Rabka, komunie Rabka-Zdrój, chrzciny, urodziny, bankiety, sala na wynajęcie, organizacja imprez',
    canonical: `${DOMAIN}/imprezy/`,
    breadcrumb: [
      { name: 'Sielska Chata', url: `${DOMAIN}/` },
      { name: 'Imprezy', url: `${DOMAIN}/imprezy/` },
    ],
  },
  '/o-nas/': {
    title: 'O nas — Sielska Chata | Restauracja w centrum Rabki-Zdrój',
    description: 'Poznaj historię Sielskiej Chaty — rodzinnej restauracji w sercu Rabki-Zdrój. Dowiedz się więcej o naszej pasji do gotowania i dlaczego warto nas odwiedzić.',
    keywords: 'o nas Sielska Chata, restauracja rodzinna Rabka, historia restauracji, najlepsza restauracja Rabka, Orły Gastronomii',
    canonical: `${DOMAIN}/o-nas/`,
    breadcrumb: [
      { name: 'Sielska Chata', url: `${DOMAIN}/` },
      { name: 'O nas', url: `${DOMAIN}/o-nas/` },
    ],
  },
  '/kontakt/': {
    title: 'Kontakt i Rezerwacja — Sielska Chata Rabka-Zdrój',
    description: 'Kontakt i rezerwacje w Sielskiej Chacie w Rabce-Zdrój. Znajdź nas przy ul. Piłsudskiego 18. Zadzwoń: +48 780 285 859 i zarezerwuj stolik już dziś.',
    keywords: 'kontakt Sielska Chata, rezerwacja stolika Rabka, telefon restauracja, adres Sielska Chata, dojazd Rabka-Zdrój',
    canonical: `${DOMAIN}/kontakt/`,
    breadcrumb: [
      { name: 'Sielska Chata', url: `${DOMAIN}/` },
      { name: 'Kontakt', url: `${DOMAIN}/kontakt/` },
    ],
  },
  '/opinie/': {
    title: 'Opinie — Sielska Chata | Google 4.6/5, Orły Gastronomii 8.9',
    description: 'Przeczytaj opinie gości Sielskiej Chaty w Rabce-Zdrój. Ocena 4.6/5 na Google. Laureaci Orłów Gastronomii z oceną 8.9. Zobacz, co o nas piszą i zostaw swoją opinię.',
    keywords: 'opinie Sielska Chata, recenzje restauracja Rabka, polecana restauracja, Google opinie Sielska Chata',
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
