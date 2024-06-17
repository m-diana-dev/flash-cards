import { RadioItem, RadioItemType } from '@/components/ui/radio/radioItem/radioItem'
import * as RadioGroup from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import s from './radio.module.scss'

type Props = {
  className?: string
  defaultValue?: string
  items: RadioItemType[]
}

export const Radio = ({ className, defaultValue, items }: Props) => (
  <RadioGroup.Root
    className={clsx(s.RadioGroup, className)}
    defaultValue={defaultValue || items[0].value}
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
