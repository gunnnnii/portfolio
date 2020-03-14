import React, { useEffect } from "react"
import styled from "styled-components"
import { Link } from "./Link"
import { HorizontalList } from "./horizontalList"

import { breakpoints } from '../style_constants'

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LinkList = styled(HorizontalList)`
  margin: 0;

  & > li,
  & > li:first-child,
  & > li:last-child {
    margin-top: 0;
    margin-bottom: 0;
  }
`

const HeaderLink = styled(Link)`
  display: inline-block;
  transition: all 0.2s ease-out;

  @media (max-width: ${breakpoints.small}px) {
    & {
      overflow: hidden;
      text-overflow: "";
      max-width: 1ch;
    }

    &:hover {
      max-width: initial;
    }
  }
`

export const Header = ({ children }) => (
  <HeaderContainer>{children}</HeaderContainer>
)

export const Navigation = ({ pages }) => (
  <nav>
    <LinkList>
      <li style={{ transition: "all 0.s ease-out"}}>
        <HeaderLink
          to="/"
          activeStyle={{
            backgroundPosition: "0 0",
            maxWidth: "initial"
          }}
        >
          home
        </HeaderLink>
      </li>
      {pages.map(page => (
        <li key={page}>
          <HeaderLink
            to={`/${page}`}
            activeStyle={{
              backgroundPosition: "0 0",
              maxWidth: "initial"
            }}
            partiallyActive
          >
            {page}
          </HeaderLink>
        </li>
      ))}
    </LinkList>
  </nav>
)