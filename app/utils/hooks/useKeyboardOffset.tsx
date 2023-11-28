import { useEffect, useRef, useState } from "react"
import { EmitterSubscription, Keyboard } from "react-native"

export const useKeyboardOffsetChanged = () => {
  const [keyboardOffset, setKeyboardOffset] = useState(0)

  const onKeyboardShow = (event) => setKeyboardOffset(event.endCoordinates.height)
  const onKeyboardHide = () => setKeyboardOffset(0)

  const keyboardDidShowListener = useRef<EmitterSubscription>()
  const keyboardDidHideListener = useRef<EmitterSubscription>()

  useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener("keyboardDidShow", onKeyboardShow)
    keyboardDidHideListener.current = Keyboard.addListener("keyboardDidHide", onKeyboardHide)

    return () => {
      keyboardDidShowListener.current.remove()
      keyboardDidHideListener.current.remove()
    }
  }, [])

  return keyboardOffset
}
