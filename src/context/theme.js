import React, { useState, useEffect } from "react"
import { ThemeProvider, createGlobalStyle } from "styled-components"
import { breakpoints, colors, gutter } from "../style_constants"

export const Fonts = createGlobalStyle`
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

export const GlobalStyle = createGlobalStyle`
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

  #___gatsby {
    zoom: 1.0;
    
    @media (max-width: ${breakpoints.large}px) {
      zoom: 0.9;
    }

    @media (max-width: ${breakpoints.medium}px) {
      zoom: 0.6;
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
    background: ${props => props.theme.background};
    color: ${props => props.theme.text};
  }
`

// 00:00-06:00 / night / 06:00-17:00 / morning / 17:00-22:00 / evening / 22:00-00:00 / night /
export const Theme = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const hour = new Date().getHours()
    if (hour > 6 && hour <= 17) {
      return colors.morning
    } else if (hour > 17 && hour < 22) {
      return colors.evening
    } else {
      return colors.night
    }
  })

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour > 6 && hour <= 17) {
      setMode(colors.morning)
    } else if (hour > 17 && hour < 22) {
      setMode(colors.evening)
    } else {
      setMode(colors.night)
    }
  }, [])

  return (
    <ThemeProvider theme={mode}>
      <Fonts />
      <GlobalStyle />
      {children}
    </ThemeProvider>
  )
}
