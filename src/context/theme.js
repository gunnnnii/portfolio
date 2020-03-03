import React, { useState, useEffect, useRef } from "react"
import { ThemeProvider, createGlobalStyle } from "styled-components"
import { breakpoints, colors, gutter } from "../style_constants"

import "typeface-roboto"

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

const prefersDarkMode = () =>
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches

const prefersLightMode = () =>
  window.matchMedia && window.matchMedia("(prefers-color-scheme:light)").matches

// 00:00-06:00 / night / 06:00-17:00 / morning / 17:00-22:00 / evening / 22:00-00:00 / night /
export const Theme = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false)
  const [mode, setMode] = useState(colors.night)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    if (prefersDarkMode()) {
      setMode(colors.night)
    } else if (prefersLightMode()) {
      setMode(colors.morning)
    } else {
      const hour = new Date().getHours()
      if (hour > 6 && hour <= 17) {
        setMode(colors.morning)
      } else if (hour > 17 && hour < 22) {
        setMode(colors.evening)
      } else {
        setMode(colors.night)
      }
    }
  }, [hasMounted])

  if (!hasMounted) return null
  return (
    <ThemeProvider theme={mode}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  )
}
