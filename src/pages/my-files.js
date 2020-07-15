import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = ({ data }) => (
  <Layout>
    <div>
      {data.allMarkdownRemark.nodes.map(({ id, html, excerpt }) => {
        return html
      })}
    </div>
  </Layout>
)

export default SecondPage

export const query = graphql`
  query {
    allMarkdownRemark {
      nodes {
        id
        html
        excerpt(format: PLAIN, pruneLength: 10)
      }
    }
  }
`
