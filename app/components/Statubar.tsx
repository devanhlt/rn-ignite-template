import { useSafeAreaInsets } from "react-native-safe-area-context"
import { SafeAreaView, StatusBar, View } from "react-native"
import React from "react"

export const SVCStatusBar = ({ backgroundColor, statusBarStyle, ...props }) => {
  const insets = useSafeAreaInsets()
  return <View style={{ backgroundColor, height: insets.top }}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} barStyle={statusBarStyle} {...props} />
    </SafeAreaView>
  </View>
}