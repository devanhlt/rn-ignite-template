import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  Modal,
  ScrollView,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "../../navigators"
import { Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../../components"
import { useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"
import { EnvironmentsPopup } from "../../components/EnvironmentsPopup"
import { colors, spacing } from "../../theme"
import * as Application from "expo-application"
import ProcessingView from "../../components/ProcessingView"
import { useToast } from "react-native-styled-toast"
import { toastErrorConfig, toastSuccessConfig } from "../../utils/toast"
import { translate } from "../../i18n"
import { Button } from "../../components/Button"

interface LoginScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Login">> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen() {
  const navigation = useNavigation()
  const {
    authenticationStore: { login, setAuthResult },
    environmentStore: { currentEnvironment },
  } = useStores()
  const authPasswordInput = useRef<TextInput>()
  const authPhoneInput = useRef<TextInput>()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [appInfo, setAppInfo] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    setAppInfo(
      `${Application.applicationName}\nv${Application.nativeApplicationVersion}_${Application.nativeBuildVersion} - ${currentEnvironment}`,
    )
  }, [currentEnvironment])

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <TouchableOpacity
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
            style={props.style}
          >
            <Icon
              size={18}
              icon={isAuthPasswordHidden ? "eye" : "eye_slash"}
              color={colors.lightContent}
            />
          </TouchableOpacity>
        )
      },
    [isAuthPasswordHidden],
  )

  const handleLogin = () => {
    setLoading(true)
    login(username, password)
      .then((result) => {
        setLoading(false)
        toast(toastSuccessConfig("Đăng nhập thành công!"))
        setAuthResult(result)
      })
      .catch((err) => {
        setLoading(false)
        toast(toastErrorConfig(translate(err.message)))
      })
  }

  const forgotPassword = () => {
    navigation.navigate("ResetPassword")
  }

  function handleRegister() {
    navigation.navigate("Register")
  }

  return (
    <Screen style={$root} preset="fixed">
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Icon icon={"app_icon"} size={200} containerStyle={$appIcon} color="black" />

        <TextField
          ref={authPhoneInput}
          value={username}
          onChangeText={setUsername}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="name"
          autoCorrect={false}
          keyboardType="phone-pad"
          labelTx="loginScreen.username"
          placeholderTx="loginScreen.usernamePlaceholder"
          onSubmitEditing={() => authPasswordInput.current?.focus()}
          LabelTextProps={{ style: { color: colors.lightContent } }}
          inputWrapperStyle={$inputWrapperStyle}
        />

        <TextField
          ref={authPasswordInput}
          value={password}
          onChangeText={setPassword}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isAuthPasswordHidden}
          labelTx="loginScreen.passwordFieldLabel"
          placeholderTx="loginScreen.passwordFieldPlaceholder"
          onSubmitEditing={handleLogin}
          RightAccessory={PasswordRightAccessory}
          LabelTextProps={{ style: { color: colors.lightContent } }}
          inputWrapperStyle={$inputWrapperStyle}
        />

        <View style={$forgotPassView}>
          <TouchableOpacity onPress={forgotPassword}>
            <Text style={$forgotPassText} tx={"loginScreen.forgotPass"} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button
            testID="register-button"
            tx="loginScreen.registerTitle"
            style={$borderButtonContainer}
            textStyle={$registerButton}
            onPress={handleRegister}
          />
          <Button
            testID="login-button"
            tx="loginScreen.tapToSignIn"
            style={$fillButtonContainer}
            textStyle={$loginButton}
            onPress={handleLogin}
          />
        </View>

        <Text text={appInfo} style={$version} />
      </ScrollView>
      <Modal visible={visible}>
        <EnvironmentsPopup dismiss={() => setVisible(false)} />
      </Modal>
      {loading && <ProcessingView isLoading={loading} />}
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  padding: 16,
}

const $version: TextStyle = {
  color: colors.subtitle,
  fontSize: 14,
  marginTop: 24,
  textAlign: "center",
}

const $textField: ViewStyle = {
  marginBottom: spacing.sm,
}

const $inputWrapperStyle: ViewStyle = {
  backgroundColor: colors.background,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: colors.border,
}

const $forgotPassView: ViewStyle = {
  marginVertical: spacing.sm,
  width: "100%",
  justifyContent: "flex-end",
  flexDirection: "row",
}

const $forgotPassText: TextStyle = {
  fontSize: 16,
  color: colors.error,
  textDecorationLine: "underline",
}

const $fillButtonContainer: ViewStyle = {
  marginTop: spacing.lg,
  backgroundColor: colors.lightContent,
  borderRadius: 8,
  flex: 0.47,
}

const $borderButtonContainer: ViewStyle = {
  marginTop: spacing.lg,
  backgroundColor: colors.background,
  borderColor: colors.lightContent,
  borderWidth: 2,
  borderRadius: 8,
  flex: 0.47,
}

const $loginButton: TextStyle = {
  color: colors.background,
  fontSize: 18,
}

const $registerButton: TextStyle = {
  color: colors.lightContent,
  fontSize: 18,
}

const $appIcon: ViewStyle = {
  alignContent: "center",
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 48,
}
