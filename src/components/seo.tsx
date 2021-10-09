/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"

type Props = {
  description?: string
  lang?: string
  meta?: JSX.IntrinsicElements["meta"][]
  title?: string
}

const Seo: React.FC<Props> = ({
  description,
  lang = "ja",
  meta = [],
  title,
}) => {
  const { site } = useStaticQuery<GatsbyTypes.SeoQuery>(
    graphql`
      query Seo {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  )

  const metaDescription = description || site!.siteMetadata!.description
  const actualTitle = title
    ? `${title} | ${site!.siteMetadata!.title}`
    : site!.siteMetadata!.title

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={actualTitle}
      meta={[
        ...[
          {
            name: `description`,
            content: metaDescription,
          },
          {
            property: `og:title`,
            content: actualTitle,
          },
          {
            property: `og:description`,
            content: metaDescription,
          },
          {
            property: `og:type`,
            content: `website`,
          },
        ],
        ...meta,
      ]}
    />
  )
}

export default Seo
