import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "../components/Link"

const NotFoundPage = () => (
  <Layout heading="not found">
    <SEO title="404: Not found" />
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    <Link to="/">Back home</Link>
  </Layout>
)

export default NotFoundPage
