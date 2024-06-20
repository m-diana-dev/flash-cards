import { Typography } from '@/components/ui/typography'

import s from './dropdownDesc.module.scss'

type Props = {
  avatar: string
  email: string
  name: string
}
export const DropdownDesc = ({ avatar, email, name }: Props) => {
  return (
    <div className={s.DropdownDesc}>
      <img alt={'avatar'} className={s.DropdownDescAvatar} src={avatar} />
      <div className={s.DropdownDescWrapp}>
        <Typography as={'div'} variant={'subtitle2'}>
          {name}
        </Typography>
        <Typography as={'div'} className={s.DropdownDescText} variant={'caption'}>
          {email}
        </Typography>
      </div>
    </div>
  )
}
