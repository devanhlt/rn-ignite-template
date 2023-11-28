import { ViewStyle, TextStyle, StyleSheet } from "react-native"

import { colors, spacing, typography } from "../theme"
import RNFS from "react-native-fs"

export const PHOTO_TEMP_PATH = `${RNFS.DocumentDirectoryPath}/dmstemp/`

export const FULL: ViewStyle = { flex: 1 }
export const CONTAINER: ViewStyle = {
  backgroundColor: colors.transparent,
  paddingHorizontal: spacing[4],
}
export const BOLD: TextStyle = { fontWeight: "bold" }
export const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
export const POPUP_MENU = StyleSheet.create({
  menuOptionItem: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    height: 35,
    justifyContent: "space-between",
  },
  menuOptionItemIcon: {
    marginRight: spacing[1],
  },
  menuOptionItemText: {
    paddingLeft: 8,
  },
  menuTrigger: {
    alignItems: "center",
    height: 32,
    justifyContent: "center",
    width: 36,
  },
})

export const ABSOLUTE_CONTAINER: ViewStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
}

export const HEADER_TOP: ViewStyle = {
  paddingTop: spacing[7],
}
