import { Logo } from '../Header/components/Logo/Logo'
import { FooterContactsInfo } from './components/FooterContactsInfo/FooterContactsInfo'
import { FooterLinksBlockA } from './components/FooterLinksBlockA/FooterLinksBlockA.module'
import { FooterLinksBlockB } from './components/FooterLinksBlockB/FooterLinksBlockB'
import footerStyles from './footer.module.css'

export function Footer() {
  console.log('Рендерится компонент Footer')
  return (
    <footer className={footerStyles.wr}>
      <div className={footerStyles.logo}>
        <Logo />
        <p>DoogFood © 2023</p>
      </div>
      <FooterLinksBlockA />
      <FooterLinksBlockB />
      <FooterContactsInfo />
    </footer>
  )
}
