import {
  LoginArgs,
  LoginResponse,
  RecoverPasswordArgs,
  ResetPasswordArgs,
  SignupArgs,
  User,
  UserUpdate,
} from '@/services/auth/auth.types'
import { flashcardsApi } from '@/services/flashcards-api'

export const authService = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      deleteMe: builder.mutation<void, void>({
        invalidatesTags: ['Me'],
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          await queryFulfilled
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          dispatch(authService.util.resetApiState())
        },
        query: () => ({
          method: 'DELETE',
          url: `v1/auth/me`,
        }),
      }),
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
      recoverPassword: builder.mutation<void, RecoverPasswordArgs>({
        query: args => ({
          body: {
            html: '<h1>Hi, ##name##</h1><p>Click <a href="http://localhost:5173/new-password/##token##">here</a> to recover your password</p>',
            ...args,
          },
          method: 'POST',
          url: `v1/auth/recover-password`,
        }),
      }),
      resetPassword: builder.mutation<void, ResetPasswordArgs>({
        query: ({ token, ...args }) => ({
          body: args,
          method: 'POST',
          url: `v1/auth/reset-password/${token}`,
        }),
      }),
      signup: builder.mutation<User, SignupArgs>({
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/auth/sign-up`,
        }),
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

export const {
  useDeleteMeMutation,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useRecoverPasswordMutation,
  useResetPasswordMutation,
  useSignupMutation,
  useUserUpdateMutation,
} = authService
