import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { Container } from '@/components/ui/container/container'
import { useMeQuery } from '@/services/auth/auth.services'

import 'react-toastify/dist/ReactToastify.css'

import s from './laylout.module.scss'

import { Header } from '../header'

type AuthContext = {
  isAuthenticated: boolean
}

export function useAuthContext() {
  return useOutletContext<AuthContext>()
}

type Props = ComponentPropsWithoutRef<'div'>
export const Layout = forwardRef<ElementRef<'div'>, Props>(({ children, ...restProps }, ref) => {
  const { data, isError, isLoading } = useMeQuery()

  const isAuthenticated = !isError

  return (
    <div ref={ref} {...restProps}>
      {!isLoading && (
        <Header
          avatar={data?.avatar}
          email={data?.email}
          isAuthenticated={isAuthenticated}
          name={data?.name}
        />
      )}
      <main className={s.Main}>
        <Container>
          <Outlet context={{ isAuthenticated: isAuthenticated } satisfies AuthContext} />
        </Container>
      </main>

      <ToastContainer
        autoClose={5000}
        closeOnClick
        draggable
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss
        pauseOnHover
        position={'bottom-right'}
        rtl={false}
        theme={'dark'}
      />
    </div>
  )
})
