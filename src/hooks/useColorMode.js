import { useLocalStorage } from "./useLocalStorage"

export const useColorMode = () => {
  const darkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches

  const [mode, setMode] = useLocalStorage(
    "color_mode",
    darkMode ? "dark" : "light"
  )

  return [mode, setMode]
}
