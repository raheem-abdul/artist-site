import { useEffect, useRef } from 'react'
import { useIntl, FormattedMessage } from 'react-intl'
import { services } from '../data/services'

const delays = ['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3']

export default function Services() {
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
    <section id="services">
      <div className="services-header">
        <div>
          <p className="section-label reveal" ref={el => revealRefs.current.push(el)}>
            {t({ id: 'services.label' })}
          </p>
          <h2 className="section-title reveal" ref={el => revealRefs.current.push(el)}>
            <FormattedMessage id="services.title" values={{ em: c => <em>{c}</em> }} />
          </h2>
        </div>
        <p className="services-desc reveal" ref={el => revealRefs.current.push(el)}>
          {t({ id: 'services.desc' })}
        </p>
      </div>
      <div className="services-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
        {services.map((s, i) => (
          <div
            key={s.id}
            className={`service-card reveal${delays[i] ? ' ' + delays[i] : ''}`}
            ref={el => revealRefs.current.push(el)}
          >
            <div className="service-icon">{s.icon}</div>
            <h3 className="service-name">{t({ id: `service.${s.id}.name` })}</h3>
            <p className="service-desc">{t({ id: `service.${s.id}.desc` })}</p>
            <div className="service-price">
              {t({ id: `service.${s.id}.price` })} <span>{t({ id: `service.${s.id}.unit` })}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
