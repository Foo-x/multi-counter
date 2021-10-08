import React from "react"
import type { CounterProps } from "~/contexts/storeContext"
import * as styles from "~/styles/components/counterWithLabel.module.css"
import Counter from "./counter"

type Props = {
  prop: CounterProps
  update: (prop: CounterProps) => void
  remove: () => void
}

const CounterWithLabel: React.FC<Props> = ({ prop, update, remove }) => {
  return (
    <div className={styles.counterWithLabel}>
      <input
        className={styles.label}
        defaultValue={prop.label}
        onInput={e => {
          update({ ...prop, label: e.currentTarget.value })
        }}
      />
      <div className={styles.counterRow}>
        <Counter initValue={prop.value} />
      </div>
      <button className={styles.closeButton} onClick={() => remove()}></button>
    </div>
  )
}

export default CounterWithLabel
