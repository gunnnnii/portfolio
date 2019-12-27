import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { LinkExt } from "../components/Link"
import { Markdown } from "../components/markdown"

const ProjectPost = ({ location, data }) => {
  const {
    htmlAst,
    frontmatter: { title, desc, github },
  } = data.markdownRemark

  return (
    <Layout heading={title} location={location}>
      <Markdown tree={htmlAst} />
      <LinkExt href={github}>Have a look at the project on Github</LinkExt>
    </Layout>
  )
}

export default ProjectPost

export const query = graphql`
  query($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      frontmatter {
        title
        desc
        github
      }
    }
  }
`
