import type { CounterListStore, CounterProps } from "~/contexts/storeContext"

const counterListKey = "counter-list"

export const counterListStore: CounterListStore = {
  load: () => {
    if (typeof localStorage === "undefined") {
      return null
    }

    const counterList = localStorage.getItem(counterListKey)
    if (!counterList) {
      return null
    }
    return JSON.parse(counterList)
  },
  save: (counterList: CounterProps[]) => {
    if (typeof localStorage === "undefined") {
      return
    }

    localStorage.setItem(counterListKey, JSON.stringify(counterList))
  },
}
