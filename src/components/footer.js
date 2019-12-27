import React from "react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { MdMessage } from "react-icons/md"
import styled from "styled-components"
import { IconContext } from "react-icons"
import { gutter } from "../style_constants"
import { LinkExt } from "./Link"

const StyledFooter = styled.footer``

const IconList = styled.ul`
  display: flex;
  margin-top: 2rem;
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
    background-position: 0 3rem;
    font-size: 4rem;
  }
`

const $IconLink = styled(LinkExt)`
  &:after {
  }
`

export const Footer = () => (
  <StyledFooter>
    <IconContext.Provider value={{ size: "4rem" }}>
      <IconList>
        <li>
          <LinkExt href="https://github.com/gunnnnii">
            <FaGithub />
          </LinkExt>
        </li>
        <li>
          <LinkExt href="https://www.linkedin.com/in/gunnar-ingi-stef%C3%A1nsson-1b906a182/">
            <FaLinkedin />
          </LinkExt>
        </li>
        <li>
          <LinkExt href="mailto:gis20@hi.is">
            <MdMessage />
          </LinkExt>
        </li>
      </IconList>
    </IconContext.Provider>
  </StyledFooter>
)
