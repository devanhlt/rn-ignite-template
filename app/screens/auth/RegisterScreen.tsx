import React, { FC, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, TextInput, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "../../navigators"
import { Header, Icon, Screen, TextField, TextFieldAccessoryProps } from "../../components"
import { colors, spacing } from "../../theme"
import { Formik, FormikValues } from "formik"
import * as Yup from "yup"
import { useStores } from "../../models"
import ProcessingView from "../../components/ProcessingView"
import { useNavigation } from "@react-navigation/native"
import { useToast } from "react-native-styled-toast"
import { toastErrorConfig, toastSuccessConfig } from "../../utils/toast"
import { translate } from "../../i18n"
import { Button } from "../../components/Button"

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Chưa nhập tên đăng nhập"),
  password: Yup.string().required("Chưa nhập mật khẩu mới."),
  repassword: Yup.string().test("passwords-match", "Mật khẩu chưa trùng nhau.", function (value) {
    return this.parent.password === value
  }),
})

interface RegisterScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Register">> {}

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen() {
  const {
    authenticationStore: { register },
    loadingStore: { loading },
  } = useStores()

  const recaptcha = useRef<any>()

  const authPhoneInput = useRef<TextInput>()
  const authPasswordInput = useRef<TextInput>()
  const authRePasswordInput = useRef<TextInput>()

  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [isRePasswordHidden, setIsRePasswordHidden] = useState(true)

  const { goBack } = useNavigation()
  const { toast } = useToast()

  const handleRegister = (values) => {
    register(values["username"], values["password"])
      .then((res: any) => {
        toast(toastSuccessConfig(translate("register_success")))
        goBack()
      })
      .catch((error) => {
        toast(toastErrorConfig(translate(error.message)))
      })
  }

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <TouchableOpacity
            onPress={() => setIsPasswordHidden(!isPasswordHidden)}
            style={props.style}
          >
            <Icon
              size={18}
              icon={isPasswordHidden ? "eye" : "eye_slash"}
              color={colors.lightContent}
            />
          </TouchableOpacity>
        )
      },
    [isPasswordHidden],
  )

  const RePasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <TouchableOpacity
            onPress={() => setIsRePasswordHidden(!isRePasswordHidden)}
            style={props.style}
          >
            <Icon
              size={18}
              icon={isRePasswordHidden ? "eye" : "eye_slash"}
              color={colors.lightContent}
            />
          </TouchableOpacity>
        )
      },
    [isRePasswordHidden],
  )

  const onVerify = (token) => {
    console.log("success!", token)
  }

  const onExpire = () => {
    console.warn("expired!")
  }

  const send = () => {
    console.log("send!")
    recaptcha.current && recaptcha.current.open()
  }

  return (
    <Screen
      style={$root}
      preset="fixed"
      headerComponent={
        <Header
          title="Đăng ký tài khoản"
          style={{ backgroundColor: colors.primary }}
          textStyle={{ color: "white" }}
          iconStyle={{ tintColor: "white" }}
        />
      }
      statusBarColor={colors.primary}
      statusBarStyle="light-content"
    >
      <Formik
        validationSchema={RegisterSchema}
        initialValues={{
          username: "",
          password: "",
          repassword: "",
        }}
        onSubmit={(values: FormikValues): void | Promise<any> => {
          handleRegister(values)
        }}
      >
        {({ values, setFieldValue, submitForm, errors, touched }) => (
          <ScrollView style={{ flex: 1, padding: spacing.md }}>
            <TextField
              ref={authPhoneInput}
              value={values["username"]}
              onChangeText={(v) => setFieldValue("username", v)}
              containerStyle={$textField}
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect={false}
              keyboardType="phone-pad"
              labelTx="loginScreen.username"
              placeholderTx="loginScreen.usernamePlaceholder"
              onSubmitEditing={() => authPasswordInput.current?.focus()}
              LabelTextProps={{ style: { color: colors.title } }}
              inputWrapperStyle={$inputWrapperStyle}
              helper={errors.username && touched.username ? `${errors.username}` : undefined}
              HelperTextProps={{ style: { color: colors.error, fontSize: 14 } }}
            />

            <TextField
              ref={authPasswordInput}
              value={values["password"]}
              onChangeText={(v) => setFieldValue("password", v)}
              containerStyle={$textField}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
              secureTextEntry={isPasswordHidden}
              labelTx="loginScreen.passwordFieldLabel"
              placeholderTx="loginScreen.passwordFieldPlaceholder"
              onSubmitEditing={() => authRePasswordInput.current?.focus()}
              RightAccessory={PasswordRightAccessory}
              LabelTextProps={{ style: { color: colors.title } }}
              inputWrapperStyle={$inputWrapperStyle}
              helper={errors.password && touched.password ? `${errors.password}` : undefined}
              HelperTextProps={{ style: { color: colors.error, fontSize: 14 } }}
            />

            <TextField
              ref={authRePasswordInput}
              value={values["repassword"]}
              onChangeText={(v) => setFieldValue("repassword", v)}
              containerStyle={$textField}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
              secureTextEntry={isRePasswordHidden}
              labelTx="loginScreen.rePasswordFieldLabel"
              placeholderTx="loginScreen.rePasswordFieldPlaceholder"
              onSubmitEditing={submitForm}
              RightAccessory={RePasswordRightAccessory}
              LabelTextProps={{ style: { color: colors.title } }}
              inputWrapperStyle={$inputWrapperStyle}
              helper={errors.repassword && touched.repassword ? `${errors.repassword}` : undefined}
              HelperTextProps={{ style: { color: colors.error, fontSize: 14 } }}
            />

            <Button
              testID="done-button"
              style={$tapButton}
              tx={"common.confirm"}
              textStyle={$loginButton}
              preset="reversed"
              onPress={submitForm}
            />
          </ScrollView>
        )}
      </Formik>
      {loading.register && <ProcessingView isLoading={loading.register} />}
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
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

const $loginButton: TextStyle = {
  color: colors.background,
  fontSize: 18,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.lg,
  backgroundColor: colors.primary,
  borderRadius: 8,
}
