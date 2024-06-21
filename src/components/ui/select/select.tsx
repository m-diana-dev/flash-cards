import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from 'react'

import ArrowDown from '@/assets/images/icons/ArrowDown'
import ArrowTop from '@/assets/images/icons/ArrowTop'
import { Typography } from '@/components/ui/typography'
import * as SelectRadix from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'
import sItem from './selectItem/selectItem.module.scss'

import { SelectItem } from './selectItem/selectItem'

type selectItem = {
  title: number | string
  value: string
}

export type SelectProps = {
  className: string
  disabled?: boolean
  items: selectItem[]
  label?: string
  placeholder?: string
  variant?: 'large' | 'small'
} & ComponentPropsWithoutRef<typeof SelectRadix.Root>

export const Select = forwardRef<ElementRef<typeof SelectRadix.Root>, SelectProps>(
  (
    {
      className,
      disabled,
      items,
      label,
      placeholder,
      variant = 'large',
      ...restProps
    }: SelectProps,
    ref
  ) => {
    const id = useId()

    return (
      <div className={clsx(s.SelectWrapp, variant === 'small' ? s.SelectSmall : '', className)}>
        {label && (
          <Typography
            as={'label'}
            className={clsx(s.SelectLabel, disabled ? s.SelectLabelDisabled : '', s.SelectLabel)}
            htmlFor={id}
            variant={'body2'}
          >
            {label}
          </Typography>
        )}
        <SelectRadix.Root disabled={disabled} {...restProps}>
          <SelectRadix.Trigger aria-label={'Food'} className={s.SelectTrigger} id={id}>
            <SelectRadix.Value placeholder={placeholder}></SelectRadix.Value>
            <SelectRadix.Icon className={s.SelectIcon}>
              <ArrowDown />
            </SelectRadix.Icon>
          </SelectRadix.Trigger>
          <SelectRadix.Portal>
            <SelectRadix.Content className={s.SelectContent} position={'popper'} sideOffset={0}>
              <SelectRadix.ScrollUpButton className={s.SelectScrollButton}>
                <ArrowTop height={6} width={11} />
              </SelectRadix.ScrollUpButton>
              <SelectRadix.Viewport className={s.SelectViewport}>
                <SelectRadix.Group>
                  {items.map((item, index) => (
                    <SelectItem
                      className={clsx(variant === 'small' ? sItem.SelectItemSmall : '')}
                      key={`${item.value}-${index}`}
                      ref={ref}
                      value={item.value}
                    >
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectRadix.Group>
              </SelectRadix.Viewport>
              <SelectRadix.ScrollDownButton className={s.SelectScrollButton}>
                <ArrowDown />
              </SelectRadix.ScrollDownButton>
            </SelectRadix.Content>
          </SelectRadix.Portal>
        </SelectRadix.Root>
      </div>
    )
  }
)
