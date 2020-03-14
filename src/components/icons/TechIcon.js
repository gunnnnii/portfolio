import React, { useContext } from 'react'
import ReactIcon from './ReactIcon'
import GatsbyIcon from './GatsbyIcon'
import NodeIcon from './NodeIcon'
import TypescriptIcon from './TypescriptIcon'
import SpringbootIcon from './SpringbootIcon'
import { ThemeContext } from 'styled-components'

export default ({icon, fill}) => {
    const {text} = useContext(ThemeContext)
    switch(icon) {
        case 'react':
            return <ReactIcon fill={text} />
        case 'gatsby':
            return <GatsbyIcon fill={text} />
        case 'springboot':
            return <SpringbootIcon fill={text} />
        case 'node':
            return <NodeIcon fill={text} />
        case 'typescript':
            return <TypescriptIcon fill={text} />
        default:
            return null
    }
}