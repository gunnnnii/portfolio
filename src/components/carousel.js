import React, { useRef} from 'react'
import styled from 'styled-components'
import {breakpoints} from '../style_constants'
const Slider = styled.div`
  margin: 1rem 0;
  width: 100%;
  display: flex;
  text-align: center;
  overflow: hidden;
  background: radial-gradient(circle at top, 
      ${props => props.theme.backdrop}, 
      ${props => props.theme.background}
    );
  align-self: center;

  position: relative;

  &::before, &::after {
    content: "";
    z-index: 1000;
    opacity: 0%;

    position: absolute;
    top: calc(50% - 1rem);
    width: 3rem;
    height: 3rem;
    right: 1px;
    background: transparent;
    background-image: url('/assets/arrow.svg');
    background-size: contain;
    border: none;
    color: transparent;

    transition: opacity 0.3s ease-out;
  }

  &:hover {
    &::before, &::after{
      opacity: 25%;
    }
  }

  &::before {
    transform: scaleX(-1);
    left: 0;
  }

  &::after {
    right: 0;
  }

  & .slide-button {
    z-index: 1001;
    position: absolute;
    top: 0%;
    bottom: 1rem;
    width: 45%;
    border: none;
    color: transparent;
    background: transparent;
  }

  @media (max-width: ${breakpoints.small}px) {
    & .slide-button {
        width: 10%;
    }
  }

  & .slide-button.next {
    right: 0;
  }

  & .slide-button.prev {
    left: 0;
  }

  & .slide-button:focus {
    border: none;
    outline: none;
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
    object-fit: contain;

    display: flex;
    align-items: flex-end;
  }
`

const Slide = ({ index, image }) => {
  return (
    <SlideContainer
      id={image.id}
      key={image.id}
    >
      <img loading={index > 2 ? 'lazy' : 'eager'} src={image.src} alt={image.description} />
    </SlideContainer>
  )
}

// TODO: focus management
export const Carousel = ({ images }) => {
  const scrollStatus = useRef({
    isScrolling: false,
    amount: 0
  })
  const sliderRef = useRef(null)

  const scrollTimeoutRef = useRef(null)

  const scroll = offset => {
    clearTimeout(scrollTimeoutRef.current)
    scrollStatus.current.amount += offset
    const { current: slider } = sliderRef
    scrollTimeoutRef.current = setTimeout(() => {
      let scrollTo = slider.scrollLeft + scrollStatus.current.amount;
      if (scrollTo >= slider.scrollWidth) {
        scrollTo -= slider.scrollWidth
      } else if (scrollTo < 0) {
        scrollTo += slider.scrollWidth
      }

      slider.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      })
      scrollStatus.current.amount = 0
    }, 100)
  }

  const next = () => {
    if (sliderRef.current) {
      const offset = sliderRef.current.scrollWidth / images.length
      scroll(offset)
    }
  }

  const prev = () => {
    if (sliderRef.current) {
      const offset = sliderRef.current.scrollWidth / images.length
      scroll(-offset)
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
    <Slider>
      <SlideList ref={sliderRef} onKeyUp={keyhandler}>
        <button className="slide-button prev" onClick={prev}>
          prev
        </button>
        {images.map((image, idx) => (
          <Slide
            index={idx}
            key={image.id}
            image={image}
            scroll={scroll}
          />
        ))}
        <button className="slide-button next" onClick={next}>
          next
        </button>
      </SlideList>
    </Slider>
  )
}