import { describe, expect, it } from 'vitest'
import type { AxiosError, AxiosResponse } from 'axios'
import { ApiError, mapErrorResponse, unwrapResponse } from './client'
import type { ApiResponse } from './client'

function fakeResponse<T>(body: ApiResponse<T>): AxiosResponse {
  return { data: body, status: 200, statusText: 'OK', headers: {}, config: {} as never }
}

describe('unwrapResponse', () => {
  it('returns only data when success is true', () => {
    const response = fakeResponse({ success: true, data: { id: 1 }, message: 'ok', code: 'OK' })

    const result = unwrapResponse(response)

    expect(result.data).toEqual({ id: 1 })
  })

  it('throws ApiError when success is false', () => {
    const response = fakeResponse({ success: false, data: null, message: '실패', code: 'ERROR' })

    expect(() => unwrapResponse(response)).toThrow(ApiError)
  })
})

describe('mapErrorResponse', () => {
  it('throws ApiError built from response body when present', () => {
    const error = {
      response: fakeResponse({ success: false, data: null, message: '없음', code: 'TODO_NOT_FOUND' }),
    } as AxiosError<ApiResponse<unknown>>

    expect(() => mapErrorResponse(error)).toThrow(ApiError)
    try {
      mapErrorResponse(error)
    } catch (e) {
      expect((e as ApiError).code).toBe('TODO_NOT_FOUND')
    }
  })

  it('rethrows original error when no response body exists (network error)', () => {
    const error = { response: undefined, message: 'Network Error' } as AxiosError<ApiResponse<unknown>>

    expect(() => mapErrorResponse(error)).toThrow('Network Error')
  })
})
