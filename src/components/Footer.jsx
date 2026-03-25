import { Link } from 'wouter'
import MountainSilhouette from './MountainSilhouette'

export default function Footer() {
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
              Restauracja z kuchnią polską i europejską w uzdrowiskowej Rabce-Zdrój. Szeroka karta, duże porcje, drewniane wnętrze i organizacja imprez okolicznościowych.
            </p>
          </div>
          <div className="md:col-span-3">
            <h4 className="font-heading font-bold text-cream/60 text-xs tracking-wider uppercase mb-5">Nawigacja</h4>
            <div className="space-y-3">
              {[
                { label: 'Menu', href: '/menu/' },
                { label: 'O nas', href: '/o-nas/' },
                { label: 'Imprezy', href: '/imprezy/' },
                { label: 'Kontakt', href: '/kontakt/' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-cream/35 text-sm hover:text-terracotta transition-colors duration-300 link-lift"
                >
                  {link.label}
                </Link>
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
            &copy; {new Date().getFullYear()} Sielska Chata — restauracja w Rabce-Zdrój
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
