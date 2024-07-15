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
