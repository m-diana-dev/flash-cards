import { ComponentPropsWithoutRef, ElementType } from 'react'

import clsx from 'clsx'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType> = {
  as?: T
  fullWidth?: boolean
  variant?: 'link' | 'primary' | 'secondary'
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType>(props: ButtonProps<T>) => {
  const {
    as: Component = 'button',
    className,
    fullWidth = false,
    variant = 'primary',
    ...rest
  } = props
  const buttonStyles = clsx(s.button, s[variant], fullWidth && s.fullWidth, className)

  return <Component className={buttonStyles} {...rest} />
}
