import styled from "styled-components"
import { gutter, breakpoints } from "../style_constants"

export const HorizontalList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;

  & > li {
    margin: ${gutter} calc(${gutter} / 2);
  }

  & > li:first-child {
    margin: ${gutter} 0;
    margin-right: calc(${gutter} / 2);
  }

  & > li:last-child {
    margin: ${gutter} 0;
    margin-left: calc(${gutter} / 2);
  }

  & > * > a {
    background-position: 0 ${({ fontSize = 1 }) => fontSize}rem;
    font-size: calc(1rem * ${({ fontSize = 1 }) => fontSize});

    @media (max-width: ${breakpoints.small}px) {
      background-position: 0 ${({ fontSize = 3 }) => fontSize}rem;
      font-size: calc(1rem * ${({ fontSize = 3 }) => fontSize});
    }
  }
`
