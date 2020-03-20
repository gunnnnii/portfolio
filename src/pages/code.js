import React, { useRef } from "react"
import { Link, graphql } from "gatsby"

import { FaGithub } from "react-icons/fa"
import styled from "styled-components"
import { LinkExt } from "../components/Link"
import { gutter, breakpoints, colors } from "../style_constants"
import { useWindowWidth } from "../hooks/useWindowWidth"

import TechIcon from '../components/icons/TechIcon'

const CardsStyle = styled.ul`
  list-style: none;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 1fr;
  grid-gap: ${gutter};

  @media (max-width: ${breakpoints.medium}px) {
    & {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: ${breakpoints.small}px) {
    & {
      grid-template-columns: 1fr;
      margin: auto calc(${gutter} * -3);
    }
    & > * {
      margin: 0 calc(${gutter} / 2);
      flex: 1 0 75%;
    }
  }
`

const CardContainer = styled.li`
  transition: transform 0.2s ease-out;
  background: white;
  height: 100%;

  display: grid;
  grid-template-rows: auto min-content;
  padding: ${gutter};

  color: ${props => props.theme.text};
  background: ${props => props.theme.backdrop};
  background: ${props => props.theme.cardGradient};


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

  &:hover {
    transform: scale3d(1.05, 1.05, 1.1) translateY(-10px);
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

const ImageContainer = styled.div`
  max-width: 100%;
  min-height: 6rem;
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
    min-height: 20rem;
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

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${gutter};
`

const CardIconContainer = styled.div`
  & > svg {
  height: 1em;
  width: 1em;
  margin: 0 0.1rem;
  }
`

const Card = ({ content }) => (
  <CardContainer>
    <Link to={content.slug}>
      <CardContent
        title={content.title}
        thumbnail={content.thumbnail}
        description={content.desc}
      />
    </Link>
    <CardFooter>
      <CardIconContainer>
        {content.tech && content.tech.split(" ").map(tech => {
          return <TechIcon key={`${tech}-${content.slug}`} icon={tech} fill={colors.night.text} />
        })}
      </CardIconContainer>
      <LinkExt className="__github" href={content.github}>
        <FaGithub />
      </LinkExt>
    </CardFooter>
  </CardContainer>
)

const Cards = ({ cards }) => {
  const width = useWindowWidth()
  const containerRef = useRef()
  return (
    <Wrapper screenWidth={width}>
      <CardsStyle ref={containerRef}>
        {cards.map((card) => (
          <Card key={card.slug} content={card} />
        ))}
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
    <>
      <Cards cards={projects} />
    </>
  )
}
export default Code

export const query = graphql`
  query AllProjects {
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/code/"}}) {
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
            tech
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
