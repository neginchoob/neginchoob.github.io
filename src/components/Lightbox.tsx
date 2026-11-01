import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { fa, img, type Texture } from '../data'

interface Props {
  items: Texture[]
  index: number
  onChange: (i: number) => void
  onClose: () => void
}

export default function Lightbox({ items, index, onChange, onClose }: Props) {
  const t = items[index]
  const closeRef = useRef<HTMLButtonElement>(null)
  const touchX = useRef<number | null>(null)
  const count = items.length
  const prev = () => onChange((index - 1 + count) % count)
  const next = () => onChange((index + 1) % count)

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      opener?.focus()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      // RTL reading order: the right arrow goes back, the left arrow goes forward
      if (e.key === 'ArrowRight') prev()
      if (e.key === 'ArrowLeft') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  // Preload neighbours so stepping through feels instant
  useEffect(() => {
    ;[items[(index + 1) % count], items[(index - 1 + count) % count]].forEach((n) => {
      if (n) new Image().src = img(n.image)
    })
  }, [index, items, count])

  if (!t) return null

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={t.name || t.code}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) (dx > 0 ? next : prev)()
        touchX.current = null
      }}
    >
      <button ref={closeRef} type="button" className="lb-close" onClick={onClose}>
        بستن
      </button>

      <figure className="lb-figure">
        <img key={t.id} src={img(t.image)} alt={t.name || t.code} className="lb-img" />
        <figcaption className="lb-caption">
          <span className="lb-name">{t.name || t.code}</span>
          {t.name && (
            <span className="lb-code" dir="ltr">
              {t.code}
            </span>
          )}
          <span className="lb-pos">
            {fa(index + 1)} از {fa(count)}
          </span>
        </figcaption>
      </figure>

      {count > 1 && (
        <>
          <button type="button" className="lb-nav lb-prev" onClick={prev} aria-label="طرح قبلی">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
          <button type="button" className="lb-nav lb-next" onClick={next} aria-label="طرح بعدی">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
        </>
      )}
    </div>,
    document.body,
  )
}
