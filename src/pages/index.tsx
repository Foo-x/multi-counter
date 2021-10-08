import type { PageProps } from "gatsby"
import React, { useReducer, useState } from "react"
import CounterWithLabel from "~/components/counterWithLabel"
import type { CounterProps } from "~/contexts/storeContext"
import { CounterListStoreContext } from "~/contexts/storeContext"
import { counterListStore } from "~/modules/localStorage"
import * as styles from "~/styles/pages/index.module.css"
import Layout from "../components/layout"
import Seo from "../components/seo"

type Action =
  | {
      type: "append"
      prop: CounterProps
    }
  | {
      type: "update"
      index: number
      prop: CounterProps
    }
  | {
      type: "remove"
      index: number
    }

const reducer = (state: CounterProps[], action: Action): CounterProps[] => {
  let newState: CounterProps[]
  switch (action.type) {
    case "append":
      newState = [...state, action.prop]
      counterListStore.save(newState)
      return newState

    case "update":
      newState = [...state]
      newState[action.index] = action.prop
      counterListStore.save(newState)
      return newState

    case "remove":
      newState = state.filter((_, i) => i !== action.index)
      counterListStore.save(newState)
      return newState

    default:
      const _: never = action
      return _
  }
}

const IndexPage: React.FC<PageProps> = () => {
  const [nextId, setNextId] = useState(0)

  const [counterList, dispatch] = useReducer(
    reducer,
    counterListStore.load() ?? []
  )

  return (
    <CounterListStoreContext.Provider value={counterListStore}>
      <Layout>
        <Seo title="Home" />
        <div className={styles.counterList}>
          {counterList.map((prop, i) => (
            <CounterWithLabel
              prop={prop}
              update={newProp =>
                dispatch({ type: "update", index: i, prop: newProp })
              }
              remove={() => dispatch({ type: "remove", index: i })}
              key={prop.id}
            />
          ))}
          <button
            className={styles.appendButton}
            onClick={() => {
              dispatch({
                type: "append",
                prop: { id: nextId, label: "カウンタ", value: 0 },
              })
              setNextId(nextId >= Number.MAX_SAFE_INTEGER ? 0 : nextId + 1)
            }}
          ></button>
        </div>
      </Layout>
    </CounterListStoreContext.Provider>
  )
}

export default IndexPage
