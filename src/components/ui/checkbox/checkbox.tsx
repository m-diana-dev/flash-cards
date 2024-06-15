import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from 'react'

import { Typography } from '@/components/ui/typography'
import Check from '@/images/icons/Check'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import clsx from 'clsx'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  label?: string
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox = forwardRef<ElementRef<typeof CheckboxRadix.Root>, CheckboxProps>(
  ({ checked, defaultChecked, disabled, label, onCheckedChange }, ref) => {
    const id = useId()

    return (
      <div className={clsx(s.Checkbox, disabled ? s.CheckboxDisabled : '')}>
        <CheckboxRadix.Root
          checked={checked}
          className={s.CheckboxRoot}
          defaultChecked={defaultChecked}
          disabled={disabled}
          id={id}
          onCheckedChange={onCheckedChange}
          ref={ref}
        >
          <CheckboxRadix.Indicator className={s.CheckboxIndicator}>
            <Check />
          </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>
        <Typography as={'label'} className={s.CheckboxLabel} htmlFor={id} variant={'body2'}>
          {label}
        </Typography>
      </div>
    )
  }
)
