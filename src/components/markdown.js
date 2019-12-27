import React from "react"
import RehypeReact from "rehype-react"
import styled from "styled-components"
import { LinkExt } from "../components/Link"
import { gutter, colors } from "../style_constants"

const Article = styled.article`
  margin: ${gutter} 0;
`
const Paragraph = styled.p`
  margin: ${gutter} auto;
`
const Image = styled.img`
  border-bottom: calc(${gutter} / 2) solid
    ${({ theme }) =>
      theme.mode === "light" ? colors.brightHighlight : colors.darkHighlight};
`
const Footnote = styled.sup`
  font-size: 0.5em;
`
const Footnotes = styled.aside`
  font-size: 0.75em;
  margin: ${gutter} 0;
`
const OrderedList = styled.ol``

const ItemContent = styled.div`
  display: flex;
  & p {
    margin: calc(${gutter} / 4);
  }
  & > .footnote-backref {
    background-position: 0 10rem;
  }
  &:hover .footnote-backref {
    background-position: 0 0;
  }
`

const ListItem = ({ children, ...rest }) => (
  <li {...rest}>
    <ItemContent>{children}</ItemContent>
  </li>
)
export const Markdown = ({ tree }) => {
  const render = new RehypeReact({
    createElement: React.createElement,
    components: {
      p: Paragraph,
      img: Image,
      sup: Footnote,
      div: Footnotes, // assuming there are no other divs :s -- doing this wraps an extra div around...
      hr: React.Fragment,
      ol: OrderedList,
      li: ListItem,
      a: LinkExt,
    },
  }).Compiler(tree)

  const [content] = render.props.children

  return <Article>{content.props.children}</Article>
}
