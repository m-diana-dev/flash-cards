import Edit from '@/assets/images/icons/Edit'
import Logout from '@/assets/images/icons/Logout'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import scommon from '../personal-information.module.scss'
import s from './personal-information-info.module.scss'

type Props = {
  email: string
  logout?: () => void
  name: string
  setEditMode: (editMode: boolean) => void
}
export const PersonalInformationInfo = ({ email, logout, name, setEditMode }: Props) => {
  const logoutHandler = () => {
    logout?.()
  }

  return (
    <>
      <div className={s.Name}>
        <Typography as={'span'} variant={'h2'}>
          {name}
        </Typography>
        <button
          className={clsx(scommon.ButtonEdit, scommon.ButtonEditTransparent, s.ButtonEdit)}
          onClick={() => setEditMode(true)}
        >
          <Edit />
        </button>
      </div>
      <Typography as={'div'} className={s.Email} variant={'body2'}>
        {email}
      </Typography>
      <Button onClick={logoutHandler} variant={'secondary'}>
        <Logout />
        <Typography as={'span'} variant={'subtitle2'}>
          Logout
        </Typography>
      </Button>
    </>
  )
}
