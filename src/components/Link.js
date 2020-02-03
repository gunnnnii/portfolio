import { Link as GatsbyLink } from "gatsby"
import styled, { css } from "styled-components"

const style = css`
  text-decoration: none;
  font-weight: 700;
  color: inherit;

  position: relative;
  z-index: 1;

  background-image: ${props => `linear-gradient(
    180deg,
    ${props.theme.highlight} 0,
    ${props.theme.highlight}
  )`};
  background-position: 0 1em;
  background-size: 100%;
  transition: background-position 0.2s;
  background-repeat: no-repeat;

  &:hover {
    background-position: 0 0;
  }
`

export const Link = styled(GatsbyLink)`
  ${style}
`
export const LinkExt = styled.a`
  ${style}
`
