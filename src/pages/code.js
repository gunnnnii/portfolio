import React, { useRef } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import { FaGithub } from "react-icons/fa"
import styled from "styled-components"
import { LinkExt } from "../components/Link"
import { gutter, breakpoints } from "../style_constants"
import { useWindowWidth } from "../hooks/useWindowWidth"

const CardsStyle = styled.ul`
  list-style: none;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: ${gutter};

  @media (max-width: ${breakpoints.small}px) {
    & > * {
      margin: 0 calc(${gutter} / 2);
      flex: 1 0 75%;
    }
  }
`

const CardContainer = styled.li`
  background: white;
  height: 100%;

  display: grid;
  grid-template-rows: auto min-content;
  padding: ${gutter};

  color: ${props => props.theme.text};
  background: ${props => props.theme.backdrop};

  & section {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

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

  @media (max-width: ${breakpoints.small}px) {
    scroll-snap-align: center;
  }
`

const CardHeading = styled.h2`
  background-image: ${props => `linear-gradient(
    180deg,
    ${props.theme.highlight} 0,
    ${props.theme.highlight}
  )`};
  background-position: 0 1em;
  background-size: 100%;
  transition: background-position 0.2s 0.1s;
  background-repeat: no-repeat;
  display: inline;
  &:hover {
    background-position: 0 0;
  }
`

const Wrapper = styled.div`
  @media (max-width: ${breakpoints.small}) {
    height: 100%;
    overflow: hidden;
    margin: 0 calc(${gutter} * -3);
    width: ${props => props.screenWidth}px;
  }
`

const Spacer = styled.span`
  flex: 0 0 3rem;
`

const ImageContainer = styled.div`
  max-width: 100%;
  height: min(4rem, 10vh);
  margin: 0.5rem 0;

  border-bottom: calc(${gutter} / 2) solid ${props => props.theme.text};

  display: flex;
  align-items: center;
  flex: 0 1 4rem;

  overflow: hidden;
  & img {
    object-fit: cover;
    max-width: 100%;
  }

  @media (max-width: ${breakpoints.small}px) {
    flex-basis: 8rem;
  }
`

const CardContent = ({ title, thumbnail, description }) => (
  <section>
    <div>
      <CardHeading>{title}</CardHeading>
    </div>
    <ImageContainer>
      <img src={thumbnail.childImageSharp.fluid.src} alt="" aria-hidden />
    </ImageContainer>
    <p>{description}</p>
  </section>
)

const Card = ({ content }) => (
  <CardContainer>
    <Link to={content.slug}>
      <CardContent
        title={content.title}
        thumbnail={content.thumbnail}
        description={content.desc}
      />
    </Link>
    <LinkExt className="__github" href={content.github}>
      <FaGithub />
    </LinkExt>
  </CardContainer>
)

const Cards = ({ cards }) => {
  const width = useWindowWidth()
  const containerRef = useRef()
  return (
    <Wrapper screenWidth={width}>
      <CardsStyle ref={containerRef}>
        {cards.map((card, index) => (
          <Card key={card.slug} content={card} />
        ))}
        {breakpoints.small >= width ? <Spacer aria-hidden="true" /> : null}
      </CardsStyle>
    </Wrapper>
  )
}

const Code = ({ location, data }) => {
  const {
    allMarkdownRemark: { edges = [] },
  } = data

  const projects = edges.map(({ node }) => {
    const { fields, frontmatter } = node
    return {
      ...fields,
      ...frontmatter,
    }
  })

  return (
    <Layout title="Code" heading="code" location={location}>
      <Cards cards={projects} />
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
            thumbnail {
              childImageSharp {
                fluid {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`
