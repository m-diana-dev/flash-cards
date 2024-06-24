import { ElementRef, forwardRef } from 'react'

import { RadioItem, RadioItemType } from '@/components/ui/radio/radioItem/radioItem'
import * as RadioGroup from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import s from './radio.module.scss'

export type RadioProps = {
  className?: string
  defaultValue?: string
  items: RadioItemType[]
}

export const Radio = forwardRef<ElementRef<typeof RadioGroup.Root>, RadioProps>(
  ({ className, defaultValue, items }, ref) => (
    <RadioGroup.Root
      className={clsx(s.RadioGroup, className)}
      defaultValue={defaultValue || items[0].value}
      ref={ref}
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
