import React from "react"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { useStores } from "../models"
import { Text } from "./Text"
import { colors, spacing } from "../theme"

export const EnvironmentsPopup = ({ dismiss }: { dismiss: () => void }) => {
  const {
    environmentStore: { setCurrentEnvironment },
  } = useStores()

  const changeEnv = (env: "test" | "staging" | "prod") => {
    setCurrentEnvironment(env)
    dismiss && dismiss()
  }

  const Line = () => {
    return (
      <View style={{ paddingVertical: spacing.sm }}>
        <View style={$line} />
      </View>
    )
  }

  return (
    <View style={$container}>
      <View style={$content}>
        <TouchableOpacity onPress={() => changeEnv("test")}>
          <Text>Test</Text>
        </TouchableOpacity>
        <Line />
        <TouchableOpacity onPress={() => changeEnv("staging")}>
          <Text>Staging</Text>
        </TouchableOpacity>
        <Line />
        <TouchableOpacity onPress={() => changeEnv("prod")}>
          <Text>Prod</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  backgroundColor: "transparent",
  justifyContent: "center",
}
const $content: ViewStyle = {
  backgroundColor: "white",
  width: "90%",
  height: "60%",
  alignSelf: "center",
}
const $line: ViewStyle = {
  backgroundColor: colors.separator,
  height: 1,
}
