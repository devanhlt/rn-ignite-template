import DeviceInfo from "react-native-device-info"
import { BaseApi } from "./base-api"
import { Platform } from "react-native"
import { ApiResponse } from "apisauce"
import { removeVietnameseAccent } from "../../utils/text"

export class AuthApi {
  baseApi = BaseApi.instance()

  async login(params) {
    return this.baseApi.apiInstance.post<any>("api/auth/login", params).then(async (response) => {
      const data = response.data
      if (response.ok) {
        this.baseApi.apiInstance.setHeader("accessToken", data.accessToken)
        this.baseApi.apiInstance.setHeader("X-App-Platform", Platform.OS)
        this.baseApi.apiInstance.setHeader("X-App-Channel", DeviceInfo.getApplicationName())
        this.baseApi.apiInstance.setHeader("X-App-BuildNumber", DeviceInfo.getBuildNumber())
        const appDevice = `${await DeviceInfo.getManufacturer()} - ${DeviceInfo.getModel()} - ${(
          await DeviceInfo.getDeviceName()
        ).replace(/[^a-zA-Z0-9 ]/g, "")} - ${Platform.OS} ${DeviceInfo.getSystemVersion()}`
        this.baseApi.apiInstance.setHeader("X-App-Device", removeVietnameseAccent(appDevice))
        this.baseApi.apiInstance.axiosInstance.defaults.headers.accessToken = data.accessToken
        return data
      }
      const error = { message: data }
      throw error
    })
  }

  async register(params) {
    return this.baseApi.apiInstance.post("api/auth/register", params).then((response) => {
      const data = response.data
      if (response.ok) {
        return data
      } else {
        const error = { message: data }
        throw error
      }
    })
  }

  async setNewPassword(newPassword: string, passwordResetCode: string): Promise<any> {
    const response: ApiResponse<any> = await this.baseApi.apiInstance.post(
      "api/services/app/User/forgot-pass/reset",
      { newPassword: newPassword, passwordResetCode: passwordResetCode },
    )
    try {
      const code = response.data.result
      const error = response.data.error
      return {
        result: code,
        error: error,
      }
    } catch (e) {
      return {
        result: null,
        error: {
          code: 0,
          message: "errors.unknowError",
          details: "",
          validationErrors: "",
        },
      }
    }
  }

  async changePassword(newPassword: string, oldPassword: string): Promise<any> {
    const response: ApiResponse<any> = await this.baseApi.apiInstance.put(
      "/api/services/app/User/ChangePassword",
      { newPassword: newPassword, oldPassword: oldPassword },
    )
    try {
      const code = response.data.result
      const error = response.data.error
      return {
        result: code,
        error: error,
      }
    } catch (e) {
      return {
        result: null,
        error: {
          code: 0,
          message: "errors.unknowError",
          details: "",
          validationErrors: "",
        },
      }
    }
  }
}
