import styles from './headerbar.module.css'
import { HeaderSignUp } from '../HeaderSignUp/HeaderSignUp'
import { Cart } from '../CartIcon/CartIcon'
import { FavouriteIcon } from '../FavouriteIcon/FavouriteIcon'
import { HeaderProfile } from '../HeaderProfile/HeaderProfile'
import { HeaderSignInAndOut } from '../HeaderSignInAndOut/HeaderSignInAndOut'

export function HeaderBar() {
  return (
    <div className={styles.wr}>
      <FavouriteIcon />
      <Cart />
      <HeaderSignInAndOut />
      <HeaderSignUp />
      <HeaderProfile />
    </div>
  )
}
