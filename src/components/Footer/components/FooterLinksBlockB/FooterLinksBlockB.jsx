/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames'
import { Link, NavLink } from 'react-router-dom'
import styles from './footerLinksBlockB.module.css'

export function FooterLinksBlockB() {
  return (
    <div className={styles.wr}>
      <NavLink
        className={({ isActive }) => classNames({ [styles.activeLink]: isActive })}
        to="#"
      >
        Оплата и доставка
      </NavLink>
      <Link to="#">Часто спрашивают</Link>
      <Link to="#">Обратная связь</Link>
      <Link to="#">Контакты</Link>
    </div>
  )
}
