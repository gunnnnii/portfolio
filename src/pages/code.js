import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { FaGithub } from "react-icons/fa"
import styled from "styled-components"
import { LinkExt } from "../components/Link"
import { gutter, colors } from "../style_constants"

const projects = [
  {
    name: "smlygift",
    title: "cryptocurrency tipping bot",
    desc:
      "I created a tipping bot using the twitter API to allow tweeters to send each other tips through the Smileycoin protocol \n This project was the final assignment for my class on cryptocurrency",
    github: "https://github.com/gunnnnii/smlygift",
    to: "/code/smlygift",
  },
  {
    name: "hopon",
    title: "ridesharing application",
    desc:
      "I created an application to make ride sharing easy \n The backend uses Java Spring and the frontend uses ReactJS and LeafletJS",
    github: "https://github.com/HBV501G-group19",
    to: "/code/hopon",
  },
  {
    name: "store",
    title: "simple storefront",
    desc:
      "First ‘large’ React project I did. This is a simple storefront. \n This was the final project in my web dev class",
    github: "https://github.com/gunnnnii/vef2-2019-h2",
    to: "/code/store",
  },
]

const Cards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: ${gutter};

  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`

const CardContainer = styled.div`
  background: white;
  display: grid;
  grid-template-rows: auto 1fr;
  box-sizing: content-box;
  padding: ${gutter};
  max-height: 15rem;

  color: ${colors.darkBlue};

  & a {
    text-decoration: none;
  }

  & .__github {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    background-size: 0;
  }

  &:hover h2 {
    background-position: 0 0;
  }
`

const CardHeading = styled.h2`
  background-image: ${props => `linear-gradient(
    180deg,
    ${colors.brightHighlight} 0,
    ${colors.brightHighlight}
  )`};
  background-position: 0 1rem;
  background-size: 100%;
  transition: background-position 0.2s 0.1s;
  background-repeat: no-repeat;
  display: inline;
  &:hover {
    background-position: 0 0;
  }
`

const CardContent = ({ title, description }) => (
  <div>
    <CardHeading>{title}</CardHeading>
    <p>{description}</p>
  </div>
)

const Card = ({ content }) => (
  <CardContainer>
    <Link to={content.to}>
      <CardContent title={content.title} description={content.desc} />
    </Link>
    <LinkExt className="__github" href={content.github}>
      <FaGithub />
    </LinkExt>
  </CardContainer>
)

const Code = ({ location, match }) => (
  <Layout location={location} match={match}>
    <SEO title="Code" />
    <Cards>
      {projects.map(project => (
        <Card content={project} />
      ))}
      {projects.slice(1).map(project => (
        <Card content={project} />
      ))}
    </Cards>
  </Layout>
)

export default Code
