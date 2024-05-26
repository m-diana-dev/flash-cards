import { ComponentPropsWithoutRef, ElementType } from 'react'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  fullWidth?: boolean
  variant?: 'primary' | 'secondary'
} & ComponentPropsWithoutRef<T>

import s from './button.module.scss'

export const Button = <T extends ElementType = 'button'>({
  as,
  className,
  fullWidth,
  variant = 'primary',
  ...rest
}: ButtonProps<T>) => {
  const Component = as ?? 'button'

  return (
    <Component
      className={`${s.button} ${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`}
      {...rest}
    />
  )
}
