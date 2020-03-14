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

const getTitle = path => {
  return titles[path]
}

exports.wrapPageElement = ({element, props}) => {
  if (props.path === "/") 
    return <Layout title="home" {...props}>{element}</Layout>
  else {
    const title = getTitle(props.path.replace(/\//g, ""))
    return <Layout title={title} heading={title} {...props}>{element}</Layout>
  }
}
