import type { CounterListStore, CounterProps } from "~/contexts/storeContext"

const counterListKey = "counter-list"

export const counterListStore: CounterListStore = {
  load: () => {
    const counterList = localStorage.getItem(counterListKey)
    if (!counterList) {
      return null
    }
    return JSON.parse(counterList)
  },
  save: (counterList: CounterProps[]) => {
    localStorage.setItem(counterListKey, JSON.stringify(counterList))
  },
}
