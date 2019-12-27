import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { FaGithub } from "react-icons/fa"
import styled from "styled-components"
import { LinkExt } from "../components/Link"
import { gutter, colors } from "../style_constants"

const Cards = styled.ul`
  list-style: none;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: ${gutter};

  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`

const CardContainer = styled.li`
  background: white;
  display: grid;
  grid-template-rows: auto 1fr;
  box-sizing: content-box;
  padding: ${gutter};
  max-height: 15rem;

  color: ${colors.darkBlue};

  & a {
    text-decoration: none;
  }

  & .__github {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    background-size: 0;
  }

  &:hover h2 {
    background-position: 0 0;
  }
`

const CardHeading = styled.h2`
  background-image: ${props => `linear-gradient(
    180deg,
    ${colors.brightHighlight} 0,
    ${colors.brightHighlight}
  )`};
  background-position: 0 1rem;
  background-size: 100%;
  transition: background-position 0.2s 0.1s;
  background-repeat: no-repeat;
  display: inline;
  &:hover {
    background-position: 0 0;
  }
`

const CardContent = ({ title, description }) => (
  <section>
    <CardHeading>{title}</CardHeading>
    <p>{description}</p>
  </section>
)

const Card = ({ content }) => (
  <CardContainer>
    <Link to={content.slug}>
      <CardContent title={content.title} description={content.desc} />
    </Link>
    <LinkExt className="__github" href={content.github}>
      <FaGithub />
    </LinkExt>
  </CardContainer>
)

const Code = ({ location, match, data }) => {
  const {
    allMarkdownRemark: { edges = [] },
  } = data

  const cards = edges.map(({ node }) => {
    const { fields, frontmatter } = node
    return {
      ...fields,
      ...frontmatter,
    }
  })

  return (
    <Layout heading="code" location={location}>
      <SEO title="Code" />
      <Cards>
        {cards.map(project => (
          <Card key={project.slug} content={project} />
        ))}
      </Cards>
    </Layout>
  )
}
export default Code

export const query = graphql`
  query AllProjects {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            desc
            github
            name
            title
          }
        }
      }
    }
  }
`
