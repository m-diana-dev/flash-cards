import { ComponentPropsWithoutRef } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropdownTrigger.module.scss'

type Props = {} & ComponentPropsWithoutRef<typeof DropdownMenu.Trigger>
export const DropdownTrigger = ({ children }: Props) => {
  return <DropdownMenu.Trigger className={s.DropdownTrigger}>{children}</DropdownMenu.Trigger>
}
