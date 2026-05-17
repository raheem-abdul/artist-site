import { useEffect, useRef, useState } from 'react'
import { useIntl, FormattedMessage } from 'react-intl'
import { skillKeys } from '../data/about'

function AboutPhoto() {
  const { formatMessage: t } = useIntl()
  const [exists, setExists] = useState(true)
  return exists ? (
    <img
      src={`${import.meta.env.BASE_URL}assets/about-photo.jpg`}
      alt={t({ id: 'about.photo.alt' })}
      onError={() => setExists(false)}
      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
    />
  ) : (
    <p className="about-placeholder-text">{t({ id: 'about.photo.placeholder' })}</p>
  )
}

export default function About() {
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

  return (
    <section id="about">
      <div className="about-visual reveal" ref={el => revealRefs.current.push(el)}>
        <div className="about-frame">
          <div className="about-frame-inner" style={{ inset: 0, border: 'none' }}>
            <AboutPhoto />
          </div>
        </div>
        <div className="about-badge">
          <strong>{t({ id: 'about.badge.num' })}</strong>
          <span>{t({ id: 'about.badge.label' })}</span>
        </div>
      </div>
      <div className="about-content">
        <p className="section-label" style={{ color: 'var(--color-blush-deep)' }}>
          {t({ id: 'about.label' })}
        </p>
        <h2 className="about-title">
          <FormattedMessage id="about.title" values={{ em: c => <em>{c}</em> }} />
        </h2>
        <p className="about-text">{t({ id: 'about.para1' })}</p>
        <p className="about-text">{t({ id: 'about.para2' })}</p>
        <div className="skills-list">
          {skillKeys.map(key => (
            <span key={key} className="skill-tag">{t({ id: key })}</span>
          ))}
        </div>
        <div style={{ marginTop: '2.5rem' }}>
          <a href="#contact" className="btn-primary">{t({ id: 'about.cta' })}</a>
        </div>
      </div>
    </section>
  )
}
