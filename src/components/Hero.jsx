import { useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'

function HeroPhoto() {
  const { formatMessage: t } = useIntl()
  const [exists, setExists] = useState(true)
  return exists ? (
    <img
      src="/assets/hero-portrait.jpg"
      alt={t({ id: 'hero.photo.alt' })}
      onError={() => setExists(false)}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
    />
  ) : (
    <div className="hero-photo-placeholder">
      <p className="portrait-placeholder">{t({ id: 'hero.photo.placeholder' })}</p>
    </div>
  )
}

export default function Hero() {
  const { formatMessage: t } = useIntl()
  const revealRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    revealRefs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const r = (extra = '') => ({
    ref: el => revealRefs.current.push(el),
    className: `reveal${extra ? ' ' + extra : ''}`,
  })

  return (
    <section id="hero">
      <div className="hero-left">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <p {...r()} className={`hero-eyebrow ${r().className}`}>{t({ id: 'hero.eyebrow' })}</p>
        <h1 className="hero-title reveal reveal-delay-1" ref={el => revealRefs.current.push(el)}>
          {t({ id: 'hero.title' })}<em>{t({ id: 'hero.title.em' })}</em>
        </h1>
        <p className="hero-desc reveal reveal-delay-2" ref={el => revealRefs.current.push(el)}>
          {t({ id: 'hero.desc' })}
        </p>
        <div className="hero-actions reveal reveal-delay-3" ref={el => revealRefs.current.push(el)}>
          <a href="#portfolio" className="btn-primary">{t({ id: 'hero.cta.primary' })}</a>
          <a href="#contact" className="btn-ghost">{t({ id: 'hero.cta.secondary' })}</a>
        </div>
        <div className="hero-stats reveal" ref={el => revealRefs.current.push(el)}>
          {[
            { num: 'hero.stat.years.num',   label: 'hero.stat.years.label' },
            { num: 'hero.stat.clients.num', label: 'hero.stat.clients.label' },
            { num: 'hero.stat.events.num',  label: 'hero.stat.events.label' },
          ].map(s => (
            <div key={s.num}>
              <div className="stat-num">{t({ id: s.num })}</div>
              <div className="stat-label">{t({ id: s.label })}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-right">
        <HeroPhoto />
        <div className="hero-photo-scrim" />
        <div className="hero-photo-frame" />
      </div>
    </section>
  )
}
