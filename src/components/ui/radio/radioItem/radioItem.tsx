import { ElementRef, forwardRef, useId } from 'react'

import { Typography } from '@/components/ui/typography'
import * as RadioGroup from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import s from './radioItem.module.scss'

export type RadioItemType = {
  disabled?: boolean
  title: string
  value: string
}

export const RadioItem = forwardRef<ElementRef<typeof RadioGroup.Item>, RadioItemType>(
  ({ disabled, title, value }, ref) => {
    const id = useId()

    return (
      <div className={clsx(s.RadioItem, disabled ? s.RadioItemDisabled : '')}>
        <RadioGroup.Item
          className={s.RadioItemIcon}
          disabled={disabled}
          id={id}
          ref={ref}
          value={value}
        >
          <RadioGroup.Indicator className={s.RadioItemIndicator} />
        </RadioGroup.Item>
        <label className={s.RadioItemLabel} htmlFor={id}>
          <Typography as={'span'} variant={'body2'}>
            {title}
          </Typography>
        </label>
      </div>
    )
  }
)
