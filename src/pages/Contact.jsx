import { useRef, useEffect } from 'react'
import { Link } from 'wouter'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, MapPin, Clock, Car, ArrowRight } from 'lucide-react'
import MountainSilhouette from '../components/MountainSilhouette'
import Button from '../components/Button'
import { CONTACT } from '../data/contact'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Contact() {
  const ref = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const ctx = gsap.context(() => {
      gsap.from('.contact-page > *', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 md:px-16 lg:px-24 bg-espresso overflow-hidden">
        <MountainSilhouette className="absolute bottom-0 left-0 w-full h-16 md:h-20" color="#FAF7F2" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="parzenica-divider text-terracotta w-fit mb-6">
            <span className="font-mono text-xs tracking-[0.25em] uppercase">Kontakt</span>
          </div>
          <h1 className="font-heading text-cream text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-none mb-6">
            Kontakt i Rezerwacja<br />
            <span className="text-terracotta">Sielska Chata Rabka-Zdrój</span>
          </h1>
          <p className="text-cream/55 text-lg leading-relaxed max-w-2xl">
            Zarezerwuj stolik telefonicznie lub wpadnij spontanicznie. Bezpłatny parking przy restauracji.
          </p>
        </div>
      </section>

      {/* Contact details + map */}
      <section ref={ref} className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-background">
        <div className="max-w-[1400px] mx-auto">
          <div className="contact-page grid md:grid-cols-12 gap-10 md:gap-16">

            {/* Info */}
            <div className="md:col-span-5">
              <h2 className="font-drama italic text-espresso text-3xl md:text-4xl leading-snug mb-4">
                Zapraszamy
              </h2>
              <p className="text-espresso/50 leading-relaxed mb-10">
                Masz pytanie o menu, chcesz zarezerwować stolik albo porozmawiać o organizacji imprezy? Zadzwoń — odpowiadamy szybko.
              </p>

              <div className="space-y-5 mb-10">
                {[
                  {
                    icon: MapPin,
                    label: 'Adres',
                    value: CONTACT.address.full,
                    href: CONTACT.maps.googleMaps,
                    external: true,
                  },
                  {
                    icon: Phone,
                    label: 'Telefon',
                    value: CONTACT.phone.display,
                    href: CONTACT.phone.href,
                  },
                  {
                    icon: Clock,
                    label: 'Godziny otwarcia',
                    value: CONTACT.hours.display,
                  },
                  {
                    icon: Car,
                    label: 'Parking',
                    value: 'Duży, bezpłatny parking przy restauracji',
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-[0.75rem] bg-terracotta/8 flex items-center justify-center flex-shrink-0">
                      <item.icon size={17} className="text-terracotta" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-espresso text-sm">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-espresso/55 text-sm hover:text-terracotta transition-colors duration-300"
                          target={item.external ? '_blank' : undefined}
                          rel={item.external ? 'noopener noreferrer' : undefined}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-espresso/55 text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Button href={CONTACT.phone.href} variant="primary" icon={<Phone size={15} />}>
                Zadzwoń teraz
              </Button>
            </div>

            {/* Map */}
            <div className="md:col-span-7">
              <div className="bg-espresso/[0.03] border border-espresso/5 rounded-[2rem] p-1.5">
                <div className="bg-warm-white rounded-[calc(2rem-0.375rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2584.3!2d19.9567!3d49.6097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47160a11db98e96d%3A0x6a4c4ab0c0e35bc6!2sPi%C5%82sudskiego%2018%2C%2034-700%20Rabka-Zdr%C3%B3j!5e0!3m2!1spl!2spl!4v1"
                    title={`Mapa — ${CONTACT.name}, ${CONTACT.address.full}`}
                    width="100%"
                    height="420"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full"
                  />
                  <div className="px-6 py-5 flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <MapPin size={16} className="text-terracotta flex-shrink-0" />
                      <span className="text-espresso/60 text-sm">
                        {CONTACT.address.full}
                      </span>
                    </div>
                    <a
                      href={CONTACT.maps.googleMaps}
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

      {/* Directions */}
      <section className="py-20 px-6 md:px-16 lg:px-24 bg-warm-white">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-drama italic text-espresso text-2xl md:text-3xl mb-8">
            Jak dojechać do Sielskiej Chaty?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Samochodem z Krakowa',
                desc: 'Drogą krajową DK47 przez Myślenice i Rabkę. Rabka-Zdrój to ok. 70 km od centrum Krakowa — około godziny jazdy. Restauracja przy ul. Piłsudskiego 18, tuż przy głównej drodze.',
              },
              {
                title: 'Samochodem z Zakopanego',
                desc: 'Drogą DK47 w kierunku Rabki-Zdrój — ok. 25 km, 30 minut. Sielska Chata to świetny przystanek w drodze powrotnej z Zakopanego.',
              },
              {
                title: 'Komunikacją publiczną',
                desc: 'Pociągiem lub autobusem do Rabki-Zdrój. Dworzec autobusowy i PKP w odległości kilku minut spacerem od restauracji.',
              },
              {
                title: 'Parking',
                desc: 'Duży, bezpłatny parking bezpośrednio przy restauracji. Nie musisz szukać miejsca — zawsze znajdziesz wolne.',
              },
            ].map((d) => (
              <div key={d.title} className="bg-background rounded-2xl p-6 border border-espresso/5">
                <h3 className="font-heading font-bold text-espresso mb-2">{d.title}</h3>
                <p className="text-espresso/50 text-sm leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
