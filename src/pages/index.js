import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styled, { ThemeConsumer } from "styled-components"
import { colors } from "../style_constants"
import { Link } from "../components/Link"

const Header = styled.h1`
  font-size: 4rem;
  cursor: pointer;
`
const LinkList = styled.ul`
  list-style: none;
  font-size: 2rem;
  font-weight: 700;
  & > * > a {
    background-position: 0 2rem;
  }
`

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Header>gunnar ingi</Header>
    <LinkList>
      <li>
        <Link wide to="/">
          code
        </Link>
      </li>
      <li>
        <Link wide to="/">
          resume
        </Link>
      </li>
      <li>
        <Link wide to="/">
          climbing
        </Link>
      </li>
      <li>
        <Link wide to="/">
          other
        </Link>
      </li>
    </LinkList>
  </Layout>
)

export default IndexPage
