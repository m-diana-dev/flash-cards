import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { Typography } from '@/components/ui/typography'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropdownItem.module.scss'

type Props<T extends ElementType> = {
  as?: T
  icon: ReactNode
  title: string
} & ComponentPropsWithoutRef<T>

export const DropdownItem = <T extends ElementType = 'button'>({
  as,
  icon,
  title,
  ...restProps
}: Props<T>) => {
  const Component = as ?? 'button'

  return (
    <Component className={s.DropdownItem} {...restProps}>
      <DropdownMenu.Item className={s.DropdownItemWrapp}>
        {icon}
        <Typography as={'span'} variant={'caption'}>
          {title}
        </Typography>
      </DropdownMenu.Item>
    </Component>
  )
}
