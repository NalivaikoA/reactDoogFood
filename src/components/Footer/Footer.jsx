import { Logo } from '../Header/components/Logo/Logo'
import { FooterContactsInfo } from './components/FooterContactsInfo/FooterContactsInfo'
import { FooterLinksBlockA } from './components/FooterLinksBlockA/FooterLinksBlockA.module'
import { FooterLinksBlockB } from './components/FooterLinksBlockB/FooterLinksBlockB'
import styles from './footer.module.css'

export function Footer() {
  console.log('Рендерится компонент Footer')
  return (
    <footer className={styles.wr}>
      <div className={styles.logo}>
        <Logo />
        <p>DoogFood © 2023</p>
      </div>
      <FooterLinksBlockA />
      <FooterLinksBlockB />
      <FooterContactsInfo />
    </footer>
  )
}
