import { useLayoutEffect, useState, useRef } from "react"

const calculateWidth = () =>
  window.innerWidth && document.documentElement.clientWidth
    ? Math.min(window.innerWidth, document.documentElement.clientWidth)
    : window.innerWidth ||
      document.documentElement.clientWidth ||
      document.getElementsByTagName("body")[0].clientWidth

export const useWindowWidth = () => {
  const [width, setWidth] = useState(0)
  const update = useRef({
    isUpdating: false,
    timeout: null
  })
  useLayoutEffect(() => {
    const updateWidth = delay => () => {
      if (!delay) setWidth(calculateWidth())
      else {
        if (update.current) return

        update.current.isUpdating = true

        update.current.timeout = setTimeout(() => {
          update.current.isUpdating = false
          setWidth(calculateWidth())
        }, [delay])
      }
    }

    window.addEventListener("resize", updateWidth(300))

    updateWidth(0)()
    return () => {
      window.removeEventListener("resize", updateWidth)
      clearTimeout(update.current.timeout)
    }
  }, [])
  return width
}
