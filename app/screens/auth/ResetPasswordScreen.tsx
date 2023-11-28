import React, { FC, useCallback, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  Alert,
  Modal,
  ScrollView,
  TextInput,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "../../navigators"
import { Header, Icon, Screen, TextField, TextFieldAccessoryProps } from "../../components"
import { colors, spacing } from "../../theme"
import { Formik, FormikValues } from "formik"
import * as Yup from "yup"
import { useStores } from "../../models"
import ProcessingView from "../../components/ProcessingView"
import { useNavigation } from "@react-navigation/native"
import { Button } from "../../components/Button"

const ResetPasswordSchema = Yup.object().shape({
  emailOrPhone: Yup.string().required("Chưa nhập tên đăng nhập"),
  password: Yup.string().required("Chưa nhập mật khẩu mới."),
  repassword: Yup.string().test("passwords-match", "Mật khẩu chưa trùng nhau.", function (value) {
    return this.parent.password === value
  }),
})
const OTPSchema = Yup.object().shape({
  code: Yup.string().required("OTP không hợp lệ.").min(4, "OTP không hợp lệ."),
})

interface ResetPasswordScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"ResetPassword">> {}

export const ResetPasswordScreen: FC<ResetPasswordScreenProps> = observer(
  function ResetPasswordScreen() {
    const {
      authenticationStore: { setNewPassword },
      loadingStore: { loading },
    } = useStores()

    const authPhoneInput = useRef<TextInput>()
    const authPasswordInput = useRef<TextInput>()
    const authRePasswordInput = useRef<TextInput>()

    const [isPasswordHidden, setIsPasswordHidden] = useState(true)
    const [isRePasswordHidden, setIsRePasswordHidden] = useState(true)
    const [password, setPassword] = useState("")
    const [visibleOTP, setVisibleOTP] = useState(false)
    const [showLoading, setShowLoading] = useState(false)

    const { navigate } = useNavigation()

    const handleOtp = (values) => {
      setPassword(values["password"])
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
                color={colors.palette.neutral800}
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
                color={colors.palette.neutral800}
              />
            </TouchableOpacity>
          )
        },
      [isRePasswordHidden],
    )

    return (
      <Screen
        style={$root}
        preset="fixed"
        headerComponent={
          <Header
            title="Đặt lại mật khẩu"
            style={{ backgroundColor: colors.primary }}
            textStyle={{ color: "white" }}
            iconStyle={{ tintColor: "white" }}
          />
        }
        statusBarColor={colors.primary}
        statusBarStyle="light-content"
      >
        <Formik
          validationSchema={ResetPasswordSchema}
          initialValues={{
            emailOrPhone: "",
            password: "",
            repassword: "",
          }}
          onSubmit={(values: FormikValues): void | Promise<any> => {
            handleOtp(values)
          }}
        >
          {({ values, setFieldValue, submitForm, errors, touched }) => (
            <ScrollView style={{ flex: 1, padding: spacing.md }}>
              <TextField
                ref={authPhoneInput}
                value={values["emailOrPhone"]}
                onChangeText={(v) => setFieldValue("emailOrPhone", v)}
                containerStyle={$textField}
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                keyboardType="phone-pad"
                labelTx="loginScreen.username"
                placeholderTx="loginScreen.usernamePlaceholder"
                onSubmitEditing={() => authPasswordInput.current?.focus()}
                LabelTextProps={{ style: { color: colors.palette.neutral900 } }}
                inputWrapperStyle={$inputWrapperStyle}
                helper={
                  errors.emailOrPhone && touched.emailOrPhone ? `${errors.emailOrPhone}` : undefined
                }
                HelperTextProps={{ style: { color: "red", fontSize: 14 } }}
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
                labelTx="loginScreen.newPasswordFieldLabel"
                placeholderTx="loginScreen.newPasswordFieldPlaceholder"
                onSubmitEditing={() => authRePasswordInput.current?.focus()}
                RightAccessory={PasswordRightAccessory}
                LabelTextProps={{ style: { color: colors.palette.neutral900 } }}
                inputWrapperStyle={$inputWrapperStyle}
                helper={errors.password && touched.password ? `${errors.password}` : undefined}
                HelperTextProps={{ style: { color: "red", fontSize: 14 } }}
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
                labelTx="loginScreen.reNewPasswordFieldLabel"
                placeholderTx="loginScreen.reNewPasswordFieldPlaceholder"
                onSubmitEditing={submitForm}
                RightAccessory={RePasswordRightAccessory}
                LabelTextProps={{ style: { color: colors.palette.neutral900 } }}
                inputWrapperStyle={$inputWrapperStyle}
                helper={
                  errors.repassword && touched.repassword ? `${errors.repassword}` : undefined
                }
                HelperTextProps={{ style: { color: "red", fontSize: 14 } }}
              />

              <Button
                testID="done-button"
                tx="common.confirm"
                style={$tapButton}
                textStyle={$loginButton}
                preset="reversed"
                onPress={submitForm}
              />
            </ScrollView>
          )}
        </Formik>
        <Modal
          animationType="fade"
          transparent={true}
          visible={visibleOTP}
          onRequestClose={() => {
            setVisibleOTP(false)
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#00000066",
              flex: 1,
              justifyContent: "center",
            }}
            activeOpacity={1}
          >
            <Formik
              validationSchema={OTPSchema}
              initialValues={{ code: "" }}
              onSubmit={(values: FormikValues, helper): void | Promise<any> => {
                setShowLoading(true)
                verifyOTP(values["code"])
                  .then((res: any) => {
                    if (res.result) {
                      // change password
                      setNewPassword(password).then(() => {
                        if (res.result) {
                          setShowLoading(false)
                          Alert.alert("Thành công", "Đăng nhập với mật khẩu vừa đặt.", [
                            {
                              text: "Đồng ý",
                              onPress: () => {
                                navigate("Login", { replace: true })
                              },
                            },
                          ])
                        } else {
                          setShowLoading(false)
                          helper.setFieldError("code", res.error.message)
                        }
                      })
                    } else {
                      setShowLoading(false)
                      helper.setFieldError("code", res.error.message)
                    }
                  })
                  .catch((err) => {
                    helper.setFieldError("code", "OTP không đúng!")
                  })
              }}
            >
              {({ values, setFieldValue, submitForm, errors, touched }) => (
                <TouchableWithoutFeedback>
                  <View
                    style={{
                      padding: spacing.xxs,
                      backgroundColor: "white",
                      margin: spacing.md,
                      borderRadius: 8,
                    }}
                  >
                    <Icon
                      style={{ alignSelf: "flex-end", marginBottom: 12 }}
                      onPress={() => setVisibleOTP(false)}
                      icon="x"
                      size={24}
                    />
                    <TextField
                      value={values["code"]}
                      onChangeText={(v) => setFieldValue("code", v)}
                      containerStyle={[$textField, { marginHorizontal: spacing.sm }]}
                      autoCapitalize="none"
                      labelTx="loginScreen.codeLabel"
                      onSubmitEditing={submitForm}
                      keyboardType="phone-pad"
                      LabelTextProps={{ style: { color: colors.palette.neutral900 } }}
                      inputWrapperStyle={$inputWrapperStyle}
                      helper={errors.code && touched.code ? `${errors.code}` : undefined}
                      HelperTextProps={{ style: { color: "red", fontSize: 14 } }}
                      maxLength={6}
                      style={{ textAlign: "center", fontSize: 22, height: 72 }}
                      autoFocus={true}
                    />

                    <Button
                      testID="done-button"
                      tx="common.done"
                      style={[
                        $tapButton,
                        { marginHorizontal: spacing.sm, marginBottom: spacing.sm },
                      ]}
                      textStyle={$loginButton}
                      preset="reversed"
                      onPress={submitForm}
                    />

                    {showLoading && <ProcessingView isLoading={showLoading} />}
                  </View>
                </TouchableWithoutFeedback>
              )}
            </Formik>
          </TouchableOpacity>
        </Modal>
        {loading.sendOTP && <ProcessingView isLoading={loading.sendOTP} />}
      </Screen>
    )
  },
)

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
  color: colors.darkContent,
  fontSize: 18,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.lg,
  backgroundColor: colors.primary,
  borderRadius: 8,
}
