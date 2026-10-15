import { useCallback, useEffect, useRef, useState } from 'react'

/** Returns a ref callback and the element's current height in px (0 when nothing is attached). */
export function useElementHeight<T extends HTMLElement>(): [(el: T | null) => void, number] {
  const [height, setHeight] = useState(0)
  const observer = useRef<ResizeObserver | null>(null)

  const ref = useCallback((el: T | null) => {
    observer.current?.disconnect()
    observer.current = null
    if (!el) {
      setHeight(0)
      return
    }
    setHeight(el.getBoundingClientRect().height)
    observer.current = new ResizeObserver(() => setHeight(el.getBoundingClientRect().height))
    observer.current.observe(el)
  }, [])

  useEffect(() => () => observer.current?.disconnect(), [])

  return [ref, Math.round(height)]
}
