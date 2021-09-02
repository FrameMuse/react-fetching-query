import { RequiredBy } from "kotto-web-common/@types"
import { createContext, useContext } from "react"
import { Action, QueryResponse, UseQueryResponse } from "react-fetching-library"
import { NulishType, PayloadOf } from "./types"

interface QueryExtenstion<T = {}> {
  modifyPayload: React.Dispatch<React.SetStateAction<T | undefined>>
  mutate(action?: Partial<Action>): Promise<QueryResponse<T>>
}

export type QueryContextResponse<A extends Action, Nulish extends NulishType = never, T = PayloadOf<A>> = RequiredBy<UseQueryResponse<T | Nulish>, "payload"> & QueryExtenstion<T>

export const QueryContext = createContext<UseQueryResponse<any> & QueryExtenstion>({
  error: false,
  loading: true,
  abort: () => { },
  reset: () => { },
  query: () => new Promise(() => { }),
  mutate: () => new Promise(() => { }),
  modifyPayload: () => { }
})
export function useQueryContext<A extends Action = any, Nulish extends NulishType = never>() {
  const response = useContext(QueryContext) as QueryContextResponse<A, Nulish>
  return response
}