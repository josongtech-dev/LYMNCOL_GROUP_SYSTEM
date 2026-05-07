import { apiClient } from '../client'

export type LoginPayload = {
  email: string
  password: string
}

export type SignupPayload = {
  fullName: string
  email: string
  phone: string
  country: string
  role: string
  password: string
}

export type AuthUser = {
  id: string
  fullName: string
  email: string
  role: string
  token: string
}

export const authService = {
  login: (payload: LoginPayload) =>
    apiClient.post<AuthUser>('/auth/login', payload),

  signup: (payload: SignupPayload) =>
    apiClient.post<AuthUser>('/auth/signup', payload),

  logout: () =>
    apiClient.post<void>('/auth/logout', {}).finally(() => {
      localStorage.removeItem('lymncon-auth-token')
    }),

  me: () =>
    apiClient.get<AuthUser>('/auth/me'),
}
