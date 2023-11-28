import { BaseApi } from "./base-api"

export class AppSettingApi {
  baseApi = BaseApi.instance()

  async getAppSetting(): Promise<any> {
    const response = await this.baseApi.apiInstance.get<any>("/AbpUserConfiguration/GetAll")

    try {
      const result = response.data.result
      const error = response.data.error
      return {
        result,
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
