import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

type Props = ComponentPropsWithoutRef<'div'>
import s from './container.module.scss'

export const Container = forwardRef<ElementRef<'div'>, Props>(({ children, ...restProps }, ref) => {
  return (
    <div ref={ref} {...restProps} className={s.Container}>
      {children}
    </div>
  )
})
