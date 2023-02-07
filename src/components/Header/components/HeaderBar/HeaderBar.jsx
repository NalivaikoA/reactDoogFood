import styles from './headerbar.module.css'
import { HeaderSignIn } from '../HeaderSignIn/HeaderSignIn'
import { HeaderSignUp } from '../HeaderSignUp/HeaderSignUp'
import { HeaderSignOut } from '../HeaderSignOut/HeaderSignOut'
import { Cart } from '../CartIcon/CartIcon'

export function HeaderBar() {
  return (
    <div className={styles.wr}>
      <Cart />
      <HeaderSignIn />
      <HeaderSignUp />
      <HeaderSignOut />
    </div>
  )
}
