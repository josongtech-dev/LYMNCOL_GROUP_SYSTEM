import { useEffect, useReducer, useRef } from 'react'

export type AsyncState<T> = {
  data: T | null
  isLoading: boolean
  error: string | null
  refetch: () => void
}

type State<T> = { data: T | null; isLoading: boolean; error: string | null }
type Action<T> =
  | { type: 'loading' }
  | { type: 'success'; payload: T }
  | { type: 'error'; payload: string }

function reducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case 'loading':  return { ...state, isLoading: true,  error: null }
    case 'success':  return { data: action.payload, isLoading: false, error: null }
    case 'error':    return { ...state, isLoading: false, error: action.payload }
    default:         return state
  }
}

/**
 * Generic hook for async data fetching with loading/error/refetch support.
 * Replace mock useMemo data blocks with this once backend is ready.
 *
 * @example
 * const { data, isLoading, error, refetch } = useAsync(
 *   () => usersService.list(currentPage, itemsPerPage),
 *   [currentPage, itemsPerPage]
 * )
 */
export function useAsync<T>(
  fn: () => Promise<T>,
  deps: unknown[] = [],
): AsyncState<T> {
  const [state, dispatch] = useReducer(reducer<T>, {
    data: null,
    isLoading: true,
    error: null,
  })

  const mountedRef = useRef(true)
  const fnRef      = useRef(fn)

  useEffect(() => { fnRef.current = fn })

  useEffect(() => {
    mountedRef.current = true
    return () => { mountedRef.current = false }
  }, [])

  useEffect(() => {
    dispatch({ type: 'loading' })
    fnRef.current().then((result) => {
      if (mountedRef.current) dispatch({ type: 'success', payload: result })
    }).catch((err: unknown) => {
      if (mountedRef.current) {
        dispatch({
          type: 'error',
          payload: err instanceof Error ? err.message : 'An unexpected error occurred',
        })
      }
    })
    // caller-controlled deps intentionally spread
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  const refetch = () => {
    dispatch({ type: 'loading' })
    fnRef.current().then((result) => {
      if (mountedRef.current) dispatch({ type: 'success', payload: result })
    }).catch((err: unknown) => {
      if (mountedRef.current) {
        dispatch({
          type: 'error',
          payload: err instanceof Error ? err.message : 'An unexpected error occurred',
        })
      }
    })
  }

  return { ...state, refetch }
}
