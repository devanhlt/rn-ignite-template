/* eslint-disable no-throw-literal */
import { flow, Instance, types } from "mobx-state-tree"
import { AuthApi } from "../services/api/auth-api"
import { Alert } from "react-native"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    accessToken: types.maybe(types.string),
    passwordResetCode: types.maybe(types.string),
    user: types.frozen<any>({}),
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.accessToken
    },
    isMe(uid) {
      return store.user.id === uid
    },
  }))
  .actions((store) => {
    const setAccessToken = (value?: string) => {
      store.accessToken = value || undefined
    }
    const setUser = (value?: any) => {
      store.user = value
    }
    return {
      setAccessToken,
      setUser,
    }
  })
  .actions((store) => ({
    login: flow(function* login(username: string, password: string): any {
      if (username.length === 0 || password.length === 0) {
        throw { message: "missing_login_informations" }
      } else {
        const authApi = new AuthApi()
        return authApi.login({ username, password })
      }
    }),
    register: flow(function* register(username: string, password: string): any {
      if (username.length === 0 || password.length === 0) {
        throw { message: "missing_login_informations" }
      } else {
        const authApi = new AuthApi()
        return authApi.register({ username, password })
      }
    }),
    setAuthResult: flow(function* loginOTP({ accessToken, user }: any): any {
      store.setAccessToken(accessToken)
      store.setUser(user)
    }),
    setNewPassword: flow(function* setNewPassword(newPassword: string): any {
      const authApi = new AuthApi()
      const response: any = yield authApi.setNewPassword(newPassword, store.passwordResetCode)
      console.log("API RESPONSE: ", JSON.stringify(response))
      return response
    }),
    changePassword: flow(function* changePassword(
      currentPassword: string,
      newPassword: string,
    ): any {
      const authApi = new AuthApi()
      const response: any = yield authApi.changePassword(newPassword, currentPassword)
      Alert.alert("Đổi mật khẩu thành công", "Vui lòng đăng nhập lại!", [
        {
          text: "Đồng ý",
          onPress: () => {
            store.setAccessToken(undefined)
            store.setUser(undefined)
          },
        },
      ])
      return response
    }),
    logout() {
      store.setAccessToken(undefined)
      store.setUser(undefined)
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
