import { ComponentPropsWithoutRef, ElementType } from 'react'

import clsx from 'clsx'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  fullWidth?: boolean
  variant?: 'icon' | 'link' | 'primary' | 'secondary'
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
  const {
    as: Component = 'button',
    className,
    fullWidth = false,
    variant = 'primary',
    ...rest
  } = props
  const buttonClass = clsx(s.button, s[variant], fullWidth && s.fullWidth)

  return <Component className={`${buttonClass} ${className}`} {...rest} />
}
