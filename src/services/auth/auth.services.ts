import { LoginArgs, LoginResponse, User, UserUpdate } from '@/services/auth/auth.types'
import { flashcardsApi } from '@/services/flashcards-api'

export const authService = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      login: builder.mutation<LoginResponse, LoginArgs>({
        invalidatesTags: ['Me'],
        async onQueryStarted(_, { queryFulfilled }) {
          const { data } = await queryFulfilled

          if (!data) {
            return
          }

          localStorage.setItem('accessToken', data.accessToken)
          localStorage.setItem('refreshToken', data.refreshToken)
        },
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/auth/login`,
        }),
      }),
      logout: builder.mutation<void, void>({
        invalidatesTags: ['Me'],
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          await queryFulfilled
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          dispatch(authService.util.resetApiState())
        },
        query: () => ({
          method: 'POST',
          url: `v2/auth/logout`,
        }),
      }),
      me: builder.query<User, void>({
        providesTags: ['Me'],
        query: () => `v1/auth/me`,
      }),
      userUpdate: builder.mutation<User, UserUpdate>({
        invalidatesTags: ['Me', 'Decks'],
        query: args => {
          const formData = new FormData()

          if (args.name) {
            formData.append('name', args.name)
          }
          if (args.avatar) {
            formData.append('avatar', args.avatar)
          } else if (args.avatar === null) {
            formData.append('avatar', '')
          }

          return {
            body: formData,
            method: 'PATCH',
            url: `v1/auth/me`,
          }
        },
      }),
    }
  },
})

export const { useLoginMutation, useLogoutMutation, useMeQuery, useUserUpdateMutation } =
  authService
