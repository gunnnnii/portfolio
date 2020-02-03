import React from "react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { MdMessage } from "react-icons/md"
import styled from "styled-components"
import { IconContext } from "react-icons"
import { LinkExt } from "./Link"
import { HorizontalList } from "./horizontalList"
import { breakpoints } from "../style_constants"
import { useWindowWidth } from "../hooks/useWindowWidth"

const StyledFooter = styled.footer`
  display: flex;
  align-items: flex-end;
  /* @media (max-width: ${breakpoints.medium}px) {
    margin: 0 auto;
  } */
`

const IconList = styled(HorizontalList)`
  margin-top: 2rem;
`

const HiddenP = styled.p`
  visibility: hidden;
  height: 0;
  width: 0;
`

export const Footer = () => {
  const width = useWindowWidth()
  const fontSize = width > breakpoints.small ? 4 : 2
  return (
    <StyledFooter>
      <IconContext.Provider value={{ size: `${fontSize}rem` }}>
        <IconList fontSize={fontSize}>
          <li>
            <LinkExt href="https://github.com/gunnnnii">
              <FaGithub />
              <HiddenP>Github</HiddenP>
            </LinkExt>
          </li>
          <li>
            <LinkExt href="https://www.linkedin.com/in/gunnar-ingi-stef%C3%A1nsson-1b906a182/">
              <FaLinkedin />
              <HiddenP>LinkedIn</HiddenP>
            </LinkExt>
          </li>
          <li>
            <LinkExt href="mailto:gis20@hi.is">
              <MdMessage />
              <HiddenP>gis20@hi.is</HiddenP>
            </LinkExt>
          </li>
        </IconList>
      </IconContext.Provider>
    </StyledFooter>
  )
}
