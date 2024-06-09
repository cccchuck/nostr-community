export type QueryUserResponse = {
  id: string
  avatar: string
  username: string
  global_name: string
  address?: string
}

export type BindUserRequest = {
  username: string
  address: string
  avatar: string
  message: string
  signature: string
}

export type BindUserResponse = {
  id: number
  username: string
  address: string
} | null
