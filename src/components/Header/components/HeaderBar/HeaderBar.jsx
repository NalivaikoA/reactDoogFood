import headerbarStyles from './headerbar.module.css'
import { HeaderSignIn } from '../HeaderSignIn/HeaderSignIn'
import { HeaderSignUp } from '../HeaderSignUp/HeaderSignUp'

export function HeaderBar() {
  return (
    <div className={headerbarStyles.wr}>
      <HeaderSignIn />
      <HeaderSignUp />
    </div>
  )
}
