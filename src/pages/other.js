import React from "react"
import styled from "styled-components"
import { graphql } from 'gatsby'

import { gutter } from "../style_constants"

import Layout from "../components/layout"
import { LinkExt } from "../components/Link"
import {Carousel} from "../components/carousel"

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
    <>
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
    </>
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
                  fluid(maxHeight: 800, quality: 95) {
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
