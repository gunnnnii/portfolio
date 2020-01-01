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
import { colors, gutter, breakpoints } from "../style_constants"
import { Footer } from "./footer"
import { Header, Navigation } from "./header"
import { useWindowWidth } from "../hooks/useWindowWidth"

const Fonts = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: local('Roboto Medium'), local('Roboto-Medium'), local('sans-serif-medium'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fBBc4AMP6lQ.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: local('Roboto Bold'), local('Roboto-Bold'), local('sans-serif'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBBc4AMP6lQ.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 900;
    font-display: swap;
    src: local('Roboto Black'), local('Roboto-Black'), local('sans-serif-black'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmYUtfBBc4AMP6lQ.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
`

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-weight: 500;
  }

  html {
    font-size: 24px;
    box-sizing: border-box;

    height: 100%;
    width: 100%;
    @media (max-width: ${breakpoints.small}px) {
      font-size: 14px;
    }
  }

  #___gatsby, #gatsby-focus-wrapper {
    height: 100%;
    width: 100%;
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
    height: 100%;
    width: 100%;
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
  height: 100%;
  max-width: 1000px;
  margin: 0 auto;
  grid-template-rows: auto 1fr auto;

  @media (max-width: ${breakpoints.small}px) {
    grid-template-columns: 100%;
  }

  & > main {
    height: 100%;
    width: 100%;
  }
`
const Heading = styled.h1`
  font-size: 4rem;
  @media (max-width: ${breakpoints.small}px) {
    font-size: 1rem;
  }
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
    <ThemeProvider theme={{ mode: "light" }}>
      <Fonts />
      <GlobalStyle />
      <Grid>
        <Header>
          {location ? (
            <>
              <Navigation pages={pages} />
              <h1>{heading || location.pathname.replace("/", "")}</h1>
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
