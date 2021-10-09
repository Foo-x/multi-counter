import type { PageProps } from "gatsby"
import React, { useEffect, useReducer, useState } from "react"
import CounterWithLabel from "~/components/counterWithLabel"
import type { CounterProps } from "~/contexts/storeContext"
import { CounterListStoreContext } from "~/contexts/storeContext"
import { counterListStore } from "~/modules/localStorage"
import * as styles from "~/styles/pages/index.module.css"
import Layout from "../components/layout"
import Seo from "../components/seo"

type Action =
  | {
      type: "init"
      props: CounterProps[]
    }
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
    case "init":
      return action.props

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

  const [counterList, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    const savedCounterList = counterListStore.load() ?? []
    const nextId =
      savedCounterList.length > 0
        ? savedCounterList[savedCounterList.length - 1].id + 1
        : 0
    setNextId(nextId)

    dispatch({ type: "init", props: savedCounterList })
  }, [])

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
                prop: { id: nextId, label: "", value: 0 },
              })
              setNextId(nextId + 1)
            }}
          ></button>
        </div>
      </Layout>
    </CounterListStoreContext.Provider>
  )
}

export default IndexPage
