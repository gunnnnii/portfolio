import React, {useEffect, useState, useRef} from 'react'
import styled from 'styled-components'

const Slider = styled.div`
  margin: 1rem 0;
  width: 100%;
  display: flex;
  text-align: center;
  overflow: hidden;

  align-self: center;

  position: relative;

&::before {
  content: "";
  z-index: 1000;
  opacity: 0%;

  position: absolute;
  top: 50%;
  width: 3rem;
  height: 3rem;
  right: 1px;
  background: transparent;
  background-image: url('/assets/arrow.svg');
  background-size: contain;
  border: none;
  color: transparent;

  left: 0;
  transform: scaleX(-1);

  transition: opacity 0.3s ease-out;
}

&:hover {
  &::before, &::after{
    opacity: 25%;
  }
}

&::after {
  content: "";
  z-index: 1000;
  opacity: 0%;

  position: absolute;
  top: 50%;
  width: 3rem;
  height: 3rem;
  right: 1px;
  background: transparent;
  background-image: url('/assets/arrow.svg');
  background-size: contain;
  border: none;
  color: transparent;
  
  right: 0;

  transition: opacity 0.3s ease-out;
}
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

  & > .slide-button {
    z-index: 1001;
    position: absolute;
    top: 0%;
    bottom: 0%;
    width: 45%;
    border: none;
    color: transparent;
    background: transparent;
  }

  & > .slide-button.next {
    right: 0;
  }

  & > .slide-button.prev {
    left: 0;
  }

  & > .slide-button:focus {
    border: none;
    outline: none;
  }
`

const Slide = ({ image, scroll }) => {
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

  return (
    <SlideContainer
      ref={slideRef}
      id={image.id}
      key={image.id}
      onKeyUp={keyhandler}
      id={image.id}
    >
      <img src={image.src} alt={image.description} />
      <button className="slide-button prev" onClick={prev}>
        prev
      </button>
      <button className="slide-button next" onClick={next}>
        next
      </button>
    </SlideContainer>
  )
}

// TODO: make it so you can jump over multiple images when pressing
//       the next/prev slide button consecutively
export const Carousel = ({ images }) => {
  const [position, setPosition] = useState(0)

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
          />
        ))}
      </SlideList>
    </Slider>
  )
}