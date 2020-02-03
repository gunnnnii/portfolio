/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

const React = require("react")
const { Theme } = require("./src/context/theme.js")
exports.wrapRootElement = ({ element, props }) => (
  <Theme {...props}>{element}</Theme>
)
