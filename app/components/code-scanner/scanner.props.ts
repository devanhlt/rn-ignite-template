import { ViewStyle } from "react-native"

export interface ScannerProps {
  isCameraActive: boolean
  cameraStyle?: ViewStyle
  onCodeDetected?: (code: string) => void
  useLaser?: boolean
}
