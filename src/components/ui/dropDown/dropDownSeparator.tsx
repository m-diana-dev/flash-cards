import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import s from './dropDownMenu.module.scss'

export const DropDownSeparator = () => {
  return <DropdownMenu.Separator className={s.divider} />
}
