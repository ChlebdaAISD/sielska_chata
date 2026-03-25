import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Users, CheckCircle } from 'lucide-react'
import MountainSilhouette from '../components/MountainSilhouette'
import Button from '../components/Button'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const eventTypes = [
  {
    id: 'komunia',
    title: 'Komunia Święta',
    subtitle: 'Organizacja komunii w Rabce-Zdrój',
    desc: 'Pierwsza Komunia Święta to jeden z najważniejszych dni w życiu Twojego dziecka. Sielska Chata w Rabce-Zdrój zapewnia ciepłą, rodzinną atmosferę dla całej rodziny — od małych gości po dziadków. Przygotujemy menu z ulubionymi daniami dzieci i wykwintnymi potrawami dla dorosłych.',
    features: [
      'Menu dostosowane do dzieci i dorosłych',
      'Przestronna sala z klimatycznym drewnianym wystrojem',
      'Obsługa dla grup od kilkunastu do kilkudziesięciu osób',
      'Możliwość dekoracji sali na tę okazję',
      'Bezpłatny parking dla gości',
    ],
  },
  {
    id: 'chrzciny',
    title: 'Chrzciny i Przyjęcia Chrzcielne',
    subtitle: 'Chrzciny w restauracji Rabka-Zdrój',
    desc: 'Przywitaj nowe życie przy wspólnym stole. Organizujemy przyjęcia chrzcielne w przytulnym, drewnianym wnętrzu Sielskiej Chaty. Centrum Rabki-Zdrój, blisko kościołów i Parku Zdrojowego — idealne miejsce na uroczysty rodzinny obiad po ceremonii.',
    features: [
      'Elastyczne menu dostosowane do Twoich oczekiwań',
      'Kuchnia polska i europejska — coś dla każdego smaku',
      'Lokalizacja w centrum Rabki-Zdrój — blisko kościołów',
      'Możliwość zamówienia tortu lub ciasta na uroczystość',
      'Duży parking dla gości',
    ],
  },
  {
    id: 'urodziny',
    title: 'Urodziny i Jubileusze',
    subtitle: 'Urodziny w restauracji Rabka-Zdrój',
    desc: 'Świętuj urodziny, imieniny lub jubileusz z rodziną i przyjaciółmi w wyjątkowym miejscu. Sielska Chata w Rabce-Zdrój to klimatyczne wnętrze z drewnianym wykończeniem, szeroka karta dań i serdeczna obsługa. Zajmujemy się wszystkim — Ty skupiasz się na gościach.',
    features: [
      'Rezerwacja sali lub wydzielonej przestrzeni',
      'Indywidualne menu na zamówienie',
      'Możliwość wniesienia własnego tortu',
      'Miła atmosfera — miejsce idealne na urodziny rodzinne',
      'Czynni codziennie 9:00–19:00',
    ],
  },
  {
    id: 'firmowe',
    title: 'Imprezy Firmowe i Bankiety',
    subtitle: 'Bankiet i spotkanie firmowe w Rabce-Zdrój',
    desc: 'Szukasz miejsca na spotkanie integracyjne, kolację firmową lub bankiet w okolicach Rabki-Zdrój i Nowego Targu? Sielska Chata dysponuje przestrzenią dla grup biznesowych i oferuje obsługę na najwyższym poziomie. Kuchnia polska i europejska z opcją menu dostosowanego do preferencji grupy.',
    features: [
      'Obsługa grup firmowych i integracyjnych',
      'Menu dostosowane do preferencji i budżetu',
      'Kuchnia polska i europejska — idealna na spotkania mieszanych grup',
      'Lokalizacja przy trasie Kraków–Zakopane',
      'Możliwość rezerwacji całej sali',
    ],
  },
]

