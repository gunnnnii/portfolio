import React from "react"

import Layout from "../components/layout"
import styled, { createGlobalStyle } from "styled-components"
import { Link } from "../components/Link"

const IndexStyle = createGlobalStyle`
  html {
    font-size: 24px;
  }
`

const LinkList = styled.ul`
  list-style: none;
  font-size: 2rem;
  font-weight: 700;
`

const IndexPage = () => (
  <Layout title="Home">
    <IndexStyle />
    <LinkList>
      <li>
        <Link wide to="/code">
          code
        </Link>
      </li>
      <li>
        <Link wide to="/about">
          about me
        </Link>
      </li>
      <li>
        <Link wide to="/other">
          other
        </Link>
      </li>
    </LinkList>
  </Layout>
)

export default IndexPage
