/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

const React = require("react")
const { Theme } = require("./src/context/theme.js")
const Layout = require("./src/components/layout.js").default

exports.wrapRootElement = ({ element, props }) => (
  <Theme {...props}>{element}</Theme>
)

const titles = {
  code: "code",
  about: "about me",
  other: "other"
}

const getTitle = (path = "") => {
  const pathSteps = path.split("/").map(p => p.replace(/\//g, "")).filter(Boolean)
  if (titles[pathSteps[0]] == null) return "404 - Page does not exist"
  const slug = pathSteps.pop()
  return titles[slug]
}

exports.wrapPageElement = ({element, props}) => {
  if (props.path === "/") 
    return <Layout title="home" heading="gunnar ingi" {...props}>{element}</Layout>
  else {
    const title = getTitle(props.path)
    return <Layout title={title} heading={title} {...props}>{element}</Layout>
  }
}
