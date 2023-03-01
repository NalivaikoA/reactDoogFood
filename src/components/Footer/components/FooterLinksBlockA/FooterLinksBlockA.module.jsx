/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames'
import { Link, NavLink } from 'react-router-dom'
import styles from './footerLinksBlockA.module.css'

export function FooterLinksBlockA() {
  return (
    <div className={styles.wr}>
      <NavLink
        className={({ isActive }) => classNames({ [styles.activeLink]: isActive })}
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
