import React, { useEffect, useRef } from "react"
import type { CounterProps } from "~/contexts/storeContext"
import * as styles from "~/styles/components/counterWithLabel.module.css"
import Counter from "./counter"

type Props = {
  prop: CounterProps
  shouldFocus: boolean
  update: (prop: CounterProps) => void
  remove: () => void
}

const CounterWithLabel: React.FC<Props> = ({
  prop,
  shouldFocus,
  update,
  remove,
}) => {
  const inputRef = useRef<HTMLInputElement>(null!)
  useEffect(() => {
    if (shouldFocus) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div className={styles.counterWithLabel}>
      <input
        className={styles.label}
        defaultValue={prop.label}
        placeholder={"カウンター名"}
        ref={inputRef}
        onInput={e => {
          update({ ...prop, label: e.currentTarget.value })
        }}
      />
      <div className={styles.counterRow}>
        <Counter
          value={prop.value}
          update={value => {
            update({ ...prop, value })
          }}
        />
      </div>
      <button className={styles.closeButton} onClick={() => remove()}></button>
    </div>
  )
}

export default CounterWithLabel
