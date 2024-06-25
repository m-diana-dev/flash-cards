import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Outlet } from 'react-router-dom'

import { Container } from '@/components/ui/container/container'

import s from './laylout.module.scss'

import { Header } from '../header'

type Props = ComponentPropsWithoutRef<'div'>
export const Layout = forwardRef<ElementRef<'div'>, Props>(({ children, ...restProps }, ref) => {
  return (
    <div ref={ref} {...restProps}>
      <Header isAuthenticated={false} />
      <main className={s.Main}>
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  )
})
