import React from "react"
import styled from "styled-components"
import { gutter, breakpoints } from "../style_constants"
import { LinkExt } from "../components/Link"

const Section = styled.section`
  margin: ${gutter} 0;
`

const Ul = styled.ul`
  list-style: none;
`

const BulletList = styled.ul`
  list-style: none;
  & li::before {
    content: ">";
    font-weight: 900;
    margin-right: 0.25rem;
  }
`

const Li = styled.li`
  margin: ${gutter} 0;

  &:first-child {
    margin-top: 0;
  }
`

const Content = styled.div`
  border-left: 0.5rem solid ${props => props.theme.text};
  padding-left: 0.5rem;
`

const GridList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  list-style: none;

  & > li {
    margin: 0.25rem 0;
  }

  @media (max-width: ${breakpoints.small}px) {
    border-left: 0.5rem solid ${props => props.theme.text};
    padding-left: 0.5rem;
    grid-template-columns: 1fr;

    & > li::before {
      content: ">";
      font-weight: 900;
      margin-right: 0.25rem;
    }
  }
`

const Heading = styled.h2`
  font-size: 1.5em;
`

const About = ({ location }) => {
  return (
    <>
      <Section>
        <Heading>Hey there, I'm Gunnar.</Heading>
        <p>
          I'm a student learning computer science at the{" "}
          <LinkExt href="https://hi.is/">University of Iceland</LinkExt>.
        </p>
        <p>I like building stuff for the web and being outdoors.</p>
      </Section>
      <Section>
        <h2>Experience</h2>
        <Ul>
          <Li>
            <h3>Internship at Tempo</h3>
            <Content>
              <p>
                I interned at{" "}
                <LinkExt href="https://www.tempo.io/">Tempo</LinkExt> in the
                summer of 2019.
              </p>
              <h4>Stuff I did there</h4>
              <BulletList>
                <li>
                  I helped implement sorting functionality for a variety of data
                  in Tempo reports
                </li>
                <li>
                  Visualized data with charts in multiple Jira gadgets with
                  Recharts and Nivo
                </li>
                <li>Wrote end-to-end tests in Cypress for Tempo Cloud</li>
                <li>
                  This semester(spring 2020) I have been working on my final
                  project with Tempo. Developing a CLI to generate boilerplate
                  for Javascript modules with the focus on providing a great,
                  zero-config developer experience.{" "}
                  <small>(Not a part of the internship)</small>
                </li>
              </BulletList>
            </Content>
          </Li>
          <Li>
            <h3>Teachers Assistant - Software Development</h3>
            <Content>
              <p>
                I'm currently a TA in a course on software development. The
                course focuses on introducing students to best practices in
                agile software development through a single big project the
                students work on over the semester. My job is mostly to consult
                students on their project.
              </p>
            </Content>
          </Li>
          <Li>
            <h3>Teachers Assistant - Web Development 1</h3>
            <Content>
              <p>
                I was a TA in UI's intro to web development course. The course
                went into the foundations of HTML, CSS and Javascript, as well
                as collaboration through Git.
              </p>
            </Content>
          </Li>
          <Li>
            <h3>Teachers Assistant - Computer Science 2</h3>
            <Content>
              <p>
                I was a TA in a course called Computer Science 2. The course
                mainly focuses on data structures and algorithms in a
                programming context
              </p>
              <p>Languages used in the course were C and Java</p>
            </Content>
          </Li>
        </Ul>
      </Section>
      <Section>
        <h2>Skills</h2>
        <GridList>
          <li>HTML</li>
          <li>CSS</li>
          <li>Javascript ES6</li>
          <li>ReactJS</li>
          <li>LeafletJS</li>
          <li>Jest, Enzyme and Cypress</li>
          <li>Express</li>
          <li>Java</li>
          <li>Java Spring</li>
          <li>SQL</li>
          <li>
            C and C++ <small>(just a bit)</small>
          </li>
          <li>
            ReasonML <small>(just a bit)</small>
          </li>
        </GridList>
      </Section>
      <Section>
        <h2>Let's Make Something</h2>
        <p style={{ marginBottom: "2rem" }}>
          Feel free to drop me a message if you have any questions, or want to
          connect
        </p>

        <LinkExt href="mailto:gis20@hi.is">gis20@hi.is</LinkExt>
      </Section>
    </>
  )
}

export default About
