import { useState, useEffect, useRef } from 'react'
import { useIntl, FormattedMessage } from 'react-intl'
import { portfolioItems, portfolioFilters } from '../data/portfolio'

const delays = ['', 'reveal-delay-1', 'reveal-delay-2', '', 'reveal-delay-1', 'reveal-delay-2']

export default function Portfolio() {
  const [active, setActive] = useState('all')
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
    <section id="portfolio">
      <div className="portfolio-header">
        <p className="section-label reveal" ref={el => revealRefs.current.push(el)}>
          {t({ id: 'portfolio.label' })}
        </p>
        <h2 className="section-title reveal" ref={el => revealRefs.current.push(el)}>
          <FormattedMessage id="portfolio.title" values={{ em: c => <em>{c}</em> }} />
        </h2>
        <div className="filter-tabs reveal" ref={el => revealRefs.current.push(el)}>
          {portfolioFilters.map(f => (
            <button
              key={f}
              className={`filter-tab${active === f ? ' active' : ''}`}
              onClick={() => setActive(f)}
            >
              {t({ id: `portfolio.filter.${f}` })}
            </button>
          ))}
        </div>
      </div>

      <div className="portfolio-grid">
        {portfolioItems.map((item, i) => {
          const hidden = active !== 'all' && item.category !== active
          return (
            <div
              key={item.id}
              className={`portfolio-item reveal${delays[i] ? ' ' + delays[i] : ''}${hidden ? ' hidden' : ''}`}
              ref={el => revealRefs.current.push(el)}
            >
              <div className="portfolio-swatch">
                <img
                  src={item.img}
                  alt={t({ id: `portfolio.item.${item.id}.title` })}
                  className="portfolio-img"
                />
                <div className="portfolio-caption">
                  <div className="caption-inner">
                    <h4>{t({ id: `portfolio.item.${item.id}.title` })}</h4>
                    <p>{t({ id: `portfolio.item.${item.id}.sub` })}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
