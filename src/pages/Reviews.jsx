import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Star } from 'lucide-react'
import MountainSilhouette from '../components/MountainSilhouette'
import Button from '../components/Button'
import ReviewCard from '../components/ReviewCard'
import reviewsData from '../data/reviews.json'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const GOOGLE_REVIEWS_URL = 'https://www.google.com/search?q=Sielska+Chata+Rabka-Zdr%C3%B3j+opinie'

function chunkArray(array, chunkSize) {
  const result = []
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize))
  }
  return result
}

const reviewChunks = chunkArray(reviewsData, Math.ceil(reviewsData.length / 3))

export default function Reviews() {
  const statsRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const ctx = gsap.context(() => {
      gsap.from('.reviews-stat', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: statsRef.current, start: 'top 80%' },
      })
      gsap.from('.reviews-card', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.04,
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 md:px-16 lg:px-24 bg-espresso overflow-hidden">
        <MountainSilhouette className="absolute bottom-0 left-0 w-full h-16 md:h-20" color="#FAF7F2" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="parzenica-divider text-terracotta w-fit mb-6">
            <span className="font-mono text-xs tracking-[0.25em] uppercase">Opinie gości</span>
          </div>
          <h1 className="font-heading text-cream text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-none mb-6">
            Opinie o Sielskiej Chacie —<br />
            <span className="text-terracotta">Google 4.6/5, Orły Gastronomii 8.9</span>
          </h1>
          <p className="text-cream/55 text-lg leading-relaxed max-w-2xl">
            Co mówią nasi goście? Sprawdź autentyczne opinie z Google i przekonaj się, dlaczego warto nas odwiedzić.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="py-16 px-6 md:px-16 lg:px-24 bg-background">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <div className="reviews-stat bg-white border border-stone-100 rounded-xl p-8 text-center shadow-sm">
              <div className="font-heading text-5xl font-extrabold text-espresso mb-2">4.6</div>
              <div className="flex justify-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="fill-terracotta text-terracotta" />
                ))}
              </div>
              <p className="font-mono text-xs uppercase tracking-widest text-stone-400">Średnia ocena Google</p>
            </div>
            <div className="reviews-stat bg-white border border-stone-100 rounded-xl p-8 text-center shadow-sm flex flex-col items-center justify-center">
              <div className="font-heading text-4xl font-extrabold text-espresso mb-2">96+ opinii</div>
              <p className="font-mono text-xs uppercase tracking-widest text-stone-400">Na Google Business</p>
            </div>
            <div className="reviews-stat bg-white border border-stone-100 rounded-xl p-8 text-center shadow-sm flex flex-col items-center justify-center">
              <div className="font-heading text-4xl font-extrabold text-terracotta mb-2">8.9</div>
              <p className="font-mono text-xs uppercase tracking-widest text-stone-400">Orły Gastronomii 2026</p>
            </div>
          </div>

          {/* Reviews masonry grid */}
          <div className="mb-6">
            <div className="parzenica-divider text-terracotta w-fit mb-4">
              <span className="font-mono text-xs tracking-[0.25em] uppercase">Opinie z Google</span>
            </div>
            <h2 className="font-heading text-espresso text-3xl md:text-4xl font-bold tracking-tight mb-10">
              Co mówią goście o naszej restauracji?
            </h2>
          </div>

          <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviewChunks.map((chunk, chunkIndex) => (
              <div key={chunkIndex} className="space-y-4">
                {chunk.map((review, i) => (
                  <div key={`${chunkIndex}-${i}`} className="reviews-card">
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rate us CTA */}
      <section className="py-20 px-6 md:px-16 lg:px-24 bg-espresso">
        <div className="max-w-[1400px] mx-auto text-center">
          <div className="parzenica-divider text-terracotta w-fit mx-auto mb-6">
            <span className="font-mono text-xs tracking-[0.25em] uppercase">Oceń nas</span>
          </div>
          <h2 className="font-heading text-cream text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Byłeś u nas? Zostaw opinię!
          </h2>
          <p className="text-cream/55 text-lg mb-10 max-w-xl mx-auto">
            Twoja opinia pomaga nam się rozwijać i dociera do innych gości szukających dobrego miejsca w Rabce-Zdrój.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full font-semibold whitespace-nowrap bg-terracotta text-cream px-8 py-4 hover:bg-terracotta/90 transition-colors duration-300"
            >
              Wystaw opinię na Google
              <ExternalLink size={16} className="shrink-0" />
            </a>
            <Button variant="secondary-dark" href="/kontakt/">
              Zarezerwuj stolik
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
