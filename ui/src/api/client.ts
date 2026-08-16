import axios, { type AxiosError, type AxiosResponse } from 'axios'

export interface ApiResponse<T> {
  success: boolean
  data: T
  message: string
  code: string
}

export class ApiError extends Error {
  code: string

  constructor(code: string, message: string) {
    super(message)
    this.code = code
  }
}

export function unwrapResponse(response: AxiosResponse): AxiosResponse {
  const body = response.data as ApiResponse<unknown>
  if (!body.success) {
    throw new ApiError(body.code, body.message)
  }
  return { ...response, data: body.data }
}

export function mapErrorResponse(error: AxiosError<ApiResponse<unknown>>): never {
  const body = error.response?.data
  if (body) {
    throw new ApiError(body.code, body.message)
  }
  throw error
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api',
})

apiClient.interceptors.response.use(
  (response) => unwrapResponse(response),
  (error) => mapErrorResponse(error),
)

export default apiClient
