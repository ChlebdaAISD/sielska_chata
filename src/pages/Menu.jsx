import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, ArrowRight, UtensilsCrossed } from 'lucide-react'
import MountainSilhouette from '../components/MountainSilhouette'
import Button from '../components/Button'
import GalleryLightbox from '../components/GalleryLightbox'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

function buildRenderList(items) {
  const list = []
  let lastSub = null
  items.forEach((item, i) => {
    if (item.subcategory && item.subcategory !== lastSub) {
      list.push({ type: 'subheader', name: item.subcategory, key: `sub-${item.subcategory}` })
      lastSub = item.subcategory
    }
    list.push({ type: 'item', ...item, _index: i })
  })
  return list
}

export default function Menu() {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('/menu.json')
      .then((r) => r.json())
      .then((data) => setCategories(data.categories))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const ctx = gsap.context(() => {
      gsap.from('.menu-page-header > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const currentCategory = categories[active]

  return (
    <>
      {/* Hero banner */}
      <section className="relative pt-40 pb-20 px-6 md:px-16 lg:px-24 bg-espresso overflow-hidden">
        <MountainSilhouette className="absolute bottom-0 left-0 w-full h-16 md:h-20" color="#FAF7F2" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="parzenica-divider text-terracotta w-fit mb-6">
            <span className="font-mono text-xs tracking-[0.25em] uppercase">Karta dań</span>
          </div>
          <h1 className="font-heading text-cream text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-none mb-6">
            Menu — Sielska Chata<br />
            <span className="text-terracotta">Rabka-Zdrój</span>
          </h1>
          <p className="text-cream/55 text-lg leading-relaxed max-w-2xl">
            Szeroka karta z kuchnią polską i europejską. Przystawki, zupy, dania główne, ryby, pierogi, sałatki, desery i menu dla dzieci. Ceny orientacyjne — menu zmienia się sezonowo.
          </p>
        </div>
      </section>

      {/* Menu section */}
      <section ref={ref} className="py-16 md:py-24 px-6 md:px-16 lg:px-24 bg-warm-white">
        <div className="max-w-[900px] mx-auto">

          {/* Info cards */}
          <div className="menu-page-header grid grid-cols-2 md:grid-cols-3 gap-4 mb-14">
            {[
              { label: 'Jedzenie na wynos', desc: 'Zamów telefonicznie — odbierz gotowe' },
              { label: 'Menu dla dzieci', desc: 'Rosół, pomidorowa, klopsiki, nuggetsy' },
              { label: 'Menu sezonowe', desc: 'Karta zmienia się przez cały rok' },
            ].map((c) => (
              <div key={c.label} className="bg-background rounded-2xl p-5 border border-espresso/5">
                <UtensilsCrossed size={18} className="text-terracotta mb-2" />
                <p className="font-heading font-bold text-espresso text-sm">{c.label}</p>
                <p className="text-espresso/45 text-xs mt-0.5">{c.desc}</p>
              </div>
            ))}
          </div>

          {categories.length === 0 ? (
            <div className="text-center text-espresso/30 font-mono text-sm py-16">Ładowanie menu…</div>
          ) : (
            <>
              {/* Category tabs */}
              <div className="flex flex-wrap justify-center gap-2 mb-14">
                {categories.map((cat, i) => (
                  <button
                    key={cat.id}
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
              {currentCategory && (
                <div key={currentCategory.id}>
                  <div className="space-y-0">
                    {buildRenderList(currentCategory.items).map((entry) =>
                      entry.type === 'subheader' ? (
                        <p
                          key={entry.key}
                          className="font-mono text-xs tracking-[0.2em] uppercase text-terracotta/70 pt-7 pb-3 px-4 first:pt-0"
                        >
                          {entry.name}
                        </p>
                      ) : (
                        <div
                          key={entry.id}
                          className="flex items-baseline gap-4 py-4 px-4 rounded-xl hover:bg-espresso/[0.025] transition-colors duration-300"
                          style={{
                            animation: `fadeSlideIn 0.4s cubic-bezier(0.32, 0.72, 0, 1) ${entry._index * 40}ms both`,
                          }}
                        >
                          <div className="flex-1 min-w-0">
                            <h3 className="font-heading font-bold text-espresso tracking-tight leading-snug">
                              {entry.name}
                            </h3>
                            {entry.description && (
                              <p className="text-espresso/40 text-sm mt-0.5">{entry.description}</p>
                            )}
                          </div>
                          <span className="flex-shrink-0 w-px h-4 bg-espresso/10 mx-2 hidden sm:block" />
                          <span className="font-mono text-terracotta font-medium text-sm whitespace-nowrap">
                            {entry.price} zł
                            {entry.priceNote && (
                              <span className="text-espresso/30 font-normal"> {entry.priceNote}</span>
                            )}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                  <p className="text-center text-espresso/25 text-xs mt-10 font-mono">
                    Ceny orientacyjne. Menu zmienia się sezonowo.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Dish gallery — placeholder images, client will supply final photos */}
      <section className="py-16 md:py-20 px-6 md:px-16 lg:px-24 bg-background">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-10">
            <div className="parzenica-divider text-terracotta mx-auto w-fit mb-6">
              <span className="font-mono text-xs tracking-[0.25em] uppercase">Galeria</span>
            </div>
            <h2 className="font-drama italic text-espresso text-2xl md:text-3xl">
              Nasze dania
            </h2>
          </div>
          <GalleryLightbox
            images={[
              { src: '/images/hero.jpg', alt: 'Danie restauracji Sielska Chata 1' },
              { src: '/images/hero.jpg', alt: 'Danie restauracji Sielska Chata 2' },
              { src: '/images/hero.jpg', alt: 'Danie restauracji Sielska Chata 3' },
              { src: '/images/hero.jpg', alt: 'Danie restauracji Sielska Chata 4' },
              { src: '/images/hero.jpg', alt: 'Danie restauracji Sielska Chata 5' },
            ]}
          />
        </div>
      </section>

      {/* Takeout CTA */}
      <section className="py-20 px-6 md:px-16 lg:px-24 bg-background">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-drama italic text-espresso text-2xl md:text-3xl mb-4">
            Jedzenie na wynos — Rabka-Zdrój
          </h2>
          <p className="text-espresso/50 mb-8 max-w-md mx-auto">
            Zamów telefonicznie, przyjdź i odbierz. Czynni codziennie 9:00–19:00.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="tel:+48780285859" variant="primary" icon={<Phone size={15} />}>
              Zadzwoń i zamów
            </Button>
            <Button to="/kontakt/" variant="secondary">
              Jak dojechać <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
