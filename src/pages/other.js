import React from "react"
import Layout from "../components/layout"
import { LinkExt } from "../components/Link"
import styled from "styled-components"
import { gutter } from "../style_constants"

const Section = styled.section`
  margin: ${gutter} 0;

  &:last-child {
    margin-bottom: 0;
  }

  &:first-child {
    margin-top: 0;
  }
`

const CarouselWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  max-width: 1000px;
  margin-top: ${gutter};
  border-bottom: calc(${gutter} / 2) solid ${({ theme }) => theme.highlight};
`

const Carousel = ({ images }) => {
  return (
    <CarouselWrapper>
      {images.map(image => (
        <img key={image.id} src={image.src} />
      ))}
    </CarouselWrapper>
  )
}

const Other = ({ location, data }) => {
  const {
    allFile: { edges },
  } = data

  const images = edges.map(edge => ({
    id: edge.node.childImageSharp.id,
    src: edge.node.childImageSharp.fluid.src,
    fluid: edge.node.childImageSharp.fluid,
  }))

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
    allFile(
      filter: { relativePath: {}, relativeDirectory: { eq: "images/other" } }
    ) {
      edges {
        node {
          childImageSharp {
            fluid(maxHeight: 600, quality: 90) {
              src
            }
          }
        }
      }
    }
  }
`
