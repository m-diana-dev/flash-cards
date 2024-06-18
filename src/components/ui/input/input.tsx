import React, { ChangeEvent, ComponentPropsWithoutRef, ReactNode, useId, useState } from 'react'

import Close from '@/assets/images/icons/Close'
import Eye from '@/assets/images/icons/Eye'
import EyeClose from '@/assets/images/icons/EyeClose'
import Search from '@/assets/images/icons/Search'
import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import s from './input.module.scss'

export type TextFieldProps = {
  error?: ReactNode
  label?: string
  onReset?: () => void
  variant?: 'normal' | 'password' | 'search'
} & ComponentPropsWithoutRef<'input'>

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    { className, error, label, onChange, onReset, value, variant = 'normal', ...restProps },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false)
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
    }
    const id = useId()

    return (
      <div className={className}>
        {label && (
          <Typography as={'label'} className={s.label} htmlFor={id} variant={'body2'}>
            {label}
          </Typography>
        )}
        <div
          className={clsx(
            s.inputWrapper,
            s[variant],
            error ? s.inputError : '',
            variant === 'password' ? s.password : '',
            variant === 'search' ? s.search : ''
          )}
        >
          {variant === 'search' && (
            <button className={clsx(s.icon, s.iconSearch)}>
              <Search />
            </button>
          )}
          <input
            autoComplete={'off'}
            className={s.input}
            id={id}
            onChange={changeHandler}
            ref={ref}
            type={variant === 'password' && !isVisible ? 'password' : 'text'}
            value={value}
            {...restProps}
          />
          {variant === 'password' && (
            <button className={s.icon} onClick={() => setIsVisible(!isVisible)}>
              {isVisible ? <EyeClose /> : <Eye />}
            </button>
          )}
          {onReset && !!value && (
            <button className={s.icon} onClick={onReset}>
              <Close />
            </button>
          )}
        </div>
        {error && (
          <Typography as={'div'} className={s.error} variant={'caption'}>
            {error}
          </Typography>
        )}
      </div>
    )
  }
)
