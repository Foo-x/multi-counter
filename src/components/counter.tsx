import React, { useReducer } from "react"
import * as styles from "~/styles/components/counter.module.css"

type Props = {
  initValue?: number
}

type Action = "increment" | "decrement"

const reducer = (state: number, action: Action): number => {
  switch (action) {
    case "increment":
      return state + 1

    case "decrement":
      if (state <= 0) {
        return 0
      }
      return state - 1

    default:
      const _: never = action
      return _
  }
}

const Counter: React.FC<Props> = ({ initValue = 0 }) => {
  const [state, dispatch] = useReducer(reducer, Math.max(0, initValue))
  return (
    <div className={styles.counter}>
      <button
        className={styles.decrementButton}
        onClick={() => dispatch("decrement")}
      ></button>
      <span className={styles.value}>{state}</span>
      <button
        className={styles.incrementButton}
        onClick={() => dispatch("increment")}
      ></button>
    </div>
  )
}

export default Counter
