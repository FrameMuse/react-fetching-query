import { QueryContextResponse, useQueryContext } from "QueryContext"
import { Action } from "react-fetching-library"
import { NulishType } from "types"

export function QueryConsumer<A extends Action = any, Nulish extends NulishType = never>(props: { children: (response: QueryContextResponse<A, Nulish>) => any }) {
  const response = useQueryContext<A, Nulish>()
  return props.children(response)
}