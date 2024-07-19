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
