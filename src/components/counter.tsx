import React from "react"
import * as styles from "~/styles/components/counter.module.css"

type Props = {
  value?: number
  update: (value: number) => void
}

const Counter: React.FC<Props> = ({ value = 0, update }) => {
  const decrement = () => {
    if (value <= 0) {
      return
    }
    update(value - 1)
  }
  const increment = () => {
    update(value + 1)
  }

  return (
    <div className={styles.counter}>
      <button className={styles.decrementButton} onClick={decrement}></button>
      <span className={styles.value}>{value}</span>
      <button className={styles.incrementButton} onClick={increment}></button>
    </div>
  )
}

export default Counter
