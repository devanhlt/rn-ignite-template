import { TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { colors } from "../theme"
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { Text } from "./Text"
import { IconProp } from "@fortawesome/fontawesome-svg-core"

export const Chip = ({
  icon = undefined,
  label,
  color = colors.subtitle,
  backgroundColor = colors.white,
  textStyle = {},
  onPress,
}: {
  icon?: IconProp
  label: string
  color?: string
  backgroundColor?: string
  textStyle?: TextStyle
  onPress?: any
}) => {
  return (
    <TouchableOpacity
      key={label}
      onPress={onPress}
      style={[
        $chipContainer,
        {
          borderColor: color,
          backgroundColor,
        },
      ]}
    >
      {icon && <FontAwesomeIcon icon={icon} size={14} style={$chipIcon} color={color} />}
      <Text style={[$chipLabel, { color, ...textStyle }]}>{label}</Text>
    </TouchableOpacity>
  )
}

const $chipIcon: ViewStyle = {
  marginRight: 4,
}
const $chipLabel: TextStyle = {
  fontSize: 12,
  lineHeight: 14,
  textAlign: "center",
  textAlignVertical: "center",
}

const $chipContainer: ViewStyle = {
  margin: 2,
  paddingVertical: 4,
  paddingLeft: 4,
  paddingRight: 8,
  borderWidth: 1,
  borderRadius: 99,
  overflow: "hidden",
  flexDirection: "row",
  alignItems: "center",
}
