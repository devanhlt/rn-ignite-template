//   EXAMPLE
//   <CodeScanner
//   isCameraActive={active}
//   onCodeDetected={(code) => {
//     setActive(false)
//     Alert.alert("Title", "LOGGGG - " + code, [
//       {
//         text: "XONG",
//         onPress: () => {
//           setActive(true)
//         },
//       },
//     ])
//   }}
// />

import * as React from "react"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { ScannerProps } from "./scanner.props"
import { useRef, useState } from "react"
import { Camera } from "react-native-camera-kit"
import { playBeep } from "../../utils/sound"
import { Icon } from "../Icon"

const CAMERA = {
  width: "100%",
  aspectRatio: 1,
}
const CONTAINER = { width: "100%" }
const FLASH: ViewStyle = {
  position: "absolute",
  left: 12,
  top: 12,
  justifyContent: "center",
  alignItems: "center",
}

export function CodeScanner(props: ScannerProps) {
  const { onCodeDetected, isCameraActive, cameraStyle, useLaser = false } = props
  const camera = useRef()

  const onBarcodeScan = (event) => {
    if (isCameraActive) {
      playBeep()
      onCodeDetected(event.nativeEvent.codeStringValue)
    }
  }
  const [status, setStatus] = useState(false)
  return (
    <View style={CONTAINER}>
      <Camera
        style={[CAMERA, cameraStyle]}
        torchMode={status ? "on" : "off"}
        ref={camera}
        showFrame={useLaser}
        scanBarcode={true}
        laserColor={"blue"}
        frameColor={"yellow"}
        colorForScannerFrame={"black"}
        onReadCode={onBarcodeScan}
      />
      <TouchableOpacity
        style={FLASH}
        onPress={() => {
          setStatus(!status)
        }}
      >
        <Icon icon={status ? "flash" : "flash_off"} size={32} color="white" />
      </TouchableOpacity>
    </View>
  )
}
