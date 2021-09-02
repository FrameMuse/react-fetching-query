import { useQueryContext } from './QueryContext';
import { QueryProvider } from './QueryProvider';
import { QueryTransform } from './QueryTransform';
import { StrictMode } from 'react';
import { Action, ClientContextProvider, createClient } from 'react-fetching-library';

const client = createClient({
  //None of the options is required
  requestInterceptors: [],
  responseInterceptors: [],
  // cacheProvider: cacheProvider,
  // fetch: customFetchImplementation,
});

const getUserInfo: Action<{
  id: number
  name: string
}> = {
  method: "GET",
  endpoint: "/user/info"
}

function DefaultQueryTransformation(props: { children: any }) {
  const queryContext = useQueryContext()

  if (queryContext.loading) {
    return null
  }

  if (queryContext.errorObject instanceof Error) {
    return queryContext.errorObject.message
  }

  return props.children
}

function App() {
  return (
    <StrictMode>
      <ClientContextProvider client={client}>
        <QueryTransform transform={DefaultQueryTransformation}>
          <TopBar />
        </QueryTransform>
      </ClientContextProvider>
    </StrictMode>
  )
}

function TopBar() {
  return (
    <QueryProvider action={getUserInfo}>
      <User />
      {/* ... */}
    </QueryProvider>
  )
}

function User() {
  const { payload } = useQueryContext<typeof getUserInfo>()
  return (
    <div>
      <h2>ID: {payload.id}</h2>
      <h2>Name: {payload.name}</h2>
    </div>
  )
}

export default App