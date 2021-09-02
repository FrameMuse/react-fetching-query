import { Action } from "react-fetching-library";

export type NulishType = undefined | null | never
export type PayloadOf<A extends Action> = A extends Action<infer P> ? P : never