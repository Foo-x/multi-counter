import { createContext } from "react"

export type Store<T> = {
  load: () => T | null
  save: (v: T) => void
}

export type CounterProps = {
  id: number
  label: string
  value: number
}

export type CounterListStore = Store<CounterProps[]>

export const CounterListStoreContext = createContext<CounterListStore>({
  load: () => null,
  save: () => {},
})
