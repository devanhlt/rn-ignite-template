import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "../../navigators"
import { Header, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { colors, spacing } from "../../theme"
import { Button } from "../../components/Button"

interface ProfileInformationScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"ProfileInformation">> {}

export const ProfileInformationScreen: FC<ProfileInformationScreenProps> = observer(
  function ProfileInformationScreen() {
    const {
      authenticationStore: { logout },
    } = useStores()

    const { navigate } = useNavigation()

    const changePassword = () => {
      navigate("ChangePassword")
    }

    return (
      <Screen
        style={$root}
        preset="fixed"
        headerComponent={
          <Header
            title="Cá nhân"
            style={{ backgroundColor: colors.primary }}
            textStyle={{ color: "white" }}
            iconStyle={{ tintColor: "white" }}
          />
        }
        statusBarColor={colors.primary}
        statusBarStyle="light-content"
        safeAreaEdges={["bottom"]}
      >
        <View style={{ flex: 1 }}>
          <Text text="profileInformation" />
        </View>

        <Button
          testID="change-password-button"
          text="Đổi mật khẩu"
          style={$changePwdButton}
          textStyle={$buttonContent}
          onPress={changePassword}
        />
        <Button
          testID="logout-button"
          text="Đăng xuất"
          style={$logoutButton}
          textStyle={$buttonContent}
          onPress={logout}
        />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  padding: spacing.sm,
}

const $changePwdButton: ViewStyle = {
  backgroundColor: colors.palette.neutral900,
  borderRadius: 12,
}
const $logoutButton: ViewStyle = {
  marginTop: spacing.xs,
  backgroundColor: colors.palette.angry500,
  borderRadius: 12,
}
const $buttonContent: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: 18,
}
