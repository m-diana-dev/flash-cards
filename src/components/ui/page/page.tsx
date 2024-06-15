import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './page.module.scss'

type Props = ComponentPropsWithoutRef<'div'>
export const Page = forwardRef<ElementRef<'div'>, Props>(({ children, className }, ref) => {
  return (
    <div className={clsx(className, s.Page)} ref={ref}>
      {children}
    </div>
  )
})
