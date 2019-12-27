import React from "react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { MdMessage } from "react-icons/md"
import styled from "styled-components"
import { IconContext } from "react-icons"
import { gutter } from "../style_constants"
import { LinkExt } from "./Link"
import { HorizontalList } from "./horizontalList"

const StyledFooter = styled.footer``

const IconList = styled(HorizontalList)`
  margin-top: 2rem;
`

const $IconLink = styled(LinkExt)`
  &:after {
  }
`

export const Footer = () => (
  <StyledFooter>
    <IconContext.Provider value={{ size: "4rem" }}>
      <IconList fontSize={4}>
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
