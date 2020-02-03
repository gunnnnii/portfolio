/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
const React = require("react")
const { Theme, GlobalStyle, Fonts } = require("./src/context/theme.js")
exports.wrapRootElement = ({ element, props }) => (
  <Theme {...props}>{element}</Theme>
)
