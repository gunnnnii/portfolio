import React from "react"

import styled from "styled-components"
import { Link } from "../components/Link"

const LinkList = styled.ul`
  list-style: none;
  font-size: 4rem;
  font-weight: 700;
`

const IndexPage = () => (
  <>
    <LinkList>
      <li>
        <Link wide to="/code">
          code
        </Link>
      </li>
      <li>
        <Link wide to="/about">
          about me
        </Link>
      </li>
      <li>
        <Link wide to="/other">
          other
        </Link>
      </li>
    </LinkList>
  </>
)

export default IndexPage
