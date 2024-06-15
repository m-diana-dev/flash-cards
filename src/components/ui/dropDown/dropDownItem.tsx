import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ComponentPropsWithoutRef } from 'react'
import s from './dropDownMenu.module.scss'
import clsx from 'clsx'

type Props = ComponentPropsWithoutRef<typeof DropdownMenu.Item>

export const DropDownItem = ({ className, ...rest }: Props) => {
  return <DropdownMenu.Item className={clsx(s.dropdownItem, className)} {...rest} />
}
