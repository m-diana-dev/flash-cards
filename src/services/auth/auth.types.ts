export type User = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: true
  name: string
  updated: string
}

export type UserUpdate = {
  avatar?: File | null
  name: string
}

export type LoginArgs = {
  email: string
  password: string
  rememberMe: boolean
}

export type LoginResponse = {
  accessToken: string
  refreshToken: string
}

export type SignupArgs = {
  email: string
  password: string
}

export type RecoverPasswordArgs = {
  email: string
}

export type ResetPasswordArgs = {
  password: string
  token: string
}
