import { Link } from 'react-router-dom'

import Logout from '@/assets/images/icons/Logout'
import Persone from '@/assets/images/icons/Persone'
import { Dropdown } from '@/components/ui/dropdown'
import { DropdownDesc } from '@/components/ui/dropdown/dropdownDesc/dropdownDesc'
import { DropdownItem } from '@/components/ui/dropdown/dropdownItem/dropdownItem'
import { DropdownTrigger } from '@/components/ui/dropdown/dropdownTrigger/dropdownTrigger'
import { Typography } from '@/components/ui/typography'

import s from './headerUser.module.scss'

type Props = {
  avatar: string | undefined
  email: string | undefined
  name: string | undefined
}
export const HeaderUser = ({ avatar, email, name }: Props) => {
  return (
    <div className={s.headerUser}>
      <Link className={s.headerUserLink} to={'/profile'}>
        <Typography as={'span'} variant={'subtitle2'}>
          {name}
        </Typography>
      </Link>
      <Dropdown
        trigger={
          <DropdownTrigger>
            {avatar ? (
              <img alt={'Avatar'} src={avatar} />
            ) : (
              <div className={s.headerUserNoAvatar}>
                <Typography as={'span'} variant={'h2'}>
                  {name?.[0]}
                </Typography>
              </div>
            )}
          </DropdownTrigger>
        }
      >
        <DropdownDesc avatar={avatar} email={email} name={name} />
        <DropdownItem as={Link} icon={<Persone />} title={'My Profile'} to={'/profile'} />
        <DropdownItem icon={<Logout />} title={'Sign Out'} />
      </Dropdown>
    </div>
  )
}
