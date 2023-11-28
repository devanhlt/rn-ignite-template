import Sound from "react-native-sound"

const beep = new Sound("beep.mp3", Sound.MAIN_BUNDLE)

export function playBeep() {
  beep.setVolume(0.7)
  beep.play()
}
