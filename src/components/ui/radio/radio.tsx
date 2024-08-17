import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { RadioItem, RadioItemType } from '@/components/ui/radio/radioItem/radioItem'
import * as RadioGroup from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import s from './radio.module.scss'

export type RadioProps = {
  className?: string
  defaultValue?: number | string
  items: RadioItemType[]
} & ComponentPropsWithoutRef<typeof RadioGroup.Root>

export const Radio = forwardRef<ElementRef<typeof RadioGroup.Root>, RadioProps>(
  ({ className, defaultValue, items, ...restProps }, ref) => (
    <RadioGroup.Root
      className={clsx(s.RadioGroup, className)}
      defaultValue={defaultValue || items[0].value.toString()}
      ref={ref}
      {...restProps}
    >
      {items.map((item, index) => (
        <RadioItem
          disabled={item.disabled}
          key={`${item.value}-${index}`}
          title={item.title}
          value={item.value}
        />
      ))}
    </RadioGroup.Root>
  )
)
