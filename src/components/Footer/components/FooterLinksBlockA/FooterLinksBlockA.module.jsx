/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames'
import { Link, NavLink } from 'react-router-dom'
import Styles from './footerLinksBlockA.module.css'

export function FooterLinksBlockA() {
  return (
    <div className={Styles.wr}>
      <NavLink
        className={({ isActive }) => classNames({ [Styles.activeLink]: isActive })}
        to="/products"
      >
        Каталог
      </NavLink>
      <Link to="#">Акции</Link>
      <Link to="#">Новости</Link>
      <Link to="#">Отзывы</Link>
    </div>
  )
}
