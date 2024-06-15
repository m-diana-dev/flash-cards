import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Header } from '@/components/layout/header'
import { Container } from '@/components/ui/container/container'

import s from './laylout.module.scss'

type Props = ComponentPropsWithoutRef<'div'>
export const Layout = forwardRef<ElementRef<'div'>, Props>(({ children, ...restProps }, ref) => {
  return (
    <div ref={ref} {...restProps}>
      <Header isAuthenticated={false} />
      <main className={s.Main}>
        <Container>{children}</Container>
      </main>
    </div>
  )
})
