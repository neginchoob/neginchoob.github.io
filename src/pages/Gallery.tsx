import { useMemo, useState } from 'react'
import { Link, NavLink, Navigate, useParams } from 'react-router-dom'
import { byCategory, categories, fa, img } from '../data'
import Lightbox from '../components/Lightbox'

// Normalise Arabic/Persian letter variants and case so search is forgiving
const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[‌\-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

export default function Gallery() {
  const { categoryId = '' } = useParams()
  const category = categories.find((c) => c.id === categoryId)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState<number | null>(null)

  const all = useMemo(() => byCategory(categoryId), [categoryId])
  const items = useMemo(() => {
    const q = norm(query)
    if (!q) return all
    return all.filter((t) => norm(`${t.name} ${t.code}`).includes(q))
  }, [all, query])

  if (!category) return <Navigate to="/" replace />

  return (
    <div className="page">
      <header className="bar">
        <Link to="/" className="home-link">
          نگین چوب قائم
        </Link>
        <nav className="tabs" aria-label="دسته‌ها">
          {categories.map((c) => (
            <NavLink
              key={c.id}
              to={`/gallery/${c.id}`}
              className={({ isActive }) => `tab${isActive ? ' is-active' : ''}`}
              onClick={() => setQuery('')}
            >
              {c.name}
            </NavLink>
          ))}
        </nav>
      </header>

      <div className="toolbar">
        <h1 className="title">{category.name}</h1>
        <label className="search">
          <span className="visually-hidden">جستجوی طرح</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجوی نام یا کد طرح"
          />
        </label>
        <p className="count" aria-live="polite">
          {query ? `${fa(items.length)} از ${fa(all.length)} طرح` : `${fa(all.length)} طرح`}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="empty">
          <p>طرحی با «{query}» پیدا نشد. نام فارسی یا کد انگلیسی طرح را امتحان کنید.</p>
          <button type="button" className="btn" onClick={() => setQuery('')}>
            نمایش همه‌ی طرح‌ها
          </button>
        </div>
      ) : (
        <ul className="grid">
          {items.map((t, i) => (
            <li key={t.id}>
              <button type="button" className="chip" onClick={() => setOpen(i)}>
                <span className="chip-face">
                  <img src={img(t.image)} alt="" loading="lazy" decoding="async" />
                  <span className="chip-hole" aria-hidden="true" />
                </span>
                <span className="chip-edge" aria-hidden="true" />
                <span className="chip-label">
                  <span className="chip-name">{t.name || t.code}</span>
                  {t.name && (
                    <span className="chip-code" dir="ltr">
                      {t.code}
                    </span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {open !== null && (
        <Lightbox items={items} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
      )}
    </div>
  )
}
