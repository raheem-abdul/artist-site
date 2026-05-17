import { useState } from 'react'
import { useIntl } from 'react-intl'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { formatMessage: t } = useIntl()

  const closeMobile = () => setMenuOpen(false)

  const links = [
    { id: 'nav.link.services', href: '#services' },
    { id: 'nav.link.portfolio', href: '#portfolio' },
    { id: 'nav.link.about', href: '#about' },
    { id: 'nav.link.reviews', href: '#testimonials' },
    { id: 'nav.link.contact', href: '#contact' },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-[72px] flex items-center justify-between px-12 bg-cream/88 backdrop-blur-lg border-b border-blush-deep/30 z-50">
        <div className="font-display text-xl tracking-wider text-plum">
          {t({ id: 'nav.logo.first' })} <span className="italic text-mauve">{t({ id: 'nav.logo.last' })}</span>
        </div>
        <ul className="hidden md:flex gap-9 list-none">
          {links.map(l => (
            <li key={l.id}>
              <a href={l.href} className="text-xs font-medium uppercase tracking-[0.12em] text-text-muted hover:text-plum transition-colors">
                {t({ id: l.id })}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="hidden md:block nav-cta">{t({ id: 'nav.cta' })}</a>
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer bg-none border-none p-0"
          aria-label="Menu"
          onClick={() => setMenuOpen(o => !o)}
        >
          <span className="block w-6 h-0.375 bg-plum transition-all" />
          <span className="block w-6 h-0.375 bg-plum transition-all" />
          <span className="block w-6 h-0.375 bg-plum transition-all" />
        </button>
      </nav>

      <div className={`fixed top-[72px] left-0 right-0 bg-cream px-12 py-8 border-b border-blush-deep/30 z-40 flex-col gap-6 ${menuOpen ? 'flex' : 'hidden'}`}>
        {links.map(l => (
          <a key={l.id} href={l.href} className="text-sm font-medium uppercase tracking-[0.1em] text-text-muted hover:text-plum transition-colors" onClick={closeMobile}>
            {t({ id: l.id })}
          </a>
        ))}
        <a href="#contact" className="btn-primary w-full text-center" onClick={closeMobile}>{t({ id: 'nav.cta' })}</a>
      </div>
    </>
  )
}
