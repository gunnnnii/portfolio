/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import styled, { createGlobalStyle, ThemeProvider } from "styled-components"
import { colors, gutter } from "../style_constants"
import { Footer } from "./footer"
import { Header, Navigation } from "./header"

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    src: url('https://fonts.googleapis.com/css?family=Roboto:500,700,900&display=swap');
    font-style: normal;
    font-weight: 500 700 900;
    font-display: fallback;
  }

  * {
    margin: 0;
    padding: 0;
    font-weight: 500;
  }

  html {
    font-size: 24px;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  h1 {
    font-size: 3rem;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 900;
  }

  a {
    color: inherit;
  }

  body {
    overflow-y: scroll;
    padding: calc(${gutter} * 3);
    font-family: 'Roboto', sans-serif;
    background: ${props =>
      props.theme.mode === "light" ? colors.brightBlue : colors.darkBlue};
    color: ${props =>
      props.theme.mode === "light" ? colors.darkBlue : colors.brightBlue};
  }

`

const Grid = styled.div`
  display: grid;
  max-width: 1000px;
  margin: 0 auto;
`
const Heading = styled.h1`
  font-size: 4rem;
  cursor: pointer;
`

const Layout = ({ heading = "gunnar ingi", location, children }) => {
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
    <ThemeProvider theme={{ mode: "dark" }}>
      <GlobalStyle />
      <Grid>
        <Header>
          {location ? (
            <>
              <Navigation pages={pages} />
              <h1>{location.pathname.replace("/", "")}</h1>
            </>
          ) : (
            <Heading>{heading}</Heading>
          )}
        </Header>
        <main>{children}</main>
        <Footer />
      </Grid>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
