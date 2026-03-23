import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Phone, MapPin, Clock, ChefHat, Mountain, Car, Users,
  UtensilsCrossed, Menu as MenuIcon, X, Award, Utensils,
  ArrowRight, Star
} from 'lucide-react'
import './index.css'

gsap.registerPlugin(ScrollTrigger)

// ─── MOUNTAIN SILHOUETTE SVG ─────────────────────────────
function MountainSilhouette({ className = '', color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 1440 120" fill="none" className={className} preserveAspectRatio="none">
      <path
        d="M0 120L48 108C96 96 192 72 288 66C384 60 480 72 576 78C672 84 768 84 864 72C960 60 1056 36 1152 30C1248 24 1344 36 1392 42L1440 48V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
        fill={color}
      />
    </svg>
  )
}

// ─── NAVBAR ──────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { label: 'Menu', href: '#menu' },
    { label: 'O nas', href: '#o-nas' },
    { label: 'Imprezy', href: '#imprezy' },
    { label: 'Kontakt', href: '#kontakt' },
  ]

  return (
    <>
      <nav
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-40 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] rounded-full flex items-center justify-between ${
          scrolled
            ? 'bg-warm-white/85 backdrop-blur-xl border border-espresso/8 shadow-[0_8px_32px_-8px_rgba(44,36,24,0.12)] px-4 py-2.5'
            : 'bg-transparent px-6 py-3'
        }`}
        style={{ width: 'min(92vw, 860px)' }}
      >
        <a href="#" className="flex items-center gap-2.5">
          <img
            src="/images/logo.jpg"
            alt="Sielska Chata"
            className={`rounded-full object-cover transition-all duration-700 ${scrolled ? 'h-9 w-9' : 'h-11 w-11'}`}
          />
          <span
            className={`font-drama font-semibold tracking-tight transition-all duration-700 ${
              scrolled ? 'text-espresso text-base' : 'text-white text-lg'
            }`}
          >
            Sielska Chata
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`link-lift px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 ${
                scrolled
                  ? 'text-espresso/70 hover:text-espresso hover:bg-espresso/5'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+48780285859"
            className="btn-magnetic ml-2 inline-flex items-center gap-2 bg-terracotta text-white px-5 py-2.5 rounded-full text-sm font-semibold"
          >
            <span className="btn-bg bg-terracotta-dark rounded-full" />
            <Phone size={14} className="relative z-10" />
            <span className="relative z-10">Zadzwoń</span>
          </a>
        </div>

        <button
          className="md:hidden p-2 rounded-full"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? (
            <X className={scrolled ? 'text-espresso' : 'text-white'} size={22} />
          ) : (
            <MenuIcon className={scrolled ? 'text-espresso' : 'text-white'} size={22} />
          )}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        className={`fixed inset-0 z-30 transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-espresso/90 backdrop-blur-2xl" onClick={() => setMenuOpen(false)} />
        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-8">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-cream text-3xl font-drama font-semibold hover:text-terracotta transition-colors duration-300"
              style={{
                transitionDelay: menuOpen ? `${i * 80}ms` : '0ms',
                transform: menuOpen ? 'translateY(0)' : 'translateY(2rem)',
                opacity: menuOpen ? 1 : 0,
                transition: 'all 0.5s cubic-bezier(0.32, 0.72, 0, 1)',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+48780285859"
            className="btn-magnetic mt-4 inline-flex items-center gap-3 bg-terracotta text-white px-8 py-4 rounded-full text-lg font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            <Phone size={18} />
            +48 780 285 859
          </a>
        </div>
      </div>
    </>
  )
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
        src="/images/hero.jpg"
        alt="Sielska Chata — restauracja w Rabce-Zdrój"
        className="hero-img absolute inset-0 w-full h-[120%] object-cover object-center"
      />
      <div className="hero-gradient absolute inset-0" />

      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto">
          {/* Left-aligned content — asymmetric hero per taste-skill */}
          <div className="max-w-2xl">
            <div className="hero-badge inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] rounded-full px-4 py-2 mb-8">
              <Award size={14} className="text-terracotta" />
              <span className="font-mono text-xs text-cream/90 tracking-wider uppercase">
                Laureat Orłów Gastronomii 2026
              </span>
            </div>

            <h1 className="hero-title font-heading text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-none mb-5">
              Smaki polskiej
              <br />
              tradycji
            </h1>

            <p className="hero-subtitle font-drama italic text-cream/85 text-xl md:text-3xl lg:text-4xl mb-10">
              w sercu Rabki-Zdrój.
            </p>

            <div className="hero-cta flex flex-wrap gap-4">
              <a
                href="tel:+48780285859"
                className="btn-magnetic group inline-flex items-center gap-3 bg-terracotta text-white pl-7 pr-3 py-3.5 rounded-full font-semibold text-base"
              >
                <span className="btn-bg bg-terracotta-dark rounded-full" />
                <span className="relative z-10">Zarezerwuj stolik</span>
                <span className="relative z-10 w-9 h-9 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:scale-105">
                  <Phone size={16} />
                </span>
              </a>
              <a
                href="#menu"
                className="btn-magnetic inline-flex items-center gap-2 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-base hover:bg-white/10 transition-colors duration-500"
              >
                <span className="relative z-10">Zobacz menu</span>
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="hero-scroll hidden md:flex items-center gap-3 mt-16 text-cream/40">
            <div className="w-px h-10 bg-cream/20" />
            <span className="font-mono text-xs tracking-widest uppercase">Przewiń</span>
          </div>
        </div>
      </div>

      {/* Mountain silhouette transition */}
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
    { value: '4.7', label: 'Google Maps', sub: '76 opinii' },
    { value: '8.9', label: 'Orły Gastronomii', sub: 'Laureat 2026' },
    { value: '9:00–19:00', label: 'Codziennie', sub: '7 dni w tygodniu' },
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
    <section ref={ref} id="o-nas" className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center">
          {/* Left — large editorial text (spans 7 cols) */}
          <div className="about-content md:col-span-7">
            <div className="parzenica-divider text-terracotta w-fit mb-8">
              <span className="font-mono text-xs tracking-[0.25em] uppercase">O nas</span>
            </div>

            <h2 className="font-drama italic text-espresso text-3xl md:text-4xl lg:text-5xl leading-snug mb-8">
              Restauracja rodzinna, prowadzona z myślą o gościach, nie o rankingach.
            </h2>

            <p className="text-espresso/55 text-lg leading-relaxed max-w-[58ch] mb-8">
              Większość restauracji w turystycznych miejscowościach serwuje „coś dla każdego". Uniwersalne menu, zamrożone półprodukty, szybka rotacja. My stawiamy na jedno — żebyś wyszedł z pełnym brzuchem i dobrym wspomnieniem.
            </p>

            <p className="text-espresso/55 text-lg leading-relaxed max-w-[58ch]">
              Gotujemy tak, jak gotowałoby się dla bliskich. Wchodząc, czujesz zapach — nie ambicję. Siedzimy przy głównej trasie, 5 minut od Parku Zdrojowego. Po obiedzie — spacer do tężni albo wypad na Luboń Wielki.
            </p>
          </div>

          {/* Right — stacked info cards (spans 5 cols) */}
          <div className="md:col-span-5 space-y-4">
            {[
              {
                icon: ChefHat,
                title: 'Kuchnia polska',
                text: 'Kwaśnica, oscypek z grilla, placki po zbójnicku — bez skrótów, z lokalnych składników.',
              },
              {
                icon: Users,
                title: 'Imprezy i catering',
                text: 'Komunia, chrzciny, urodziny — organizujemy od A do Z. Menu dostosujemy do potrzeb.',
              },
              {
                icon: Mountain,
                title: 'W sercu uzdrowiska',
                text: 'Centrum Rabki-Zdrój, trasa Kraków–Zakopane. Park Zdrojowy, Rabkoland, Luboń Wielki.',
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
                    <p className="text-espresso/50 text-sm leading-relaxed">{item.text}</p>
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

// ─── MENU ────────────────────────────────────────────────
const menuCategories = [
  {
    name: 'Zupy',
    description: 'Gotowane na wywarach z domowego rosołu, z sezonowymi składnikami.',
    items: [
      { name: 'Kwaśnica góralska', desc: 'na żeberkach, z ziemniakami i śmietaną', price: '18' },
      { name: 'Rosół babuni', desc: 'złocisty, z domowym makaronem', price: '16' },
      { name: 'Żurek w chlebku', desc: 'z białą kiełbasą i jajkiem', price: '22' },
      { name: 'Krem z pieczarek', desc: 'z grzankami i oliwą truflową', price: '20' },
    ],
  },
  {
    name: 'Dania główne',
    description: 'Porcje, które naprawdę nasycą — po góralsku, bez oszczędzania.',
    items: [
      { name: 'Placek po zbójnicku', desc: 'z gulaszem wieprzowym, cebulą i papryką', price: '34' },
      { name: 'Kotlet schabowy', desc: 'ręcznie panierowany, z ziemniakami i surówką', price: '32' },
      { name: 'Pierogi ruskie', desc: '12 sztuk, z cebulką i śmietaną', price: '26' },
      { name: 'Żeberka BBQ', desc: 'wolno pieczone 6h, z frytkami i coleslaw', price: '42' },
      { name: 'Pstrąg z grilla', desc: 'cały, z masłem czosnkowym i ziemniakami', price: '38' },
      { name: 'Gołąbki babuni', desc: 'w sosie pomidorowym, z puree ziemniaczanym', price: '28' },
    ],
  },
  {
    name: 'Z grilla',
    description: 'Oscypek i halloumi prosto z rusztu.',
    items: [
      { name: 'Oscypek z grilla', desc: 'z żurawiną i rukolą', price: '22' },
      { name: 'Halloumi z grilla', desc: 'z miodem i orzechami', price: '24' },
      { name: 'Kiełbasa zakopiańska', desc: 'z musztardą i chrzanem', price: '20' },
    ],
  },
  {
    name: 'Desery',
    description: 'Na słodko — domowe, nie z kartonika.',
    items: [
      { name: 'Szarlotka na ciepło', desc: 'z lodami waniliowymi i sosem karmelowym', price: '18' },
      { name: 'Naleśniki z jagodami', desc: 'z bitą śmietaną', price: '20' },
      { name: 'Sernik góralski', desc: 'pieczony, z sosem malinowym', price: '16' },
    ],
  },
]

function MenuSection() {
  const ref = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.menu-header > *', {
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

  return (
    <section ref={ref} id="menu" className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-warm-white">
      <div className="max-w-[900px] mx-auto">
        <div className="menu-header text-center mb-16">
          <div className="parzenica-divider text-terracotta mx-auto w-fit mb-6">
            <span className="font-mono text-xs tracking-[0.25em] uppercase">Karta dań</span>
          </div>
          <h2 className="font-drama italic text-espresso text-3xl md:text-4xl lg:text-5xl mb-4">
            Menu
          </h2>
          <p className="text-espresso/50 max-w-md mx-auto leading-relaxed">
            Gotujemy z tego, co mamy pod ręką — sezonowo, lokalnie, bez kombinowania.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {menuCategories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                i === active
                  ? 'bg-espresso text-cream shadow-[0_4px_16px_-4px_rgba(44,36,24,0.3)]'
                  : 'bg-espresso/5 text-espresso/50 hover:bg-espresso/10 hover:text-espresso/70'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu items */}
        <div>
          <p className="font-drama italic text-espresso/40 text-sm mb-8 text-center">
            {menuCategories[active].description}
          </p>
          <div className="space-y-0">
            {menuCategories[active].items.map((item, i) => (
              <div
                key={item.name}
                className="menu-item flex items-baseline gap-4 py-5 px-4 rounded-xl"
                style={{
                  animation: `fadeSlideIn 0.4s cubic-bezier(0.32, 0.72, 0, 1) ${i * 60}ms both`,
                }}
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading font-bold text-espresso tracking-tight">{item.name}</h4>
                  <p className="text-espresso/40 text-sm mt-0.5">{item.desc}</p>
                </div>
                <span className="flex-shrink-0 w-px h-4 bg-espresso/10 mx-2 hidden sm:block" />
                <span className="font-mono text-terracotta font-medium text-sm whitespace-nowrap">
                  {item.price} zł
                </span>
              </div>
            ))}
          </div>
          <p className="text-center text-espresso/25 text-xs mt-10 font-mono">
            Ceny orientacyjne. Menu zmienia się sezonowo.
          </p>
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
      {/* Subtle mountain texture in background */}
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
          Sielska Chata to miejsce, gdzie czas zwalnia. Siadasz, zamawiasz bez pośpiechu, a my podajemy to, co gotujemy od lat — uczciwie i z sercem.
        </p>
      </div>

      <MountainSilhouette
        className="absolute bottom-0 left-0 w-full h-24 opacity-20"
        color="#3D3226"
      />
    </section>
  )
}

// ─── EVENTS / HOW IT WORKS ───────────────────────────────
const steps = [
  {
    num: '01',
    title: 'Zadzwoń lub wpadnij',
    description: 'Rezerwacja? Wystarczy telefon. Wolisz spontanicznie? Prawie zawsze znajdziemy stolik.',
    icon: Phone,
  },
  {
    num: '02',
    title: 'Ciesz się posiłkiem',
    description: 'Usiądź wygodnie, zamów bez pośpiechu. Kuchnia działa non-stop od 9:00 do 19:00.',
    icon: Utensils,
  },
  {
    num: '03',
    title: 'Zaplanuj imprezę',
    description: 'Komunia, urodziny, spotkanie firmowe — dostosujemy menu i salę do Twoich potrzeb.',
    icon: Users,
  },
]

function Events() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.step-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="imprezy" className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <div className="md:grid md:grid-cols-12 md:gap-16 items-start">
          {/* Left — section header (sticky on desktop) */}
          <div className="md:col-span-4 md:sticky md:top-32 mb-12 md:mb-0">
            <div className="parzenica-divider text-terracotta w-fit mb-6">
              <span className="font-mono text-xs tracking-[0.25em] uppercase">Jak to działa</span>
            </div>
            <h2 className="font-drama italic text-espresso text-3xl md:text-4xl leading-snug mb-6">
              Prosto i bez komplikacji
            </h2>
            <p className="text-espresso/50 leading-relaxed mb-8">
              Nie lubimy zbędnych formalności. Zadzwoń, wpadnij, umów się — a my zajmiemy się resztą.
            </p>
            <a
              href="tel:+48780285859"
              className="btn-magnetic group inline-flex items-center gap-3 bg-espresso text-cream pl-6 pr-3 py-3 rounded-full font-semibold text-sm"
            >
              <span className="btn-bg bg-terracotta rounded-full" />
              <span className="relative z-10">Zadzwoń teraz</span>
              <span className="relative z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
                <ArrowRight size={14} />
              </span>
            </a>
          </div>

          {/* Right — step cards */}
          <div className="md:col-span-8 space-y-5">
            {steps.map((step) => (
              <div
                key={step.num}
                className="step-card group"
              >
                {/* Double-bezel outer shell */}
                <div className="bg-espresso/[0.02] border border-espresso/5 rounded-[2rem] p-1.5">
                  {/* Inner core */}
                  <div className="bg-warm-white rounded-[calc(2rem-0.375rem)] p-7 md:p-9 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] flex items-start gap-6">
                    <div className="w-14 h-14 rounded-[1.125rem] bg-terracotta/8 flex items-center justify-center flex-shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.05]">
                      <step.icon size={24} className="text-terracotta" />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-terracotta/60">{step.num}</span>
                      <h3 className="font-heading text-lg font-bold text-espresso mt-0.5 mb-2 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-espresso/50 leading-relaxed">{step.description}</p>
                    </div>
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

// ─── TESTIMONIALS ────────────────────────────────────────
const testimonials = [
  {
    quote: 'Najlepsza kwaśnica jaką jadłem poza domem babci. Porcje ogromne, a obsługa serdeczna jak u rodziny.',
    name: 'Marek K.',
    role: 'Turysta z Krakowa',
    initials: 'MK',
  },
  {
    quote: 'Robiliśmy tu komunię córki — 40 osób, zero stresu. Wszystko dopięte, a goście pytali o przepis na sernik.',
    name: 'Anna W.',
    role: 'Organizacja komunii',
    initials: 'AW',
  },
  {
    quote: 'Wracamy tu co wakacje. Dzieci uwielbiają naleśniki, my — spokój i widok z okna. Parking ogromny.',
    name: 'Tomasz i Kasia',
    role: 'Rodzina na urlopie',
    initials: 'TK',
  },
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
          <div className="flex items-center justify-center gap-3 text-espresso/40 mt-4">
            <span className="font-mono text-xs">Google 4.7/5</span>
            <span className="w-1 h-1 rounded-full bg-espresso/20" />
            <span className="font-mono text-xs">Orły Gastronomii 8.9/10</span>
          </div>
        </div>

        {/* Asymmetric 2+1 grid — NOT the banned 3-equal-columns */}
        <div className="grid md:grid-cols-12 gap-5">
          <div className="md:col-span-5 testimonial-card">
            <TestimonialCard t={testimonials[0]} />
          </div>
          <div className="md:col-span-7 testimonial-card">
            <TestimonialCard t={testimonials[1]} large />
          </div>
          <div className="md:col-span-12 testimonial-card">
            <TestimonialCard t={testimonials[2]} wide />
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ t, large, wide }) {
  return (
    <div className={`bg-background border border-espresso/5 rounded-[2rem] ${wide ? 'p-8 md:p-10 md:flex md:items-center md:gap-10' : 'p-7 md:p-9'} shadow-[0_4px_24px_-8px_rgba(44,36,24,0.04)] h-full`}>
      <p className={`font-drama italic text-espresso/75 leading-relaxed mb-6 ${large ? 'text-lg md:text-xl' : 'text-base'} ${wide ? 'md:mb-0 md:flex-1' : ''}`}>
        &bdquo;{t.quote}&rdquo;
      </p>
      <div className={`flex items-center gap-3 ${wide ? 'flex-shrink-0' : ''}`}>
        <div className="w-11 h-11 rounded-full bg-terracotta/10 flex items-center justify-center text-terracotta font-heading font-bold text-sm">
          {t.initials}
        </div>
        <div>
          <p className="font-heading font-bold text-espresso text-sm">{t.name}</p>
          <p className="font-mono text-espresso/35 text-xs">{t.role}</p>
        </div>
      </div>
    </div>
  )
}

// ─── CONTACT ─────────────────────────────────────────────
function Contact() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-left > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
      gsap.from('.contact-right', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const info = [
    { icon: MapPin, label: 'Adres', value: 'ul. Piłsudskiego 18, 34-700 Rabka-Zdrój', href: 'https://maps.google.com/?q=Sielska+Chata+Rabka-Zdrój' },
    { icon: Phone, label: 'Telefon', value: '+48 780 285 859', href: 'tel:+48780285859' },
    { icon: Clock, label: 'Godziny', value: 'Codziennie 9:00 – 19:00' },
    { icon: Car, label: 'Parking', value: 'Duży, bezpłatny parking przy restauracji' },
  ]

  return (
    <section ref={ref} id="kontakt" className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          {/* Left — contact info */}
          <div className="contact-left md:col-span-5">
            <div className="parzenica-divider text-terracotta w-fit mb-6">
              <span className="font-mono text-xs tracking-[0.25em] uppercase">Kontakt</span>
            </div>
            <h2 className="font-drama italic text-espresso text-3xl md:text-4xl leading-snug mb-4">
              Zapraszamy
              <br />do Sielskiej Chaty
            </h2>
            <p className="text-espresso/50 leading-relaxed mb-10 max-w-md">
              Masz pytanie o menu, chcesz zarezerwować stolik albo porozmawiać o organizacji imprezy? Zadzwoń — odpowiadamy szybko.
            </p>

            <div className="space-y-5">
              {info.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-[0.75rem] bg-terracotta/8 flex items-center justify-center flex-shrink-0">
                    <item.icon size={17} className="text-terracotta" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-espresso text-sm">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-espresso/55 text-sm hover:text-terracotta transition-colors duration-300" target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-espresso/55 text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="tel:+48780285859"
              className="btn-magnetic group inline-flex items-center gap-3 bg-terracotta text-white pl-7 pr-3.5 py-3.5 rounded-full font-semibold mt-10"
            >
              <span className="btn-bg bg-terracotta-dark rounded-full" />
              <span className="relative z-10">Zadzwoń teraz</span>
              <span className="relative z-10 w-9 h-9 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:scale-105">
                <Phone size={15} />
              </span>
            </a>
          </div>

          {/* Right — map */}
          <div className="contact-right md:col-span-7">
            {/* Double-bezel map container */}
            <div className="bg-espresso/[0.03] border border-espresso/5 rounded-[2rem] p-1.5">
              <div className="bg-warm-white rounded-[calc(2rem-0.375rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2584.3!2d19.9567!3d49.6097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47160a11db98e96d%3A0x6a4c4ab0c0e35bc6!2sPi%C5%82sudskiego%2018%2C%2034-700%20Rabka-Zdr%C3%B3j!5e0!3m2!1spl!2spl!4v1"
                  width="100%"
                  height="420"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa — Sielska Chata, Rabka-Zdrój"
                  className="w-full"
                />
                {/* Address bar below map */}
                <div className="px-6 py-5 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-terracotta flex-shrink-0" />
                    <span className="text-espresso/60 text-sm">
                      ul. Piłsudskiego 18, 34-700 Rabka-Zdrój
                    </span>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Sielska+Chata+Rabka-Zdrój"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading font-semibold text-terracotta text-sm hover:underline link-lift"
                  >
                    Nawiguj
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER ──────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-espresso px-6 md:px-16 lg:px-24 pt-16 pb-10">
      <MountainSilhouette
        className="w-full h-12 md:h-16 -mt-16 mb-8 opacity-30 text-bark"
      />
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-12 gap-10 mb-14">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <img src="/images/logo.jpg" alt="Sielska Chata" className="h-12 w-12 rounded-full object-cover" />
              <span className="font-drama text-cream text-xl font-semibold">Sielska Chata</span>
            </div>
            <p className="text-cream/30 text-sm leading-relaxed max-w-sm">
              Smaki polskiej tradycji w uzdrowiskowej Rabce-Zdrój. Restauracja rodzinna z kuchnią domową, cateringiem i organizacją imprez okolicznościowych.
            </p>
          </div>
          <div className="md:col-span-3">
            <h4 className="font-heading font-bold text-cream/60 text-xs tracking-wider uppercase mb-5">Nawigacja</h4>
            <div className="space-y-3">
              {[
                { label: 'Menu', href: '#menu' },
                { label: 'O nas', href: '#o-nas' },
                { label: 'Imprezy', href: '#imprezy' },
                { label: 'Kontakt', href: '#kontakt' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-cream/35 text-sm hover:text-terracotta transition-colors duration-300 link-lift"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="md:col-span-4">
            <h4 className="font-heading font-bold text-cream/60 text-xs tracking-wider uppercase mb-5">Kontakt</h4>
            <div className="space-y-3 text-sm">
              <p className="text-cream/35">ul. Piłsudskiego 18</p>
              <p className="text-cream/35">34-700 Rabka-Zdrój</p>
              <a href="tel:+48780285859" className="block text-terracotta hover:underline font-semibold">
                +48 780 285 859
              </a>
              <p className="text-cream/35">Codziennie 9:00–19:00</p>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/20 text-xs font-mono">
            &copy; {new Date().getFullYear()} Sielska Chata
          </p>
          <a
            href="https://aisolutions.design"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream/15 text-xs font-mono hover:text-cream/30 transition-colors"
          >
            aisolutions.design
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─── APP ─────────────────────────────────────────────────
function App() {
  useEffect(() => {
    if (window.location.pathname.startsWith('/wersja2')) {
      document.documentElement.setAttribute('data-theme', 'v2')
    }
    return () => document.documentElement.removeAttribute('data-theme')
  }, [])

  return (
    <div className="noise-overlay">
      <Navbar />
      <Hero />
      <AwardsBanner />
      <About />
      <MenuSection />
      <Philosophy />
      <Events />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
