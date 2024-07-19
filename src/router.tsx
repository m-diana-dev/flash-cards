import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { Layout, useAuthContext } from '@/components/ui/layout/layout'
import { DecksPage } from '@/pages/decks-page/decks-page'
import { ErrorPage } from '@/pages/error-page/error-page'
import { LoginPage } from '@/pages/login-page'
import { ProfilePage } from '@/pages/profile-page'

const publicRoutes: RouteObject[] = [
  {
    element: <LoginPage />,
    path: '/login',
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

const router = createBrowserRouter([
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
