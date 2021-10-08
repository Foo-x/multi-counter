import type { PageProps } from "gatsby"
import React, { useReducer } from "react"
import CounterWithLabel from "~/components/counterWithLabel"
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
  switch (action.type) {
    case "append":
      return [...state, action.prop]

    case "update":
      const newState = [...state]
      newState[action.index] = action.prop
      return newState

    case "remove":
      return state.filter((_, i) => i !== action.index)

    default:
      const _: never = action
      return _
  }
}

const IndexPage: React.FC<PageProps> = () => {
  const [counterList, dispatch] = useReducer(reducer, [])

  return (
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
            key={i}
          />
        ))}
        <button
          className={styles.appendButton}
          onClick={() =>
            dispatch({ type: "append", prop: { label: "カウンタ", value: 0 } })
          }
        ></button>
      </div>
    </Layout>
  )
}

export default IndexPage
