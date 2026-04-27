import { useRef, useEffect } from 'react'
import { Link } from 'wouter'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, ArrowRight, Award, Star, ChefHat, Mountain } from 'lucide-react'
import MountainSilhouette from '../components/MountainSilhouette'
import Button from '../components/Button'
import MasonryGallery from '../components/MasonryGallery'
import { CONTACT } from '../data/contact'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function About() {
  const contentRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const ctx = gsap.context(() => {
      gsap.from('.about-section > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: contentRef.current, start: 'top 80%' },
      })
    }, contentRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 md:px-16 lg:px-24 bg-espresso overflow-hidden">
        <MountainSilhouette className="absolute bottom-0 left-0 w-full h-16 md:h-20" color="#FAF7F2" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="parzenica-divider text-terracotta w-fit mb-6">
            <span className="font-mono text-xs tracking-[0.25em] uppercase">O nas</span>
          </div>
          <h1 className="font-heading text-cream text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-none mb-6">
            O nas — Sielska Chata<br />
            <span className="text-terracotta">Rabka-Zdrój</span>
          </h1>
          <p className="text-cream/55 text-lg leading-relaxed max-w-2xl">
            Restauracja rodzinna w centrum uzdrowiska. Kuchnia polska i europejska, drewniane wnętrze — i karta dla każdego apetytu.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section ref={contentRef} className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-background">
        <div className="max-w-[1400px] mx-auto">

          {/* Awards row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {[
              { value: '4.6', label: 'Google Maps', sub: '96 opinii' },
              { value: '8.9', label: 'Orły Gastronomii', sub: 'Laureat 2026' },
              { value: CONTACT.hours.short, label: 'Czynni', sub: 'Codziennie' },
              { value: 'Duży', label: 'Parking', sub: 'Bezpłatny' },
            ].map((a) => (
              <div key={a.label} className="bg-warm-white rounded-[1.5rem] p-6 border border-espresso/5">
                <p className="font-heading text-2xl md:text-3xl font-extrabold text-espresso tracking-tight">{a.value}</p>
                <p className="font-heading font-semibold text-espresso/70 text-sm mt-1">{a.label}</p>
                <p className="font-mono text-xs text-terracotta mt-0.5">{a.sub}</p>
              </div>
            ))}
          </div>

          {/* About text */}
          <div className="about-section grid md:grid-cols-12 gap-12 items-start mb-20">
            <div className="md:col-span-7">
              <h2 className="font-drama italic text-espresso text-3xl md:text-4xl leading-snug mb-8">
                Rodzinna restauracja, drewniane wnętrze i uczciwa kuchnia z długą listą pyszności.
              </h2>

              <p className="text-espresso/55 text-lg leading-relaxed mb-6">
                Wkładamy w gotowanie całe serce, traktując gości jak bliskich. Zrób sobie przerwę w podróży pod Tatry – mieścimy się przy trasie Kraków–Zakopane, tylko 5 minut od Parku Zdrojowego w Rabce-Zdroju.
              </p>

              <p className="text-espresso/55 text-lg leading-relaxed mb-6">
                Sielska Chata to restauracja w centrum Rabki-Zdrój. Prowadzimy ją z myślą o gościach, którzy chcą zjeść dobrze — bez poszukiwania wyjątkowych odkryć kulinarnych, ale z pewnością solidnego, uczciwego posiłku.
              </p>

              <p className="text-espresso/55 text-lg leading-relaxed mb-6">
                Serwujemy kuchnię polską i europejską. Mamy w menu tradycyjne polskie dania jak pierogi, żurek, kwaśnicę, placki po zbójnicku, golonkę pieczoną w piwie. Ale też bardziej europejskie propozycje — ślimaki w maśle czosnkowym, stek wołowy, pstrąga z ziołami, filet z sandacza, krewetki z ryżem. Menu zmienia się sezonowo.
              </p>

              <p className="text-espresso/55 text-lg leading-relaxed">
                Orły Gastronomii 2026 — ocena 8.9. Na Google Maps 4.6 z ponad 96 recenzji. Oba cieszą, ale bardziej liczy się to, co czujesz wychodząc — i czy wróciłbyś w przyszłym tygodniu.
              </p>
            </div>

            <div className="md:col-span-5 space-y-4">
              {[
                {
                  icon: ChefHat,
                  title: 'Kuchnia polska i europejska',
                  text: 'Tradycyjne polskie smaki — pierogi, żurek, golonka, kwaśnica. Ale też ślimaki, jagnięcina, krewetki i ryby z górskich potoków.',
                },
                {
                  icon: Award,
                  title: 'Laureat Orłów Gastronomii 2026',
                  text: 'Ocena 8.9/10 w prestiżowym rankingu gastronomicznym. Google Maps 4.6/5 — 96 opinii gości.',
                },
                {
                  icon: Mountain,
                  title: 'Centrum Rabki-Zdrój',
                  text: 'Ul. Piłsudskiego 18, trasa Kraków–Zakopane. Park Zdrojowy, tężnia, Rabkoland — wszystko tuż obok.',
                },
              ].map((item) => (
                <div key={item.title} className="bg-warm-white rounded-[1.5rem] p-6 border border-espresso/5 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-[0.875rem] bg-terracotta/8 flex items-center justify-center flex-shrink-0">
                    <item.icon size={20} className="text-terracotta" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-espresso mb-1">{item.title}</h3>
                    <p className="text-espresso/70 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div className="bg-espresso rounded-[2rem] p-8 md:p-12 text-center">
            <Star size={20} className="text-terracotta mx-auto mb-6" />
            <p className="font-drama italic text-cream text-2xl md:text-3xl lg:text-4xl leading-snug max-w-2xl mx-auto mb-6">
              Nie obiecujemy rewolucji. Obiecujemy solidny obiad, ciepłe wnętrze i spokój, którego szukasz na urlopie.
            </p>
            <p className="text-cream/30 text-sm">Sielska Chata, Rabka-Zdrój</p>
          </div>
        </div>
      </section>

      {/* Gallery — wnętrze restauracji */}
      <section className="py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-background">
        <div className="max-w-[1400px] mx-auto">
          <div className="parzenica-divider text-terracotta w-fit mb-6">
            <span className="font-mono text-xs tracking-[0.25em] uppercase">Wnętrze</span>
          </div>
          <h2 className="font-heading text-espresso text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter leading-none mb-10 md:mb-14">
            Zajrzyj do nas<br />
            <span className="text-terracotta italic font-drama font-normal">— zanim przyjdziesz</span>
          </h2>
          <MasonryGallery
            images={[
              { src: '/images/restaurant/restaurant-01.webp', alt: 'Drewniane wnętrze restauracji Sielska Chata w Rabce-Zdroju — sala z bali z dębowymi ławami' },
              { src: '/images/restaurant/restaurant-02.webp', alt: 'Spiralne drewniane schody na piętro restauracji Sielska Chata Rabka-Zdrój' },
              { src: '/images/restaurant/restaurant-03.webp', alt: 'Restauracja Sielska Chata w Rabce-Zdroju — drewniany budynek przy trasie Kraków–Zakopane' },
              { src: '/images/restaurant/restaurant-04.webp', alt: 'Sala bankietowa na poddaszu Sielskiej Chaty — drewniane ławy pod skośnym dachem' },
              { src: '/images/restaurant/restaurant-05.webp', alt: 'Kameralna sala na poddaszu Sielskiej Chaty z widokiem na Rabkę-Zdrój' },
              { src: '/images/restaurant/restaurant-06.webp', alt: 'Mała sala restauracji Sielska Chata — przytulne wnętrze z drewna' },
              { src: '/images/restaurant/restaurant-07.webp', alt: 'Sala główna Sielskiej Chaty — bar i dekoracje góralskie w sercu Rabki-Zdroju' },
              { src: '/images/restaurant/restaurant-08.webp', alt: 'Letni ogródek restauracji Sielska Chata Rabka-Zdrój — taras z widokiem na góry' },
              { src: '/images/restaurant/restaurant-09.webp', alt: 'Menu Sielskiej Chaty — kuchnia polska i europejska w centrum Rabki-Zdroju' },
              { src: '/images/restaurant/restaurant-10.webp', alt: 'Bar w Sielskiej Chacie — wnętrze restauracji w stylu góralskim, Rabka-Zdrój' },
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-16 lg:px-24 bg-warm-white">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-drama italic text-espresso text-3xl mb-4">
            Zapraszamy do Sielskiej Chaty
          </h2>
          <p className="text-espresso/70 mb-8 max-w-md mx-auto">
            {CONTACT.address.full}. {CONTACT.hours.display}.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href={CONTACT.phone.href} variant="primary" icon={<Phone size={15} />}>
              Zadzwoń do nas
            </Button>
            <Button to="/menu/" variant="secondary">
              Zobacz menu <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
