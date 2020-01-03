import { useState, useEffect, useCallback } from "react"

export const useLocalStorage = (key, val) => {
  const [data, setData] = useState(val)

  const checkStorage = useCallback(
    e => {
      console.log("checking", e)
      if (e.storageArea === window && window.localStorage) {
        if (key === e.key && e.newValue) {
          setData(JSON.parse(e.newValue))
        }
      }
    },
    [key]
  )

  useEffect(() => {
    const current = localStorage.getItem(key)
    console.log(JSON.parse(current))
    if (current == null && val != null) {
      localStorage.setItem(key, JSON.stringify(val))
    }

    if (current) {
      setData(JSON.parse(current))
    }
    console.log(localStorage)
    window.addEventListener("storage", checkStorage)

    return () => window.removeEventListener("storage", checkStorage)
  }, [key, val, checkStorage])

  const removeItem = () => localStorage && localStorage.removeItem(key)
  const setItem = newVal => {
    if (localStorage) localStorage.setItem(key, JSON.stringify(newVal))
    setData(newVal)
  }

  return [data, setItem, removeItem]
}
