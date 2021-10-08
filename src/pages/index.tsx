import type { PageProps } from "gatsby"
import React from "react"
import CounterWithLabel from "~/components/counterWithLabel"
import * as styles from "~/styles/pages/index.module.css"
import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Seo title="Home" />
      <div className={styles.counterList}>
        <CounterWithLabel initLabel="foo" />
        <CounterWithLabel initLabel="bar" />
        <button className={styles.appendButton}></button>
      </div>
    </Layout>
  )
}

export default IndexPage
