import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Outlet } from 'react-router-dom'

import { Container } from '@/components/ui/container/container'
import { Preloader } from '@/components/ui/preloader'
import { useMeQuery } from '@/services/auth/auth.services'

import s from './laylout.module.scss'

import { Header } from '../header'

type Props = ComponentPropsWithoutRef<'div'>
export const Layout = forwardRef<ElementRef<'div'>, Props>(({ children, ...restProps }, ref) => {
  const { data, error, isLoading } = useMeQuery()

  if (isLoading) {
    return <Preloader />
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>
  }

  return (
    <div ref={ref} {...restProps}>
      <Header
        avatar={data?.avatar}
        email={data?.email}
        isAuthenticated={!!data}
        name={data?.name}
      />
      <main className={s.Main}>
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  )
})
