import ReactDOMServer from 'react-dom/server'
import App from './App'

const DOMAIN = 'https://sielskachata.pl'

const routesMeta = {
  '/': {
    title: 'Sielska Chata — Restauracja w Rabce-Zdrój',
    description: 'Sielska Chata — restauracja w Rabce-Zdrój z kuchnią polską i europejską. Szeroka karta dań, imprezy okolicznościowe, jedzenie na wynos. Czynne codziennie 9–19. Laureat Orłów Gastronomii 2026.',
    canonical: `${DOMAIN}/`,
  },
  '/menu/': {
    title: 'Menu — Sielska Chata Rabka-Zdrój | Kuchnia polska i europejska',
    description: 'Pełna karta dań Sielskiej Chaty w Rabce-Zdrój. Przystawki, zupy, dania główne, ryby, pierogi, desery i menu dla dzieci. Jedzenie na wynos dostępne codziennie 9–19.',
    canonical: `${DOMAIN}/menu/`,
  },
  '/imprezy/': {
    title: 'Imprezy Okolicznościowe Rabka-Zdrój | Komunia, Chrzciny, Urodziny — Sielska Chata',
    description: 'Organizacja komunii, chrzcin, urodzin i bankietów firmowych w Rabce-Zdrój. Klimatyczne wnętrze, kuchnia polska i europejska, bezpłatny parking. Zadzwoń i zarezerwuj termin.',
    canonical: `${DOMAIN}/imprezy/`,
  },
  '/o-nas/': {
    title: 'O nas — Sielska Chata | Restauracja w centrum Rabki-Zdrój',
    description: 'Sielska Chata w Rabce-Zdrój — restauracja rodzinna z kuchnią polską i europejską. Laureat Orłów Gastronomii 2026 z oceną 8.9. Ul. Piłsudskiego 18, czynni codziennie 9–19.',
    canonical: `${DOMAIN}/o-nas/`,
  },
  '/kontakt/': {
    title: 'Kontakt i Rezerwacja — Sielska Chata Rabka-Zdrój',
    description: 'Kontakt z restauracją Sielska Chata w Rabce-Zdrój. Tel: +48 780 285 859. Czynni codziennie 9:00–19:00. Ul. Piłsudskiego 18, 34-700 Rabka-Zdrój. Bezpłatny parking.',
    canonical: `${DOMAIN}/kontakt/`,
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
