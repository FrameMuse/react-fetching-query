# Getting started

This library adds a dynamic context of a query.
And a transition during request and fetching.

# Installation

Run the following

`npm install react-fetching-query`

# Usage

Firstly you need to follow the [instructions](https://marcin-piela.github.io/react-fetching-library/#/?id=usage)
That's it. You can use react-fetching-library as you normally would. And also you can do the following.

You have a standart action

```ts
const getUserInfo: Action<{
	id: number
	name: string
}> = {
	method: "GET",
	endpoint: "/user/info",
}
```

Then you use `QueryProvider` to provide a `QueryContext` to its children

```jsx
function TopBar() {
	return (
		<QueryProvider action={getUserInfo}>
			<User />
			{/* ... */}
		</QueryProvider>
	)
}
```

Then you use this context with `useQueryContext`

```jsx
function User() {
	const { payload } = useQueryContext()
	return (
		<div>
			<h2>ID: {payload.id}</h2>
			<h2>Name: {payload.name}</h2>
		</div>
	)
}
```

When using typescript

```tsx
const { payload } = useQueryContext<typeof getUserInfo>()
// Or with nulish parameter which makes 'getUserInfo' Optional.
const { payload } = useQueryContext<typeof getUserInfo, null>()
```

# Transformation

You can use your own components for handling loading and errors.
You will have to add `QueryTransform` to change the default `Transformation`.

```tsx

```

However you will be able to change it locally

```tsx

```
