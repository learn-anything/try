import { useState, useEffect } from "react"
import { isClient } from "~/lib/utils"

export function useTouchSensor() {
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    const detectTouch = () => {
      setIsTouchDevice(
        isClient() &&
          (window.matchMedia?.("(hover: none) and (pointer: coarse)")
            ?.matches ||
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0),
      )
    }

    detectTouch()
    window.addEventListener("touchstart", detectTouch, false)

    return () => {
      window.removeEventListener("touchstart", detectTouch)
    }
  }, [])

  return isTouchDevice
}
