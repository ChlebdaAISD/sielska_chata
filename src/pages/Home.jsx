import { useState, useEffect, useRef } from 'react'
import { Link } from 'wouter'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Phone, MapPin, Clock, ChefHat, Mountain, Car, Users,
  UtensilsCrossed, Award, Utensils, ArrowRight, Star
} from 'lucide-react'
import MountainSilhouette from '../components/MountainSilhouette'
import Button from '../components/Button'
import ReviewCard from '../components/ReviewCard'
import { CONTACT } from '../data/contact'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// ─── HERO ────────────────────────────────────────────────
function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 })
      tl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' })
        .from('.hero-title', { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out' }, '-=0.4')
        .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .from('.hero-cta', { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
        .from('.hero-scroll', { opacity: 0, duration: 0.6 }, '-=0.2')

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!prefersReduced) {
        gsap.to('.hero-img', {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-[100dvh] w-full overflow-hidden flex items-end">
      <img
        src="/images/hero.webp"
        alt="Sielska Chata — restauracja w Rabce-Zdrój, kuchnia polska i europejska"
        width={3089}
        height={1356}
        className="hero-img absolute inset-0 w-full h-[120%] object-cover object-center"
      />
      <div className="hero-gradient absolute inset-0" />

      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-2xl">
            <div className="hero-badge inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] rounded-full px-4 py-2 mb-8">
              <Award size={14} className="text-terracotta" />
              <span className="font-mono text-xs text-cream/90 tracking-wider uppercase">
                Laureat Orłów Gastronomii 2026
              </span>
            </div>

            <h1 className="hero-title font-heading text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-none mb-5">
              Sielska Chata —
              <br />
              Restauracja w Rabce-Zdrój
            </h1>

            <p className="hero-subtitle font-drama italic text-cream/85 text-xl md:text-3xl lg:text-4xl mb-10">
              Dobra kuchnia. Coś dla każdego.
            </p>

            <div className="hero-cta flex flex-wrap gap-4">
              <Button href={CONTACT.phone.href} variant="primary" icon={<Phone size={16} />}>
                Zarezerwuj stolik
              </Button>
              <Button to="/menu/" variant="secondary-dark">
                Zobacz menu
              </Button>
            </div>
          </div>

          <div className="hero-scroll hidden md:flex items-center gap-3 mt-16 text-cream/40">
            <div className="w-px h-10 bg-cream/20" />
            <span className="font-mono text-xs tracking-widest uppercase">Przewiń</span>
          </div>
        </div>
      </div>

      <MountainSilhouette
        className="absolute bottom-0 left-0 w-full h-16 md:h-24"
        color="#FAF7F2"
      />
    </section>
  )
}

// ─── AWARDS BANNER ───────────────────────────────────────
function AwardsBanner() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.award-item', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const awards = [
    { value: '4.6', label: 'Google Maps', sub: '96 opinii' },
    { value: '8.9', label: 'Orły Gastronomii', sub: 'Laureat 2026' },
    { value: CONTACT.hours.short, label: 'Czynni', sub: 'Codziennie' },
    { value: 'Duży', label: 'Parking', sub: 'Bezpłatny' },
  ]

  return (
    <section ref={ref} className="py-16 md:py-20 px-6 md:px-16 lg:px-24 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {awards.map((a) => (
            <div
              key={a.label}
              className="award-item bg-warm-white rounded-[1.5rem] p-6 md:p-8 border border-espresso/5 shadow-[0_4px_24px_-8px_rgba(44,36,24,0.04)]"
            >
              <p className="font-heading text-2xl md:text-3xl font-extrabold text-espresso tracking-tight">
                {a.value}
              </p>
              <p className="font-heading font-semibold text-espresso/70 text-sm mt-1">{a.label}</p>
              <p className="font-mono text-xs text-terracotta mt-0.5">{a.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── ABOUT ───────────────────────────────────────────────
function About() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-content > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center">
          <div className="about-content md:col-span-7">
            <div className="parzenica-divider text-terracotta w-fit mb-8">
              <span className="font-mono text-xs tracking-[0.25em] uppercase">O nas</span>
            </div>

            <h2 className="font-drama italic text-espresso text-3xl md:text-4xl lg:text-5xl leading-snug mb-8">
              Rodzinna restauracja, drewniane wnętrze i uczciwa kuchnia z długą listą pyszności.
            </h2>

            <p className="text-espresso/55 text-lg leading-relaxed max-w-[58ch] mb-8">
              Nasze obszerne menu to nasz największy atut. Dbamy o to, by łącząc pokolenia przy jednym stole, zadowolić każdy gust: od ulubionych przez dzieci klopsików i frytek, przez wykwintną jagnięciną dla rodziców, aż po domowy rosół dla dziadków. Każdy gość wychodzi od nas najedzony i uśmiechnięty.
            </p>

            <p className="text-espresso/55 text-lg leading-relaxed max-w-[58ch] mb-8">
              Wkładamy w gotowanie całe serce, traktując gości jak bliskich. Zrób sobie przerwę w podróży pod Tatry – mieścimy się przy trasie Kraków–Zakopane, tylko 5 minut od Parku Zdrojowego w Rabce-Zdroju.
            </p>

            <Link
              href="/o-nas/"
              className="inline-flex items-center gap-2 text-terracotta font-semibold hover:underline"
            >
              Więcej o nas <ArrowRight size={16} />
            </Link>
          </div>

          <div className="md:col-span-5 space-y-4">
            {[
              {
                icon: ChefHat,
                title: 'Polska klasyka i europejskie smaki',
                text: 'Od pierogów, golonki i żurku, przez żeberka BBQ i pstrąga, aż po jagnięcinę, sandacza w borowikach i krewetki. Coś dobrego dla każdego.',
              },
              {
                icon: Users,
                title: 'Imprezy okolicznościowe',
                text: 'Komunia, chrzciny, urodziny, bankiet firmowy — organizujemy od A do Z. Menu dostosujemy do potrzeb i liczby gości.',
              },
              {
                icon: Mountain,
                title: 'W sercu uzdrowiska',
                text: 'Centrum Rabki-Zdrój, trasa Kraków–Zakopane. Park Zdrojowy, Rabkoland, Luboń Wielki — tuż obok.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group bg-warm-white rounded-[1.5rem] p-6 border border-espresso/5 shadow-[0_4px_24px_-8px_rgba(44,36,24,0.04)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_8px_40px_-8px_rgba(44,36,24,0.08)] hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-[0.875rem] bg-terracotta/8 flex items-center justify-center flex-shrink-0">
                    <item.icon size={20} className="text-terracotta" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-espresso mb-1">{item.title}</h3>
                    <p className="text-espresso/70 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── MENU PREVIEW ─────────────────────────────────────────
function MenuPreview() {
  const ref = useRef(null)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('/menu.json')
      .then((r) => r.json())
      .then((data) => setCategories(data.categories))
      .catch(() => { })
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.menu-preview-header > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  // Show a sample of items from "dania" category
  const featured = categories.find((c) => c.id === 'dania')?.items?.slice(0, 4) || []

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-warm-white">
      <div className="max-w-[900px] mx-auto">
        <div className="menu-preview-header text-center mb-12">
          <div className="parzenica-divider text-terracotta mx-auto w-fit mb-6">
            <span className="font-mono text-xs tracking-[0.25em] uppercase">Karta dań</span>
          </div>
          <h2 className="font-drama italic text-espresso text-3xl md:text-4xl lg:text-5xl mb-4">
            Kuchnia polska i europejska
          </h2>
          <p className="text-espresso/70 max-w-md mx-auto leading-relaxed">
            Tradycyjne polskie smaki, ryby z górskich potoków, europejskie dania mięsne i szeroka karta napojów. Menu zmienia się sezonowo.
          </p>
        </div>

        {featured.length > 0 && (
          <div className="space-y-0 mb-10">
            {featured.map((item, i) => (
              <div
                key={item.id}
                className="flex items-baseline gap-4 py-4 px-4 rounded-xl hover:bg-espresso/[0.025] transition-colors duration-300"
                style={{ animation: `fadeSlideIn 0.4s cubic-bezier(0.32, 0.72, 0, 1) ${i * 40}ms both` }}
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-bold text-espresso tracking-tight leading-snug">
                    {item.name}
                  </h3>
                  {item.description && (
                    <p className="text-espresso/65 text-sm mt-0.5">{item.description}</p>
                  )}
                </div>
                <span className="flex-shrink-0 w-px h-4 bg-espresso/10 mx-2 hidden sm:block" />
                <span className="font-mono text-terracotta font-medium text-sm whitespace-nowrap">
                  {item.price} zł
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <Button to="/menu/" variant="primary-dark" icon={<ArrowRight size={14} />}>
            Zobacz pełne menu
          </Button>
          <p className="text-espresso/60 text-xs font-mono mt-4">Dostępne również jedzenie na wynos w Rabce-Zdrój</p>
        </div>
      </div>
    </section>
  )
}

// ─── PHILOSOPHY QUOTE ────────────────────────────────────
function Philosophy() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phil-quote', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 65%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative py-32 md:py-40 px-6 md:px-16 lg:px-24 bg-espresso overflow-hidden">
      <MountainSilhouette
        className="absolute top-0 left-0 w-full h-24 rotate-180 opacity-20"
        color="#3D3226"
      />

      <div className="phil-quote relative z-10 max-w-3xl mx-auto text-center">
        <div className="parzenica-divider text-terracotta mx-auto w-fit mb-10">
          <Star size={14} className="text-terracotta" />
        </div>

        <p className="font-drama italic text-cream text-2xl md:text-4xl lg:text-5xl leading-snug mb-10">
          Nie obiecujemy rewolucji. Obiecujemy solidny obiad, ciepłe wnętrze i spokój, którego szukasz{' '}
          <span className="text-terracotta">na urlopie.</span>
        </p>

        <p className="text-cream/35 text-base leading-relaxed max-w-lg mx-auto">
          Sielska Chata to miejsce gdzie czas zwalnia i przenosi Cię w świat wykwintnych rozkoszy naszych dań które przygotowujemy na bieżąco. Drewniane wnętrze, szeroka karta dań (nie tylko regionalnych) sprawia, że każdy nasz klient poczuje się jak w domu.
        </p>
      </div>

      <MountainSilhouette
        className="absolute bottom-0 left-0 w-full h-24 opacity-20"
        color="#3D3226"
      />
    </section>
  )
}

// ─── EVENTS TEASER ───────────────────────────────────────
function EventsTeaser() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.event-teaser-card', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const events = [
    { num: '01', icon: Utensils, title: 'Komunia i chrzciny', desc: 'Ciepłe, rodzinne przyjęcie dla kilkunastu lub kilkudziesięciu gości. Menu dostosowane do dzieci i dorosłych.' },
    { num: '02', icon: Users, title: 'Urodziny i jubileusze', desc: 'Urodziny w drewnianym wnętrzu — ciepło i bez stresu. Menu, dekoracje, liczba gości — wszystko ustalimy.' },
    { num: '03', icon: UtensilsCrossed, title: 'Imprezy firmowe i bankiety', desc: 'Spotkania integracyjne, kolacje firmowe, bankiety. Obsługa do kilkudziesięciu osób.' },
  ]

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-14">
          <div className="parzenica-divider text-terracotta mx-auto w-fit mb-6">
            <span className="font-mono text-xs tracking-[0.25em] uppercase">Imprezy okolicznościowe</span>
          </div>
          <h2 className="font-drama italic text-espresso text-3xl md:text-4xl lg:text-5xl mb-4">
            Zorganizuj imprezę w Rabce-Zdrój
          </h2>
          <p className="text-espresso/70 max-w-xl mx-auto leading-relaxed">
            Komunia, chrzciny, urodziny, spotkanie firmowe — dostosujemy salę i menu do każdej okazji.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {events.map((e) => (
            <div key={e.num} className="event-teaser-card bg-espresso/[0.02] border border-espresso/5 rounded-[2rem] p-1.5">
              <div className="bg-warm-white rounded-[calc(2rem-0.375rem)] p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] h-full flex flex-col gap-4">
                <div className="w-12 h-12 rounded-[0.875rem] bg-terracotta/8 flex items-center justify-center">
                  <e.icon size={22} className="text-terracotta" />
                </div>
                <div>
                  <span className="font-mono text-xs text-terracotta/60">{e.num}</span>
                  <h3 className="font-heading font-bold text-espresso text-lg mt-0.5 mb-2">{e.title}</h3>
                  <p className="text-espresso/70 text-sm leading-relaxed">{e.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button to="/imprezy/" variant="primary" icon={<ArrowRight size={14} />}>
            Sprawdź ofertę imprez
          </Button>
        </div>
      </div>
    </section>
  )
}

// ─── TESTIMONIALS ────────────────────────────────────────
const testimonials = [
  {
    name: "Michał Kibil",
    review: "Przyjechaliśmy zachęceni opiniami z Google’a i w żadnej mierze nie jesteśmy rozczarowani. Tradycyjne polskie jedzenie, choć z pewnym twistem, dostarcza radości w każdym kęsie. Porcje są duże, a ceny bardzo rozsądne. Przemiła obsługa powoduje że obiad je się z przyjemnością."
  },
  {
    name: "Agnieszka Sak-Ciężadło",
    review: "Super miejsce... Przepyszna czosnkowa - najlepsza jaką jadłam. Schabowy-sztos, placki po zbójnicku- chrupiace a gulasz rewelacja, noga z kaczki z kopytkami - mniam. Obsługa bardzo miła i super sprawna. Polecam"
  },
  {
    name: "Rafal Siudy",
    review: "Pyszne jedzonko i wspaniałe trunki. Goloneczka, baraninka, żeberka palce lizać! Muszę jeszcze spróbować placka po zbojnicku bo podobno wyśmienity. Polecam serdecznie."
  }
]

function Testimonials() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-warm-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <div className="parzenica-divider text-terracotta mx-auto w-fit mb-6">
            <span className="font-mono text-xs tracking-[0.25em] uppercase">Opinie gości</span>
          </div>
          <h2 className="font-drama italic text-espresso text-3xl md:text-4xl mb-3">
            Co mówią o nas
          </h2>
          <div className="flex items-center justify-center gap-3 text-espresso/65 mt-4">
            <span className="font-mono text-xs">Google 4.6/5</span>
            <span className="w-1 h-1 rounded-full bg-espresso/20" />
            <span className="font-mono text-xs">Orły Gastronomii 8.9/10</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <ReviewCard review={t} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button to="/opinie/" variant="secondary">
            Zobacz wszystkie opinie <ArrowRight size={14} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}

// ─── CONTACT TEASER ──────────────────────────────────────
function ContactTeaser() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-teaser > *', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <div className="contact-teaser grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="parzenica-divider text-terracotta w-fit mb-6">
              <span className="font-mono text-xs tracking-[0.25em] uppercase">Kontakt</span>
            </div>
            <h2 className="font-drama italic text-espresso text-3xl md:text-4xl leading-snug mb-4">
              Zapraszamy do Sielskiej Chaty w Rabce-Zdrój
            </h2>
            <p className="text-espresso/70 leading-relaxed mb-8">
              Szukasz dobrego miejsca, gdzie zjeść w Rabce-Zdrój? Zarezerwuj stolik telefonicznie lub wpadnij spontanicznie — prawie zawsze znajdziemy miejsce.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href={CONTACT.phone.href} variant="primary" icon={<Phone size={15} />}>
                {CONTACT.phone.display}
              </Button>
              <Button to="/kontakt/" variant="secondary">
                Jak dojechać <ArrowRight size={15} />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { icon: MapPin, label: 'Adres', value: CONTACT.address.full },
              { icon: Clock, label: 'Godziny', value: CONTACT.hours.display },
              { icon: Car, label: 'Parking', value: 'Duży, bezpłatny parking przy restauracji' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4 bg-warm-white rounded-2xl p-5 border border-espresso/5">
                <div className="w-10 h-10 rounded-[0.75rem] bg-terracotta/8 flex items-center justify-center flex-shrink-0">
                  <item.icon size={17} className="text-terracotta" />
                </div>
                <div>
                  <p className="font-heading font-bold text-espresso text-sm">{item.label}</p>
                  <p className="text-espresso/55 text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── HOME PAGE ───────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Hero />
      <AwardsBanner />
      <About />
      <MenuPreview />
      <Philosophy />
      <EventsTeaser />
      <Testimonials />
      <ContactTeaser />
    </>
  )
}
