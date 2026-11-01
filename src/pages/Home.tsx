import { Link } from 'react-router-dom'
import { byCategory, categories, fa, img, textures } from '../data'

export default function Home() {
  return (
    <div className="page">
      <header className="masthead">
        <h1 className="brand">نگین چوب قائم</h1>
        <p className="lede">
          آلبوم دکورهای ام‌دی‌اف با {fa(textures.length)} طرح در {fa(categories.length)} دسته. یک دسته را
          انتخاب کنید و روی هر نمونه بزنید تا بزرگ‌تر ببینید.
        </p>
      </header>

      <nav className="shelf" aria-label="دسته‌ها">
        {categories.map((c) => (
          <Link key={c.id} to={`/gallery/${c.id}`} className="panel">
            <img src={img(c.thumbnail)} alt="" className="panel-img" />
            <span className="panel-edge" aria-hidden="true" />
            <span className="panel-text">
              <span className="panel-name">{c.name}</span>
              <span className="panel-count">{fa(byCategory(c.id).length)} طرح</span>
            </span>
          </Link>
        ))}
      </nav>

      <footer className="foot">نگین چوب قائم</footer>
    </div>
  )
}
