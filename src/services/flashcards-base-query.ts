import { matchPath } from 'react-router-dom'

import { publicRoutes, router } from '@/router'
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

// create a new mutex
const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.flashcards.andrii.es',
  // credentials: 'include',
  // prepareHeaders: headers => {
  //   headers.append('x-auth-skip', 'true')
  // },
  prepareHeaders: headers => {
    const token = localStorage.getItem('accessToken')

    if (headers.get('Authorization')) {
      return headers
    }
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        const refreshResult = (await baseQuery(
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
            method: 'POST',
            url: '/v2/auth/refresh-token',
          },
          api,
          extraOptions
        )) as any

        if (refreshResult.data) {
          localStorage.setItem('accessToken', refreshResult.data.accessToken.trim())
          localStorage.setItem('refreshToken', refreshResult.data.refreshToken.trim())

          // retry the initial query
          result = await baseQuery(args, api, extraOptions)
        } else {
          const isPublicRoutes = publicRoutes.find(route =>
            matchPath(route.path ?? '', window.location.pathname)
          )

          if (!isPublicRoutes) {
            router.navigate('/login')
          }
        }
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}
