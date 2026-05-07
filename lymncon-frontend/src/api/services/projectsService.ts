import { apiClient } from '../client'
import type { PaginatedResponse } from './applicantsService'

export type ProjectStatus = 'Planning' | 'In Progress' | 'Completed'

export type Project = {
  id: string
  name: string
  location: string
  client: string
  startDate: string
  endDate: string
  status: ProjectStatus
  completionPercent: number
}

export const projectsService = {
  list: (page = 1, limit = 15) =>
    apiClient.get<PaginatedResponse<Project>>(`/projects?page=${page}&limit=${limit}`),

  getById: (id: string) =>
    apiClient.get<Project>(`/projects/${id}`),

  create: (payload: Omit<Project, 'id'>) =>
    apiClient.post<Project>('/projects', payload),

  update: (id: string, payload: Partial<Project>) =>
    apiClient.put<Project>(`/projects/${id}`, payload),

  delete: (id: string) =>
    apiClient.delete<void>(`/projects/${id}`),
}
