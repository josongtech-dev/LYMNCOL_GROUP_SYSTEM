import { apiClient } from '../client'
import type { PaginatedResponse } from './applicantsService'

export type UserStatus = 'Active' | 'Suspended' | 'Pending'

export type SystemUser = {
  id: string
  fullName: string
  email: string
  role: string
  controllerType: string
  status: UserStatus
  lastSeen: string
}

export const usersService = {
  list: (page = 1, limit = 15, search = '') => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) })
    if (search) params.set('search', search)
    return apiClient.get<PaginatedResponse<SystemUser>>(`/users?${params}`)
  },

  getById: (id: string) =>
    apiClient.get<SystemUser>(`/users/${id}`),

  create: (payload: Omit<SystemUser, 'id' | 'lastSeen'>) =>
    apiClient.post<SystemUser>('/users', payload),

  updateStatus: (id: string, status: UserStatus) =>
    apiClient.patch<SystemUser>(`/users/${id}/status`, { status }),

  delete: (id: string) =>
    apiClient.delete<void>(`/users/${id}`),
}
