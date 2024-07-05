import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropdown.module.scss'

type Props = {
  trigger: ReactNode
} & ComponentPropsWithoutRef<typeof DropdownMenu.Root>
export const Dropdown = ({ children, trigger, ...restProps }: Props) => {
  return (
    <DropdownMenu.Root {...restProps}>
      {trigger}
      <DropdownMenu.Portal>
        <DropdownMenu.Content align={'end'} className={s.DropdownContent} sideOffset={10}>
          <DropdownMenu.Arrow asChild>
            <div className={s.Arrow} />
          </DropdownMenu.Arrow>
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
