import React from "react"
import { graphql } from "gatsby"
import { LinkExt } from "../components/Link"
import { Markdown } from "../components/markdown"
import styled from 'styled-components'
import { breakpoints } from '../style_constants'

const Heading = styled.h1`
  font-size: ${({ fontSize = 4 }) => fontSize}rem;
  word-break: break-word;
  @media (max-width: ${breakpoints.small}px) {
    & {
      font-size: ${({ fontSizeSmall = 1 }) => fontSizeSmall}rem;
    }
  }
  cursor: pointer;
`

const ProjectPost = ({ data }) => {
  const {
    htmlAst,
    frontmatter: { title, github },
  } = data.markdownRemark

  return (
    <>
      <Heading fontSizeSmall={4}>{title}</Heading>
      <Markdown tree={htmlAst} />
      <LinkExt href={github}>Have a look at the project on Github</LinkExt>
    </>
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
