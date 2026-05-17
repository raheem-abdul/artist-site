import { useEffect, useRef } from 'react'
import { useIntl, FormattedMessage } from 'react-intl'
import { testimonials } from '../data/testimonials'

const doubled = [...testimonials, ...testimonials]

export default function Testimonials() {
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
    <section id="testimonials">
      <div className="testimonials-header">
        <p className="section-label reveal" style={{ justifyContent: 'center' }} ref={el => revealRefs.current.push(el)}>
          {t({ id: 'testimonials.label' })}
        </p>
        <h2 className="section-title reveal" ref={el => revealRefs.current.push(el)}>
          <FormattedMessage id="testimonials.title" values={{ em: c => <em>{c}</em> }} />
        </h2>
      </div>
      <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
        <div className="testimonials-track">
          {doubled.map((item, i) => (
            <div key={i} className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="testimonial-quote">"{t({ id: `testimonial.${item.id}.quote` })}"</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ background: item.color }}>{item.initials}</div>
                <div>
                  <div className="author-name">{t({ id: `testimonial.${item.id}.name` })}</div>
                  <div className="author-role">{t({ id: `testimonial.${item.id}.role` })}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
