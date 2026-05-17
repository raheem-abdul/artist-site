import { useIntl } from 'react-intl'

export default function Footer() {
  const { formatMessage: t } = useIntl()
  return (
    <footer>
      <div className="footer-logo">{t({ id: 'footer.logo' })}</div>
      <p className="footer-copy">{t({ id: 'footer.copy' })}</p>
      <div className="footer-links">
        <a href="#services">{t({ id: 'footer.link.services' })}</a>
        <a href="#portfolio">{t({ id: 'footer.link.portfolio' })}</a>
        <a href="#contact">{t({ id: 'footer.link.contact' })}</a>
      </div>
    </footer>
  )
}
