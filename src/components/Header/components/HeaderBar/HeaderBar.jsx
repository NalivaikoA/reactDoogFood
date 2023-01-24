import styles from './headerbar.module.css'
import { HeaderSignIn } from '../HeaderSignIn/HeaderSignIn'
import { HeaderSignUp } from '../HeaderSignUp/HeaderSignUp'
import { HeaderSignOut } from '../HeaderSignOut/HeaderSignOut'

export function HeaderBar() {
  return (
    <div className={styles.wr}>
      <HeaderSignIn />
      <HeaderSignUp />
      <HeaderSignOut />
    </div>
  )
}
