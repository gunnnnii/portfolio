import React from "react"

import Layout from "../components/layout"
import { Link } from "../components/Link"

const NotFoundPage = () => (
  <>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    <Link to="/">Back home</Link>
  </>
)

export default NotFoundPage
