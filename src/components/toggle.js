import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { colors } from "../style_constants"
import { MdBrightness5, MdBrightness3 } from "react-icons/md"
import { IconContext } from "react-icons"

const Checkbox = styled.input`
  visibility: hidden;
  display: none;
`

const ToggleTrack = styled.div`
  width: 45px;
  height: 30px;
  border: 5px solid
    ${({ theme }) =>
      theme.mode === "dark" ? colors.brightBlue : colors.darkBlue};
  border-radius: 15px;
  background: transparent;

  transition: all 0.1s linear;
`

const ToggleSwitch = styled.div`
  width: 25px;
  height: 25px;
  margin: -1px;
  color: ${({ theme }) =>
    theme.mode === "dark" ? colors.darkBlue : colors.brightBlue};
  border-radius: 20px;
  background-color: ${({ theme }) =>
    theme.mode === "dark" ? colors.brightBlue : colors.darkBlue};

  transform: translateX(${({ isChecked }) => (isChecked ? 0 : "12.5px")});
  transition: all 0.1s ease-in-out;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  & > svg {
    position: absolute;
    padding: 5px;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
`

export const Toggle = ({ init, icons, onCheck }) => {
  const [isChecked, setChecked] = useState()
  const onChange = e => {
    const toggled = !isChecked
    setChecked(toggled)
    onCheck(toggled)
  }

  useEffect(() => {
    setChecked(init)
  }, [init])

  const Icon = isChecked ? icons.checked : icons.unchecked

  return (
    <div onClick={onChange}>
      <ToggleTrack>
        <ToggleSwitch isChecked={isChecked}>
          <IconContext.Provider value={{ size: "25px" }}>
            <Icon />
          </IconContext.Provider>
        </ToggleSwitch>
      </ToggleTrack>
      <Checkbox checked={isChecked} type="checkbox" />
    </div>
  )
}
