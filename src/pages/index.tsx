import type { PageProps } from "gatsby"
import React, { useReducer } from "react"
import CounterWithLabel from "~/components/counterWithLabel"
import * as styles from "~/styles/pages/index.module.css"
import Layout from "../components/layout"
import Seo from "../components/seo"

type CounterProps = {
  label: string
  value: number
}

type Action = {
  type: "append"
  prop: CounterProps
}

const reducer = (state: CounterProps[], action: Action): CounterProps[] => {
  switch (action.type) {
    case "append":
      state.push(action.prop)
      return [...state]
    default:
      const _: never = action.type
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
            initLabel={prop.label}
            initValue={prop.value}
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
