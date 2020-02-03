import React from "react"

import Layout from "../components/layout"
import { Link } from "../components/Link"

const NotFoundPage = () => (
  <Layout title="404: Not found" heading="not found">
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    <Link to="/">Back home</Link>
  </Layout>
)

export default NotFoundPage
