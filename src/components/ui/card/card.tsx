import { ComponentPropsWithoutRef, ElementType } from 'react'

import clsx from 'clsx'

import styles from './card.module.scss'

export type CardProps<T extends ElementType = 'div'> = {
  as?: T
  className?: string
  isDark?: boolean
  maxWidth?: string
} & ComponentPropsWithoutRef<T>

export const Card = <T extends ElementType = 'div'>(props: CardProps<T>) => {
  const { as: Component = 'div', className, isDark = true, maxWidth, ...rest } = props

  return (
    <Component
      className={clsx(
        styles.card,
        {
          [styles.dark]: isDark,
          [styles.light]: !isDark,
        },
        className
      )}
      style={maxWidth ? { maxWidth } : {}}
      {...rest}
    />
  )
}
