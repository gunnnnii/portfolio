import React, { useEffect, useLayoutEffect, useRef } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { FaGithub } from "react-icons/fa"
import styled from "styled-components"
import { LinkExt } from "../components/Link"
import { gutter, colors, breakpoints } from "../style_constants"
import { useWindowWidth } from "../hooks/useWindowWidth"

const CardsStyle = styled.ul`
  list-style: none;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: ${gutter};

  @media (max-width: ${breakpoints.large}px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${breakpoints.medium}px) {
    display: flex;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    & > * {
      margin: 0 calc(${gutter} / 2);
      flex: 1 0 50%;
    }
  }

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
  grid-template-rows: auto 1fr;
  padding: ${gutter};

  color: ${colors.darkBlue};

  & section {
    display: flex;
    flex-direction: column;
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

  @media (max-width: ${breakpoints.medium}px) {
    box-sizing: border-box;
    scroll-snap-align: start;
    &:first-child {
      margin-left: 3rem;
    }

    &:last-child {
      margin-right: 3rem;
    }
  }

  @media (max-width: ${breakpoints.small}px) {
    scroll-snap-align: center;
  }
`

const CardHeading = styled.h2`
  background-image: ${() => `linear-gradient(
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

const Wrapper = styled.div`
  width: ${props => props.screenWidth}px;
  height: 100%;

  overflow: hidden;
  margin: 0 calc(${gutter} * -3);
  @media (min-width: ${breakpoints.medium + 1}px) {
    width: inherit;
    margin: inherit;
  }
`

const Spacer = styled.span`
  flex: 0 0 3rem;
`

const ImageContainer = styled.div`
  max-width: 100%;
  height: min(4rem, 10vh);
  margin: 0.5rem 0;

  border-bottom: calc(${gutter} / 2) solid
    ${({ theme }) =>
      theme.mode === "light" ? colors.brightHighlight : colors.darkHighlight};

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
      <img src={thumbnail.childImageSharp.fluid.src} />
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
  useLayoutEffect(() => {}, [])
  console.log(cards)
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
    <Layout heading="code" location={location}>
      <SEO title="Code" />
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
