import React, { useRef, useEffect, useState } from "react"
import Layout from "../components/layout"
import { LinkExt } from "../components/Link"
import styled from "styled-components"
import { gutter } from "../style_constants"

const Section = styled.section`
  margin: ${gutter} 0;
  display: flex;
  flex-direction: column;
  &:last-child {
    margin-bottom: 0;
  }

  &:first-child {
    margin-top: 0;
  }
`

const Slider = styled.div`
  margin: 1rem 0;
  width: calc(50vw + 2rem);
  display: flex;
  text-align: center;
  overflow: hidden;

  align-self: center;
`

const SlideList = styled.ul`
  list-style: none;
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;

  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  width: 100%;
  &::-webkit-scrollbar {
    height: 1rem;
  }
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.text};
  }
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.highlight};
  }
`

const SlideContainer = styled.li`
  min-width: 100%;
  min-height: 600px;
  margin: 0;
  scroll-snap-align: start;

  position: relative;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  & > img {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  & > img:focus {
    border: 1px solid red;
  }

  & > .next {
    position: absolute;
    top: 45%;
    bottom: 45%;
    right: 1px;
    background: black;
  }

  & > .prev {
    position: absolute;
    top: 45%;
    bottom: 45%;
    left: 0rem;
    background: black;
  }
`

const Slide = ({ image, scroll, scroll2 }) => {
  const slideRef = useRef(null)

  const next = () => {
    if (slideRef && slideRef.current) {
      console.log(slideRef.current.offsetWidth)
      scroll(slideRef.current.offsetWidth)
    }
  }

  const prev = () => {
    if (slideRef && slideRef.current) {
      console.log(slideRef.current.offsetWidth)
      scroll(-slideRef.current.offsetWidth)
    }
  }

  const keyhandler = e => {
    if (e.key === "ArrowLeft") {
      prev()
    }
    if (e.key === "ArrowRight") {
      next()
    }
  }

  const next2 = () => {
    scroll2(slideRef.current)
  }

  return (
    <SlideContainer
      ref={slideRef}
      id={image.id}
      key={image.id}
      onKeyUp={keyhandler}
      id={image.id}
    >
      <img src={image.src} alt={image.description} />
      <button className="prev" onClick={prev}>
        prev
      </button>
      <button className="next" onClick={next}>
        next
      </button>
    </SlideContainer>
  )
}

const Carousel = ({ images }) => {
  // want to move the scrolling functionality into the carousel,
  // only have the slide provide a ref to it as an argument
  const [position, setPosition] = useState(0)
  const [slide, setSlide] = useState(null)

  const carouselReducer = (state, action) => {
    switch (action.type) {
      case "NEXT":
        if (state.position === images.length - 1)
          return { ...state, position: 0 }
        else return { ...state, position: state.position + 1 }
      case "PREV":
        if (state.position === 0)
          return { ...state, position: images.length - 1 }
        else return { ...state, position: state.position - 1 }
    }
  }

  const [state, dispatch] = useReducer(carouselReducer, {
    position: 0,
  })

  useEffect(() => {
    const img = document.getElementById(images[position].id)
    img.focus()
  }, [position, images])

  useEffect(() => {}, [position])

  const sliderRef = useRef(null)
  const scroll = offset => {
    const { current: slider } = sliderRef
    if (slider) {
      const { scrollWidth, scrollLeft } = slider
      const isLeftEdge = position === 0
      const isRightEdge = position === images.length - 1

      if (isLeftEdge) {
      }

      if (scrollLeft + offset < 0)
        slider.scrollTo({ left: scrollWidth, behavior: "smooth" })
      // don't know why scrollwidth is 1px bigger then expected..
      if (scrollLeft + offset >= scrollWidth - 1)
        slider.scrollTo({ left: 0, behavior: "smooth" })
      else slider.scrollTo({ left: scrollLeft + offset, behavior: "smooth" })

      setPosition(p => {
        const newPos = offset > 0 ? p + 1 : p - 1
        if (newPos < 0) return images.length - 1
        if (newPos > images.length - 1) return 0
        return newPos
      })
    }
  }

  return (
    <Slider>
      <SlideList ref={sliderRef}>
        {images.map(image => (
          <Slide
            key={image.id}
            image={image}
            scroll={scroll}
            scroll2={setSlide}
          />
        ))}
      </SlideList>
    </Slider>
  )
}

const Other = ({ location, data }) => {
  const {
    allFile: { edges },
  } = data

  const images = edges.map(edge => {
    const img = edge.node.childMarkdownRemark.frontmatter.thumbnail
    const description = edge.node.childMarkdownRemark.frontmatter.desc
    return {
      description,
      id: img.childImageSharp.id,
      src: img.childImageSharp.fluid.src,
    }
  })

  return (
    <Layout title="Other" heading="other" location={location}>
      <Section>
        <p>I also do things that are not related to programming.</p>
        <p>
          Rock and ice climbing, skiing and hiking are some of my favourite
          passions and hobbies. Sometimes I take pictures of my adventures and
          post them on{" "}
          <LinkExt href="https://www.instagram.com/gunnnnii/">
            Instagram
          </LinkExt>
          .
        </p>
      </Section>
      <Section>
        <p>Here are a few good moments I've captured</p>
        <Carousel images={images} />
      </Section>
    </Layout>
  )
}

export default Other

export const query = graphql`
  query PicturesOther {
    allFile(filter: { relativePath: {}, relativeDirectory: { eq: "other" } }) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              thumbnail {
                childImageSharp {
                  fluid(maxWidth: 600, quality: 95) {
                    src
                  }
                  id
                }
              }
              desc
            }
          }
        }
      }
    }
  }
`
