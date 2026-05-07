import { apiClient } from '../client'

export type ApplicantStatus = 'Pending' | 'Under Review' | 'Approved' | 'Rejected'

export type Applicant = {
  id: string
  fullName: string
  email: string
  phone: string
  country: string
  category: string
  status: ApplicantStatus
  appliedDate: string
  documents?: string[]
}

export type ApplicantFilters = {
  category?: string
  status?: ApplicantStatus
  search?: string
  page?: number
  limit?: number
}

export type PaginatedResponse<T> = {
  items: T[]
  total: number
  page: number
  limit: number
}

export const applicantsService = {
  list: (filters: ApplicantFilters = {}) => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([k, v]) => {
      if (v !== undefined && v !== '') params.set(k, String(v))
    })
    return apiClient.get<PaginatedResponse<Applicant>>(`/applicants?${params}`)
  },

  getById: (id: string) =>
    apiClient.get<Applicant>(`/applicants/${id}`),

  updateStatus: (id: string, status: ApplicantStatus) =>
    apiClient.patch<Applicant>(`/applicants/${id}/status`, { status }),

  uploadDocuments: (id: string, files: FormData) =>
    fetch(`${import.meta.env.VITE_API_BASE_URL ?? '/api'}/applicants/${id}/documents`, {
      method: 'POST',
      headers: {
        ...(localStorage.getItem('lymncon-auth-token')
          ? { Authorization: `Bearer ${localStorage.getItem('lymncon-auth-token')}` }
          : {}),
      },
      body: files,
    }).then((r) => r.json()),

  delete: (id: string) =>
    apiClient.delete<void>(`/applicants/${id}`),
}
