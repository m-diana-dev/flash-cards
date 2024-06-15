import { ComponentPropsWithoutRef } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from '@/components/ui/dropDown/dropDownMenu.module.scss'

type Props = ComponentPropsWithoutRef<typeof DropdownMenu.Trigger>
export const DropDownTrigger = ({ ...rest }: Props) => {
  return <DropdownMenu.Trigger className={s.dropdownTrigger} {...rest} />
}
