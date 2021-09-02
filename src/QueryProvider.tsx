import { QueryContext } from "QueryContext"
import { QueryTransformContext } from "QueryTransform"
import { useContext, useEffect, useState } from "react"
import { Action, useMutation } from "react-fetching-library"

interface QueryProviderProps {
  action: Action
  children: any
  initFetch?: boolean
}

export function QueryProvider(props: QueryProviderProps) {
  const QueryTransformation = useContext(QueryTransformContext)
  const response = useMutation((action: any) => ({ ...props.action, ...action }))
  const [payload, modifyPayload] = useState(response.payload)

  useEffect(() => modifyPayload(response.payload), [response.payload])
  useEffect(() => {
    if (props.initFetch ?? true) {
      response.mutate({ })
    }
  }, [])
  useEffect(() => {
    response.mutate(props.action)
  }, Object.values(props.action))

  const contextValue = {
    ...response,
    modifyPayload,
    query: () => response.mutate({ }),
    mutate: (action?: Action) => response.mutate(action),
    payload
  }

  return (
    <QueryContext.Provider value={contextValue}>
      <QueryTransformation>
        {props.children}
      </QueryTransformation>
    </QueryContext.Provider>
  )
}