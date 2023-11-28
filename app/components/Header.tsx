/* eslint-disable react-native/no-inline-styles */
import * as React from "react"
import { ImageStyle, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "../components/Text"
import { Icon } from "./Icon"
import { useNavigation } from "@react-navigation/native"

export interface HeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  iconStyle?: StyleProp<ImageStyle>

  title?: string
}

/**
 * Describe your component here
 */
export const Header = observer(function Header(props: HeaderProps) {
  const { title, style, textStyle, iconStyle } = props
  const $styles = [$container, style]
  const navigation = useNavigation()
  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    }
  }

  return (
    <View style={$styles}>
      <Icon icon={"back"} size={24} style={[{ margin: 8 }, iconStyle]} onPress={handleBack} />
      <Text
        size={"lg"}
        weight={"regular"}
        style={[{ flex: 1, margin: 8 }, textStyle]}
        numberOfLines={1}
      >
        {title}
      </Text>
    </View>
  )
})

const $container: ViewStyle = {
  flexDirection: "row",
  height: 56,
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "white",
}
