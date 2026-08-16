import { QueryClient } from '@tanstack/react-query'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

export const TODOS_QUERY_KEY = ['todos'] as const

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
      retry: 1,
    },
  },
})

export const persister = createSyncStoragePersister({
  storage: window.localStorage,
  key: 'my-todo-query-cache',
})

export const persistOptions = {
  persister,
  maxAge: 1000 * 60 * 60 * 24,
  buster: 'v1',
  dehydrateOptions: {
    shouldDehydrateQuery: (query: { queryKey: readonly unknown[] }) =>
      query.queryKey[0] === TODOS_QUERY_KEY[0],
  },
}
