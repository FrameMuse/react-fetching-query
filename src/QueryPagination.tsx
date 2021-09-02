import { useContext, useState } from "react"
import { Action, ClientContext, QueryResponse } from "react-fetching-library"
import { useQueryContext } from "./QueryContext"
import { getPaginationData, removeHostPath } from "./QueryHelpers"

interface QueryPaginationProps {
  children: any
  use?: string
  empty?: string
  emptyLink?: string
}

export function QueryPagination(props: QueryPaginationProps) {
  const client = useContext(ClientContext)
  const { payload: currentPayload, modifyPayload } = useQueryContext<Action<Record<string, any>>>()
  const [loading, setLoading] = useState(false)
  const paginationData = getPaginationData(currentPayload, props.use || "")

  if (!paginationData) throw new Error("QueryPaginationError: 'paginationData' is empty")

  const isEmpty = !paginationData.data?.length
  const isAtLastPage = () => {
    const { current_page, last_page } = paginationData
    if (current_page === last_page) return true
    return false
  }

  async function loadMore() {
    if (!paginationData?.next_page_url || isAtLastPage()) return

    setLoading(true)

    const response = await client.query<any>({
      method: "GET",
      endpoint: removeHostPath(paginationData.next_page_url) || "eperror",
    })

    modifyPayload(appendCurrentPayload(response.payload))
    setLoading(false)
  }

  function appendCurrentPayload(payload: QueryResponse["payload"]): Parameters<typeof modifyPayload>[0] {
    if (!payload) return currentPayload
    if (props.use) {
      return {
        ...currentPayload,
        [props.use]: {
          ...payload[props.use],
          data: [
            ...currentPayload[props.use]["data"],
            ...payload[props.use]["data"]
          ]
        }
      }
    }

    return {
      ...payload,
      data: [
        ...currentPayload.data,
        ...payload.data
      ]
    }
  }

  if (!isEmpty && isAtLastPage()) {
    return props.children
  }

  return (
    <PaginationWrapper>
      {props.children}
    </PaginationWrapper>
  )
}

function PaginationWrapper(props: { children: any }) {
  return <div className="paggination" style={{ display: "grid" }}>{props.children}</div>
}
