import { ApisauceInstance, create } from "apisauce"
import { configOf } from "../../config"
import { forEach, isEmpty } from "lodash"
import { RootStore } from "../../models"

export interface ApiConfig {
  timeout: number
}

export const DEFAULT_API_CONFIG: ApiConfig = {
  timeout: 10000,
}

export class BaseApi {
  static apiInstance: BaseApi
  apiInstance: ApisauceInstance
  fileInstance: ApisauceInstance
  config: ApiConfig
  rootStore: RootStore

  constructor(rootStore: RootStore, config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.rootStore = rootStore
    const envConfig = configOf(rootStore.environmentStore.currentEnvironment)

    this.apiInstance = create({
      baseURL: envConfig.API_URL,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
        "Accept-Language": "vi,en-GB;q=0.9,en;q=0.8,en-US;q=0.7",
        "Cache-Control": "no-cache",
      },
    })
    this.fileInstance = create({
      baseURL: envConfig.API_URL,
      timeout: this.config.timeout,
      headers: {
        Accept: "text/plain",
        common: {
          "Content-Type": "multipart/form-data",
        },
      },
    })

    forEach([this.apiInstance, this.fileInstance], (api) => {
      api.axiosInstance.interceptors.request.use(
        async (config) => {
          if (!this.rootStore) return config
          const accessToken = this.rootStore.authenticationStore.accessToken
          if (!isEmpty(accessToken)) config.headers.Authorization = `Bearer  ${accessToken}`
          console.tron.log("REQUEST", config)
          return config
        },
        (error) => {
          console.tron.log("REQUEST ERROR", JSON.parse(JSON.stringify(error)))
          return Promise.reject(error)
        },
      )
    })

    forEach([this.apiInstance, this.fileInstance], (instance) =>
      instance.axiosInstance.interceptors.response.use(
        (response) => {
          try {
            return response
          } catch (e) {
            if (__DEV__) {
              console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
            }
            return { kind: "bad-data" }
          }
        },
        async (error) => {
          console.tron.log(this.rootStore)
          if (!this.rootStore) return error
          const authStore = this.rootStore.authenticationStore
          if (error.response && error.response.status === 401) {
            authStore.logout()
            return error
          }
          return Promise.reject(error)
        },
      ),
    )
  }

  static instance = (rootStore?: RootStore, config: ApiConfig = DEFAULT_API_CONFIG) => {
    if (!this.apiInstance) {
      this.apiInstance = new BaseApi(rootStore, config)
    }
    return this.apiInstance
  }

  static forceInitInstance = () => {
    this.apiInstance = new BaseApi(this.apiInstance.rootStore, this.apiInstance.config)
    return this.apiInstance
  }
}
