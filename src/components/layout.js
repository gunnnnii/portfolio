/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import styled from "styled-components"
import { breakpoints } from "../style_constants"
import { Footer } from "./footer"
import { Header, Navigation } from "./header"
import SEO from "./seo"

const Grid = styled.div`
  display: grid;
  height: 100%;
  max-width: 1000px;
  margin: 0 auto;
  grid-template-rows: auto 1fr auto;

  @media (max-width: ${breakpoints.small}px) {
    grid-template-columns: 100%;
    font-size: 2rem;
  }

  & > main {
    height: 100%;
    width: 100%;
  }
`
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

const Flex = styled.div`
  display: flex;
  flex-direction: column;
`

const Layout = ({ title, heading, location, children }) => {
  const {
    allSitePage: { edges = [] },
  } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      allSitePage {
        edges {
          node {
            id
            path
          }
        }
      }
    }
  `)

  const pages = edges
    .map(({ node }) => node.path)
    .filter(
      path => !path.match(/\/.+\/.+/) && !path.includes("404") && path !== "/"
    )
    .map(page => page.replace(/\//g, ""))
  

  return (
    <>
      <SEO title={title} />
      <Grid>
        <Header>
          <Flex>
            {location.pathname !== "/" ? (
              <>
                <Navigation location={location} pages={pages} />
                {heading && (
                  <Heading fontSizeSmall={4}>
                    {heading || location.pathname.replace("/", "")}
                  </Heading> 
                )}
              </>
            ) : (
              <Heading fontSizeSmall={2}>{heading}</Heading>
            )}
          </Flex>
        </Header>
        <main>{children}</main>
        <Footer />
      </Grid>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
