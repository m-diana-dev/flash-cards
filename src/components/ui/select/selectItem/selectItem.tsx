import React, { ForwardedRef } from 'react'

import { Typography } from '@/components/ui/typography'
import * as SelectRadix from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './selectItem.module.scss'

type SelectItemProps = {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  value: string
}

export const SelectItem = React.forwardRef(
  (
    { children, className, ...restProps }: SelectItemProps,
    forwardedRef: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <SelectRadix.Item className={clsx(s.SelectItem, className)} {...restProps} ref={forwardedRef}>
        <SelectRadix.ItemText>
          <Typography as={'div'} className={s.SelectItemText}>
            {children}
          </Typography>
        </SelectRadix.ItemText>
      </SelectRadix.Item>
    )
  }
)
