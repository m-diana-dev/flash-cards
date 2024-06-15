import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import Edit from '@/images/icons/Edit'
import Logout from '@/images/icons/Logout'
import clsx from 'clsx'

import scommon from '../personal-information.module.scss'
import s from './personal-information-info.module.scss'

type Props = {
  email: string
  name: string
  setEditMode: (editMode: boolean) => void
}
export const PersonalInformationInfo = ({ email, name, setEditMode }: Props) => {
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
      <Button variant={'secondary'}>
        <Logout />
        <Typography as={'span'} variant={'subtitle2'}>
          Logout
        </Typography>
      </Button>
    </>
  )
}
