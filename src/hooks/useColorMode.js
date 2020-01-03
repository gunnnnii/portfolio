import { useLocalStorage } from "./useLocalStorage"
import { useEffect, useState } from "react"

export const useColorMode = () => {
  const [darkMode, setDarkMode] = useState()

  useEffect(() => {
    setDarkMode(
      window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    )
  })
  const [mode, setMode] = useLocalStorage(
    "color_mode",
    darkMode ? "dark" : "light"
  )

  return [mode, setMode]
}
