import React from "react"
import styled from "styled-components"
import { Link } from "./Link"
import { HorizontalList } from "./horizontalList"

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

export const Header = ({ children }) => (
  <HeaderContainer>{children}</HeaderContainer>
)

export const Navigation = ({ pages }) => {
  return (
    <nav>
      <LinkList>
        <li>
          <Link
            to="/"
            activeStyle={{
              backgroundPosition: "0 0",
            }}
          >
            home
          </Link>
        </li>
        {pages.map(page => (
          <li key={page}>
            <Link
              to={`/${page}`}
              activeStyle={{
                backgroundPosition: "0 0",
              }}
              partiallyActive
            >
              {page}
            </Link>
          </li>
        ))}
      </LinkList>
    </nav>
  )
}
