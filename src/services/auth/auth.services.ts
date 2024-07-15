import { User } from '@/services/auth/auth.types'
import { flashcardsApi } from '@/services/flashcards-api'

export const authService = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      me: builder.query<User, void>({
        providesTags: ['Me'],
        query: () => `v1/auth/me`,
      }),
    }
  },
})

export const { useMeQuery } = authService
