import React, { useEffect, useRef } from "react"
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

  & > li {
    margin-top: 0;
    margin-bottom: 0;
  }

  & > li:first-child, & > li:last-child {
    margin-top: 0;
    margin-bottom: 0;
  }
`

const HeaderLink = styled(Link)`
  display: inline-block;
  transition: background-position 0.2s, width 0.2s ease-out;
`

const HeaderLi = styled.li`
  overflow: hidden;
  text-overflow: ellipsis;
  text-overflow: "";

  transition: flex-basis 0.2s ease-out;
  & > .active {
    background-position: 0 0;
  }
`

const HeaderLinkList = styled(LinkList)`
  display: inline-flex;
`

export const Header = ({ children }) => (
  <HeaderContainer>{children}</HeaderContainer>
)

const NavbarLink = ({active = false, partiallyActive = true, page, to}) => {
  const linkRef = useRef(null)
  const liRef = useRef(null)

  useEffect(() => {
    if (liRef.current) {
      const li = liRef.current;
      const link = linkRef.current;

      const isSmall = window && window.innerWidth <= breakpoints.small
      if (isSmall) {
        if (active) {
          li.style.flexBasis = `${link.scrollWidth}px`;
        } else {
          li.style.flexBasis = '1.4ch';
        }
      }
    }
  }, [active])

  return (
    <HeaderLi
      ref={liRef}
      active={active}
    >
      <HeaderLink
        ref={linkRef}
        to={`/${to || page}`}
        activeClassName="active"
        partiallyActive={partiallyActive}
      >
        {page}
      </HeaderLink>
    </HeaderLi>
  )
}

export const Navigation = ({ location: {pathname}, pages }) => (
  <nav>
    <HeaderLinkList>
      <NavbarLink 
        to={"/"}
        page="home"
        partiallyActive={false}
      />
      {pages.map(page => (
        <NavbarLink 
          key={page}
          active={pathname.split("/")[1] === page}
          page={page}
        />
      ))}
    </HeaderLinkList>
  </nav>
)