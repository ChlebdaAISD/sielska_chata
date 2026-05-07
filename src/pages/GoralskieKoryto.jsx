import { Phone, CheckCircle, Truck } from 'lucide-react'
import MountainSilhouette from '../components/MountainSilhouette'
import Button from '../components/Button'
import { CONTACT } from '../data/contact'

const korytoItems = [
  'Golonka pieczona',
  'Kaszanka z cebulą',
  'Schabowy / devolay',
  'Kiełbasa pieczona',
  'Pierogi (ruskie i z mięsem)',
  'Ziemniaki opiekane',
  'Kapusta zasmażana',
]

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Góralskie Koryto na Dowóz',
  description: 'Tradycyjne góralskie koryto z mięsami, pierogami i dodatkami — z dowozem w Rabce-Zdrój i okolicach. Golonka, kaszanka, schabowy, kiełbasa, pierogi, ziemniaki, kapusta zasmażana.',
  image: 'https://www.sielskachatarabka.pl/images/food/food-03.webp',
  brand: { '@type': 'Brand', name: 'Sielska Chata' },
  offers: {
    '@type': 'Offer',
    price: '50',
    priceCurrency: 'PLN',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '50',
      priceCurrency: 'PLN',
      referenceQuantity: { '@type': 'QuantitativeValue', value: '1', unitText: 'osoba' },
    },
    availability: 'https://schema.org/InStock',
    seller: { '@type': 'Restaurant', name: 'Sielska Chata' },
  },
}

export default function GoralskieKoryto() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 md:px-16 lg:px-24 bg-espresso overflow-hidden">
        <MountainSilhouette className="absolute bottom-0 left-0 w-full h-16 md:h-20" color="#FAF7F2" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="parzenica-divider text-terracotta w-fit mb-6">
            <span className="font-mono text-xs tracking-[0.25em] uppercase">Dowóz</span>
          </div>
          <h1 className="font-heading text-cream text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-none mb-6">
            Góralskie Koryto<br />
            <span className="text-terracotta">na Dowóz</span>
          </h1>
          <p className="text-cream/55 text-lg leading-relaxed max-w-2xl">
            Tradycyjna porcja prosto z Sielskiej Chaty — dla całej grupy, bez kuchennego zamieszania. Dowozimy w Rabce-Zdrój i okolicach. Idealne na imprezy firmowe, spotkania rodzinne i weekendy w pensjonacie.
          </p>
        </div>
      </section>

      {/* Description */}
      <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-warm-white">
        <div className="max-w-[900px] mx-auto">
          <div className="parzenica-divider text-terracotta w-fit mb-6">
            <span className="font-mono text-xs tracking-[0.25em] uppercase">Tradycja Podhala</span>
          </div>
          <h2 className="font-drama italic text-espresso text-3xl md:text-4xl mb-6 leading-snug">
            Wszystko, co najlepsze, na jednej desce
          </h2>
          <p className="text-espresso/65 leading-relaxed mb-5">
            Góralskie koryto to zestaw mięs, pierogów i dodatków podawany razem na jednym, długim półmisku. Tradycyjna kompozycja Podhala — porcja, która łączy stół, a nie dzieli go na osobne talerze.
          </p>
          <p className="text-espresso/65 leading-relaxed">
            Przygotowujemy je tak, jak na miejscu w restauracji — z tych samych składników, w tej samej kuchni. Sprawdza się na imprezy firmowe, spotkania w pensjonacie, urodziny w domu czy zwyczajne wieczory ze znajomymi.
          </p>
        </div>
      </section>

      {/* Product image */}
      <section className="px-6 md:px-16 lg:px-24 bg-warm-white pb-24 md:pb-32">
        <div className="max-w-[1100px] mx-auto">
          <img
            src="/images/food/food-03.webp"
            alt="Góralskie koryto z mięsami i pierogami — Sielska Chata Rabka-Zdrój"
            loading="lazy"
            width={1200}
            height={800}
            className="w-full h-auto rounded-[1.5rem] object-cover shadow-[0_24px_60px_-20px_rgba(44,36,24,0.25)]"
          />
        </div>
      </section>

      {/* What's in koryto */}
      <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-background">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <div className="parzenica-divider text-terracotta mx-auto w-fit mb-6">
              <span className="font-mono text-xs tracking-[0.25em] uppercase">Co w korycie</span>
            </div>
            <h2 className="font-drama italic text-espresso text-3xl md:text-4xl">
              Pełna porcja, bez kompromisów
            </h2>
          </div>

          <ul className="grid md:grid-cols-2 gap-x-10 gap-y-4">
            {korytoItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-espresso/75">
                <CheckCircle size={18} className="text-terracotta flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Price + delivery */}
      <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-warm-white">
        <div className="max-w-[700px] mx-auto bg-background border border-espresso/8 rounded-[2rem] px-8 py-12 md:px-12 md:py-14 text-center">
          <p className="font-mono text-xs text-terracotta tracking-[0.25em] uppercase mb-4">Cena</p>
          <p className="font-drama italic text-espresso text-5xl md:text-6xl mb-2">
            od 50 zł
          </p>
          <p className="text-espresso/55 text-sm tracking-wide mb-8">za osobę</p>

          <div className="flex items-start gap-3 text-left max-w-md mx-auto bg-warm-white border border-espresso/5 rounded-[1.25rem] px-6 py-5">
            <Truck size={18} className="text-terracotta flex-shrink-0 mt-1" />
            <p className="text-espresso/65 text-sm leading-relaxed">
              Dowozimy w Rabce-Zdrój i okolicach. Liczbę osób, datę i adres dowozu ustalamy telefonicznie.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-16 lg:px-24 bg-espresso relative overflow-hidden">
        <MountainSilhouette className="absolute top-0 left-0 w-full h-16 rotate-180 opacity-20" color="#3D3226" />
        <div className="relative z-10 max-w-[900px] mx-auto text-center">
          <h2 className="font-drama italic text-cream text-3xl md:text-4xl mb-4">
            Zamów góralskie koryto
          </h2>
          <p className="text-cream/60 mb-8 max-w-md mx-auto">
            Zadzwoń — ustalimy liczbę osób, datę i adres dowozu.
          </p>
          <Button href={CONTACT.phone.href} variant="primary" size="lg" icon={<Phone size={18} />}>
            {CONTACT.phone.display}
          </Button>
        </div>
      </section>
    </>
  )
}
