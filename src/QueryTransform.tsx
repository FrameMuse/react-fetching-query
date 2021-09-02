import { createContext } from "react"
import { useQueryContext } from "./QueryContext"

interface QueryTransformProps {
  children: any
  transform(props: { children: any }): JSX.Element
}

export const QueryTransformContext = createContext<QueryTransformProps["transform"]>(DefaultQueryTransformation)

export function QueryTransform(props: QueryTransformProps) {
  return (
    <QueryTransformContext.Provider value={props.transform}>
      {props.children}
    </QueryTransformContext.Provider>
  )
}

function DefaultQueryTransformation(props: { children: any }) {
  const queryContext = useQueryContext()

  // TO-DO: Fix initial false loading
  if (queryContext.loading || queryContext.payload == null) {
    return null
  }

  if (queryContext.errorObject instanceof Error) {
    return queryContext.errorObject.message
  }

  return props.children
}
