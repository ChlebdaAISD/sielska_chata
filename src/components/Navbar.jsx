import { useState, useEffect } from 'react'
import { Link, useLocation } from 'wouter'
import { Phone, Menu as MenuIcon, X } from 'lucide-react'
import Button from './Button'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [location] = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const links = [
    { label: 'Strona główna', href: '/' },
    { label: 'Menu', href: '/menu/' },
    { label: 'O nas', href: '/o-nas/' },
    { label: 'Imprezy', href: '/imprezy/' },
    { label: 'Kontakt', href: '/kontakt/' },
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
        <Link href="/" className="flex items-center gap-2.5">
          <img
            src="/images/logo.jpg"
            alt="Sielska Chata — restauracja w Rabce-Zdrój"
            className={`rounded-full object-cover transition-all duration-700 ${scrolled ? 'h-9 w-9' : 'h-11 w-11'}`}
          />
          <span
            className={`font-drama font-semibold tracking-tight transition-all duration-700 ${
              scrolled ? 'text-espresso text-base' : 'text-white text-lg'
            }`}
          >
            Sielska Chata
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`link-lift px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 ${
                scrolled
                  ? 'text-espresso/70 hover:text-espresso hover:bg-espresso/5'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button href="tel:+48780285859" variant="primary" size="sm" className="ml-2">
            <Phone size={14} />
            Zadzwoń
          </Button>
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
            <Link
              key={link.href}
              href={link.href}
              className="text-cream text-3xl font-drama font-semibold hover:text-terracotta transition-colors duration-300"
              style={{
                transitionDelay: menuOpen ? `${i * 80}ms` : '0ms',
                transform: menuOpen ? 'translateY(0)' : 'translateY(2rem)',
                opacity: menuOpen ? 1 : 0,
                transition: 'all 0.5s cubic-bezier(0.32, 0.72, 0, 1)',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Button href="tel:+48780285859" variant="primary" size="lg" className="mt-4">
            <Phone size={18} />
            +48 780 285 859
          </Button>
        </div>
      </div>
    </>
  )
}
