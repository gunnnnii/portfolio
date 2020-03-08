import React, { useState } from "react"
import Layout from "../components/layout"
import { LinkExt } from "../components/Link"
import styled from "styled-components"
import { gutter } from "../style_constants"

const Section = styled.section`
  margin: ${gutter} 0;
  display: flex;
  flex-direction: column;
  &:last-child {
    margin-bottom: 0;
  }

  &:first-child {
    margin-top: 0;
  }
`

const Slider = styled.div`
  margin: 1rem 0;
  width: calc(50vw + 2rem);
  display: flex;
  text-align: center;
  overflow: hidden;

  align-self: center;
`

const ImageWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;

  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 1rem;
  }
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.text};
  }
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.highlight};
  }

  & > img {
    min-width: 100%;
    max-height: 600px;
    margin: 0 1rem;
    scroll-snap-align: start;
    object-fit: cover;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
`

const Carousel = ({ images }) => {
  const [position, setPosition] = useState(0)

  const sorted = images.sort((a, b) => a.id > b.id)

  return (
    <Slider>
      {sorted[position - 1] ? (
        <a
          href={`#${sorted[position - 1].id}`}
          onClick={() => setPosition(p => p - 1)}
        >
          prev
        </a>
      ) : (
        <p>prev</p>
      )}
      <ImageWrapper>
        {sorted.map(image => (
          <img
            id={image.id}
            key={image.id}
            src={image.src}
            alt={image.description}
          />
        ))}
      </ImageWrapper>
      {sorted[position + 1] ? (
        <a
          href={`#${sorted[position + 1].id}`}
          onClick={() => setPosition(p => p + 1)}
        >
          next
        </a>
      ) : (
        <p>next</p>
      )}
    </Slider>
  )
}

const Other = ({ location, data }) => {
  const {
    allFile: { edges },
  } = data

  const images = edges.map(edge => {
    const img = edge.node.childMarkdownRemark.frontmatter.thumbnail
    const description = edge.node.childMarkdownRemark.frontmatter.desc
    return {
      description,
      id: img.childImageSharp.id,
      src: img.childImageSharp.fluid.src,
    }
  })

  return (
    <Layout title="Other" heading="other" location={location}>
      <Section>
        <p>I also do things that are not related to programming.</p>
        <p>
          Rock and ice climbing, skiing and hiking are some of my favourite
          passions and hobbies. Sometimes I take pictures of my adventures and
          post them on{" "}
          <LinkExt href="https://www.instagram.com/gunnnnii/">
            Instagram
          </LinkExt>
          .
        </p>
      </Section>
      <Section>
        <p>Here are a few good moments I've captured</p>
        <Carousel images={images} />
      </Section>
    </Layout>
  )
}

export default Other

export const query = graphql`
  query PicturesOther {
    allFile(filter: { relativePath: {}, relativeDirectory: { eq: "other" } }) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              thumbnail {
                childImageSharp {
                  fluid(maxWidth: 600, quality: 95) {
                    src
                  }
                  id
                }
              }
              desc
            }
          }
        }
      }
    }
  }
`
