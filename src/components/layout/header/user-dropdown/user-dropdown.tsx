import { DropDownItem } from '@/components/ui/dropDown/dropDownItem'
import { DropDownMenu } from '@/components/ui/dropDown/dropDownMenu'
import { DropDownSeparator } from '@/components/ui/dropDown/dropDownSeparator'
import { Typography } from '@/components/ui/typography'
import { ProfleSvg } from '@/images/icons/dropDown/ProfleSvg'
import { SingOutSvg } from '@/images/icons/dropDown/SingOutSvg'

import s from '@/components/ui/dropDown/dropDownMenu.module.scss'

export type UserDropdownProps = {
  email: null | string
  name: string
  photo: string
  photoDesc: string
}

export const UserDropdown = ({ email, name, photo, photoDesc }: UserDropdownProps) => {
  const getInitials = (name: string): string => name[0].toUpperCase()

  const imageDisplay = photo ? (
    <img alt={photoDesc} className={s.imageIconName} src={photo} />
  ) : (
    <p className={s.imageIconName}>{getInitials(name)}</p>
  )

  const profileImage = (
    <div className={s.profileContainer}>
      <Typography className={s.profileText} variant={'subtitle1'}>
        {name}
      </Typography>
      {imageDisplay}
    </div>
  )

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <DropDownMenu trigger={profileImage}>
        <DropDownItem className={s.dropdownItemHeader}>
          {imageDisplay}
          <div>
            <Typography style={{ fontSize: '14px' }} variant={'subtitle2'}>
              {email}
            </Typography>
            <Typography style={{ fontSize: '12px' }} variant={'caption'}>
              {name}
            </Typography>
          </div>
        </DropDownItem>
        <DropDownSeparator />
        <DropDownItem asChild>
          <a href={'https://google.com'} style={{ textDecoration: 'none' }}>
            <ProfleSvg />
            <Typography variant={'caption'}>Profile</Typography>
          </a>
        </DropDownItem>
        <DropDownSeparator />
        <DropDownItem>
          <SingOutSvg />
          <Typography variant={'caption'}>Sign out</Typography>
        </DropDownItem>
      </DropDownMenu>
    </div>
  )
}