function EventCard({ event, index }) {
  const ref = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <article
      ref={ref}
      id={event.id}
      className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center py-16 md:py-20 border-t border-espresso/8 ${
        index % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
      }`}
    >
      {/* Text */}
      <div>
        <span className="font-mono text-xs text-terracotta/60 tracking-widest uppercase">
          0{index + 1}
        </span>
        <h2 className="font-drama italic text-espresso text-3xl md:text-4xl leading-snug mt-2 mb-3">
          {event.title}
        </h2>
        <p className="font-mono text-xs text-terracotta mb-6 tracking-wide">{event.subtitle}</p>
        <p className="text-espresso/55 leading-relaxed mb-8">{event.desc}</p>

        <ul className="space-y-3 mb-8">
          {event.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-espresso/70">
              <CheckCircle size={16} className="text-terracotta flex-shrink-0 mt-0.5" />
              {f}
            </li>
          ))}
        </ul>

        <Button href="tel:+48780285859" variant="primary" size="sm" icon={<Phone size={14} />}>
          Zapytaj o termin
        </Button>
      </div>

      {/* Visual card */}
      <div className="bg-espresso/[0.02] border border-espresso/5 rounded-[2rem] p-1.5">
        <div className="bg-warm-white rounded-[calc(2rem-0.375rem)] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] min-h-[240px] flex flex-col justify-between">
          <div className="w-16 h-16 rounded-[1.25rem] bg-terracotta/8 flex items-center justify-center mb-6">
            <Users size={28} className="text-terracotta" />
          </div>
          <div>
            <p className="font-drama italic text-espresso/60 text-lg leading-relaxed">
              „Robiliśmy tu komunię córki — 40 osób, zero stresu. Wszystko dopięte na ostatni guzik."
            </p>
            <p className="font-mono text-xs text-espresso/30 mt-3">— Anna W., organizacja komunii</p>
          </div>
        </div>
      </div>
    </article>
  )
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Jak zarezerwować salę na imprezę w Sielskiej Chacie?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Najprościej zadzwoń pod numer +48 780 285 859. Omówimy datę, liczbę gości i rodzaj imprezy. Możesz też wpaść osobiście — jesteśmy czynni codziennie 9:00–19:00.',
      },
    },
    {
      '@type': 'Question',
      name: 'Na ile osób można zorganizować przyjęcie?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Przyjmujemy grupy od kilkunastu do kilkudziesięciu osób. Skontaktuj się z nami, żeby ustalić szczegóły dotyczące Twojej uroczystości.',
      },
    },
    {
      '@type': 'Question',
      name: 'Czy menu na imprezę można dostosować?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oczywiście. Nasza szeroka karta pozwala skomponować menu pasujące do każdej okazji — od tradycyjnych polskich dań, przez ryby i dania europejskie, aż po menu dla dzieci.',
      },
    },
    {
      '@type': 'Question',
      name: 'Czy jest parking przy restauracji?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tak — dysponujemy dużym, bezpłatnym parkingiem. Goście przyjeżdżający z całej Małopolski nie mają problemów z miejscem.',
      },
    },
  ],
}

export default function Events() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 md:px-16 lg:px-24 bg-espresso overflow-hidden">
        <MountainSilhouette className="absolute bottom-0 left-0 w-full h-16 md:h-20" color="#FAF7F2" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="parzenica-divider text-terracotta w-fit mb-6">
            <span className="font-mono text-xs tracking-[0.25em] uppercase">Imprezy okolicznościowe</span>
          </div>
          <h1 className="font-heading text-cream text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-none mb-6">
            Imprezy Okolicznościowe<br />
            <span className="text-terracotta">w Rabce-Zdrój</span>
          </h1>
          <p className="text-cream/55 text-lg leading-relaxed max-w-2xl">
            Komunia, chrzciny, urodziny, jubileusze, bankiety firmowe — organizujemy uroczystości od A do Z w sercu Rabki-Zdrój. Klimatyczne wnętrze, kuchnia polska i europejska, bezpłatny parking.
          </p>
        </div>
      </section>

      {/* Quick nav */}
      <section className="py-8 px-6 md:px-16 lg:px-24 bg-warm-white border-b border-espresso/5">
        <div className="max-w-[1400px] mx-auto flex flex-wrap gap-3">
          {eventTypes.map((e) => (
            <a
              key={e.id}
              href={`#${e.id}`}
              className="px-4 py-2 rounded-full text-sm font-medium bg-espresso/5 text-espresso/60 hover:bg-espresso/10 hover:text-espresso transition-colors"
            >
              {e.title}
            </a>
          ))}
        </div>
      </section>

      {/* Event types */}
      <section className="px-6 md:px-16 lg:px-24 bg-warm-white">
        <div className="max-w-[1400px] mx-auto">
          {eventTypes.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </section>

      {/* FAQ / How it works */}
      <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-background">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-14">
            <div className="parzenica-divider text-terracotta mx-auto w-fit mb-6">
              <span className="font-mono text-xs tracking-[0.25em] uppercase">Jak zarezerwować</span>
            </div>
            <h2 className="font-drama italic text-espresso text-3xl md:text-4xl">
              Prosto i bez komplikacji
            </h2>
          </div>

          <div className="space-y-5">
            {[
              {
                q: 'Jak zarezerwować salę na imprezę w Sielskiej Chacie?',
                a: 'Najprościej zadzwoń pod numer +48 780 285 859. Omówimy datę, liczbę gości i rodzaj imprezy. Możesz też wpaść osobiście — jesteśmy czynni codziennie 9:00–19:00.',
              },
              {
                q: 'Na ile osób można zorganizować przyjęcie?',
                a: 'Przyjmujemy grupy od kilkunastu do kilkudziesięciu osób. Skontaktuj się z nami, żeby ustalić szczegóły dotyczące Twojej uroczystości.',
              },
              {
                q: 'Czy menu na imprezę można dostosować?',
                a: 'Oczywiście. Nasza szeroka karta pozwala skomponować menu pasujące do każdej okazji — od tradycyjnych polskich dań, przez ryby i dania europejskie, aż po menu dla dzieci.',
              },
              {
                q: 'Czy jest parking przy restauracji?',
                a: 'Tak — dysponujemy dużym, bezpłatnym parkingiem. Goście przyjeżdżający z całej Małopolski nie mają problemów z miejscem.',
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="bg-warm-white border border-espresso/5 rounded-[1.5rem] px-7 py-6"
              >
                <h3 className="font-heading font-bold text-espresso mb-3">{faq.q}</h3>
                <p className="text-espresso/55 leading-relaxed text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-16 lg:px-24 bg-espresso relative overflow-hidden">
        <MountainSilhouette className="absolute top-0 left-0 w-full h-16 rotate-180 opacity-20" color="#3D3226" />
        <div className="relative z-10 max-w-[900px] mx-auto text-center">
          <h2 className="font-drama italic text-cream text-3xl md:text-4xl mb-4">
            Zaplanuj imprezę w Rabce-Zdrój
          </h2>
          <p className="text-cream/45 mb-8 max-w-md mx-auto">
            Zadzwoń do nas — ustalimy datę, menu i wszystkie szczegóły Twojej uroczystości.
          </p>
          <Button href="tel:+48780285859" variant="primary" size="lg" icon={<Phone size={18} />}>
            +48 780 285 859
          </Button>
        </div>
      </section>
    </>
  )
}
