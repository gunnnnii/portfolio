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
  }

  html {
    font-size: 24px;
    font-weight: 500;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  h1 {
    font-size: 3rem;
    font-weight: 900;
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

const Layout = ({ children }) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const title = siteMetadata.title

  return (
    <ThemeProvider theme={{ mode: "dark" }}>
      <GlobalStyle />
      <Grid>
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
