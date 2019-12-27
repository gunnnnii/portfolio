import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"
import { Link } from "../components/Link"

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
    <LinkList>
      <li>
        <Link wide to="/code">
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
