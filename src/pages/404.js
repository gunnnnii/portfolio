import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "../components/Link"
import styled from "styled-components"

const Header = styled.h1`
  font-size: 4rem;
  cursor: pointer;
`

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Header>not found</Header>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    <Link to="/">Back home</Link>
  </Layout>
)

export default NotFoundPage
