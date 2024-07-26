import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { Layout, useAuthContext } from '@/components/ui/layout/layout'
import { CheckEmailPage } from '@/pages/check-email-page'
import { DeckPage } from '@/pages/deck-page'
import { DecksPage } from '@/pages/decks-page/decks-page'
import { ErrorPage } from '@/pages/error-page/error-page'
import { ForgotPasswordPage } from '@/pages/forgot-password-page'
import { LearnPage } from '@/pages/learn-page'
import { LoginPage } from '@/pages/login-page'
import { NewPasswordPage } from '@/pages/new-password-page'
import { ProfilePage } from '@/pages/profile-page'
import { SignupPage } from '@/pages/signup-page'

export const publicRoutes: RouteObject[] = [
  {
    element: <LoginPage />,
    path: '/login',
  },
  {
    element: <SignupPage />,
    path: '/sign-up',
  },
  {
    element: <ForgotPasswordPage />,
    path: '/forgot-password-page',
  },
  {
    element: <CheckEmailPage />,
    path: '/check-email',
  },
  {
    element: <NewPasswordPage />,
    path: '/new-password/*',
  },
  {
    element: <LearnPage />,
    path: '/decks/:id/learn',
  },
  {
    element: <DeckPage />,
    path: '/decks/:id',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <DecksPage />,
    path: '/',
  },
  {
    element: <ProfilePage />,
    path: '/profile',
  },
]

export const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      ...publicRoutes,
      {
        element: <ErrorPage />,
        path: '*',
      },
    ],
    element: <Layout />,
  },
])

export function Router() {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const { isAuthenticated } = useAuthContext()

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}
