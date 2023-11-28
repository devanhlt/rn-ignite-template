import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import * as Screens from "../screens"
import { navigationRef } from "./navigationUtilities"
import { colors } from "../theme"
import { useStores } from "../models"

export type AppStackParamList = {
  Login: undefined
  HomeTab: undefined
  Home: undefined

  Register: undefined
  ResetPassword: undefined
  ChangePassword: undefined
  ProfileInformation: undefined
  Comment: undefined
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const {
    authenticationStore: { isAuthenticated },
  } = useStores()

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      initialRouteName={isAuthenticated ? "HomeTab" : "Login"}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Home" component={Screens.HomeScreen} />
          <Stack.Screen name="ChangePassword" component={Screens.ChangePasswordScreen} />
          <Stack.Screen name="ProfileInformation" component={Screens.ProfileInformationScreen} />
          <Stack.Screen name="Comment" component={Screens.CommentScreen} />
          {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Screens.LoginScreen} />
          <Stack.Screen name="Register" component={Screens.RegisterScreen} />
          <Stack.Screen name="ResetPassword" component={Screens.ResetPasswordScreen} />
        </>
      )}
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
