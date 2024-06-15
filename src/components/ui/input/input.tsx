import React, { ChangeEvent, ComponentPropsWithoutRef, ReactNode, useId, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import s from './input.module.scss'

import search from '../../../images/icons/input/Search.svg'
import deleteIcon from '../../../images/icons/input/close-outline.svg'
import eysClose from '../../../images/icons/input/eye-off-outline.svg'
import eysOpen from '../../../images/icons/input/eye-outline.svg'

export type SuperInputTextPropsType = {
  error?: ReactNode
  inputType?: string
  label?: string
  onChangeText?: (value: string) => void
  onEnter?: () => void
  onReset?: () => void
  spanClassName?: string
  variant?: 'email' | 'normal' | 'password'
} & ComponentPropsWithoutRef<'input'>

export const TextField = React.forwardRef<HTMLInputElement, SuperInputTextPropsType>(
  (
    {
      className,
      disabled,
      error,
      id,
      inputType,
      label,
      onChange,
      onChangeText,
      onEnter,
      onReset,
      spanClassName,
      type = 'text',
      value,
      variant = 'normal',
      ...restProps
    },
    ref
  ) => {
    const finalId = useLabelId(id)
    const [isVisible, setIsVisible] = useState(false)
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onChangeText?.(e.currentTarget.value)
    }

    const finalSpanClassName = s.error + (spanClassName ? ' ' + spanClassName : '')

    const inputClasses = [s.inputWrapper, s[variant]]

    if (error) {
      inputClasses.push(s.inputError)
    }
    if (type === 'password') {
      inputClasses.push(s.password)
    }

    return (
      <div>
        {label && (
          <Typography as={'label'} className={s.label} htmlFor={finalId} variant={'body2'}>
            {label}
          </Typography>
        )}
        <div className={inputClasses.join(' ')}>
          {onReset && <img className={s.search} src={search} />}
          <input
            className={s.input}
            disabled={disabled}
            id={finalId}
            onChange={onChangeCallback}
            placeholder={error ? 'Error' : 'Input'}
            ref={ref}
            type={type === 'password' && isVisible ? 'text' : type}
            value={value}
            {...restProps}
          />
          {type === 'password' && (
            <img
              className={s.icon}
              onClick={() => setIsVisible(!isVisible)}
              src={isVisible ? eysClose : eysOpen}
            />
          )}
          {onReset && !!value && (
            <Button onClick={onReset}>
              <img src={deleteIcon} />
            </Button>
          )}
        </div>
        <Typography as={'div'} className={finalSpanClassName}>
          {error}
        </Typography>
      </div>
    )
  }
)

export function useLabelId(id?: string) {
  const generatedId = useId()

  if (!id) {
    return generatedId
  }

  return id
}
