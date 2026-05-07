import { useCallback, useState } from 'react'

export type MutationState<T> = {
  data: T | null
  isLoading: boolean
  error: string | null
  mutate: (payload?: unknown) => Promise<T | null>
  reset: () => void
}

/**
 * Generic hook for mutations (create/update/delete).
 * Provides loading/error state and a stable mutate function.
 *
 * @example
 * const { mutate, isLoading, error } = useMutation(
 *   (payload) => usersService.updateStatus(id, payload.status)
 * )
 */
export function useMutation<T>(
  fn: (payload?: unknown) => Promise<T>,
): MutationState<T> {
  const [data, setData]         = useState<T | null>(null)
  const [isLoading, setLoading] = useState(false)
  const [error, setError]       = useState<string | null>(null)

  const mutate = useCallback(async (payload?: unknown): Promise<T | null> => {
    setLoading(true)
    setError(null)
    try {
      const result = await fn(payload)
      setData(result)
      return result
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(msg)
      return null
    } finally {
      setLoading(false)
    }
  }, [fn])

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  return { data, isLoading, error, mutate, reset }
}
