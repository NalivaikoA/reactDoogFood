/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames'
import { Link, NavLink } from 'react-router-dom'
import Styles from './footerLinksBlockB.module.css'

export function FooterLinksBlockB() {
  return (
    <div className={Styles.wr}>
      <NavLink
        className={({ isActive }) => classNames({ [Styles.activeLink]: isActive })}
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
