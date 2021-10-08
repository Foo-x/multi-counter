import React from "react"
import * as styles from "~/styles/components/counterWithLabel.module.css"
import Counter from "./counter"

type Props = {
  initLabel: string
  initValue?: number
  dispatch: () => void
}

const CounterWithLabel: React.FC<Props> = ({
  initLabel,
  initValue = 0,
  dispatch,
}) => {
  return (
    <div className={styles.counterWithLabel}>
      <input className={styles.label} defaultValue={initLabel} />
      <div className={styles.counterRow}>
        <Counter initValue={initValue} />
      </div>
      <button
        className={styles.closeButton}
        onClick={() => dispatch()}
      ></button>
    </div>
  )
}

export default CounterWithLabel
