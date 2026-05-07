import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function MasonryGallery({ images = [] }) {
  const [current, setCurrent] = useState(null)

  const total = images.length
  const isOpen = current !== null

  const open = (index) => setCurrent(index)
  const close = () => setCurrent(null)
  const prev = useCallback(() => setCurrent((i) => (i - 1 + total) % total), [total])
  const next = useCallback(() => setCurrent((i) => (i + 1) % total), [total])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, prev, next])

  useEffect(() => {
    if (!isOpen) return
    let startX = 0
    const onTouchStart = (e) => { startX = e.changedTouches[0].screenX }
    const onTouchEnd = (e) => {
      const delta = e.changedTouches[0].screenX - startX
      if (delta > 40) prev()
      if (delta < -40) next()
    }
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [isOpen, prev, next])

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-2 md:gap-3 [column-fill:balance]">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => open(i)}
            className="relative w-full mb-2 md:mb-3 break-inside-avoid block overflow-hidden group bg-espresso/5 focus:outline-none rounded-[0.75rem]"
            aria-label={`Otwórz zdjęcie: ${img.alt}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="block w-full h-auto transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/10 transition-colors duration-300 pointer-events-none" />
          </button>
        ))}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-espresso/95 backdrop-blur-sm flex flex-col items-center justify-center"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 md:top-8 md:right-8 text-cream/70 hover:text-cream transition-colors z-10 p-2"
            aria-label="Zamknij galerię"
          >
            <X size={32} />
          </button>

          <div
            className="flex items-center justify-between w-full max-w-7xl px-2 md:px-8 h-full pt-16 pb-16"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={prev}
              className="flex-shrink-0 text-cream/50 hover:text-cream transition-all hover:-translate-x-1 p-2 md:p-4 focus:outline-none"
              aria-label="Poprzednie zdjęcie"
            >
              <ChevronLeft size={36} className="md:w-10 md:h-10" />
            </button>

            <div className="flex-1 h-full flex items-center justify-center px-2 md:px-6 overflow-hidden">
              <img
                key={current}
                src={images[current]?.src}
                alt={images[current]?.alt}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                style={{ animation: 'galleryFadeIn 0.25s ease-out' }}
              />
            </div>

            <button
              onClick={next}
              className="flex-shrink-0 text-cream/50 hover:text-cream transition-all hover:translate-x-1 p-2 md:p-4 focus:outline-none"
              aria-label="Następne zdjęcie"
            >
              <ChevronRight size={36} className="md:w-10 md:h-10" />
            </button>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/60 font-mono text-sm tracking-widest">
            {current + 1} / {total}
          </div>
        </div>
      )}
    </>
  )
}
