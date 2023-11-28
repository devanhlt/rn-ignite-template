import { Instance, SnapshotIn, SnapshotOut, flow, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { AppSettingApi } from "../services/api/app-setting-api"
import { get } from "lodash"

/**
 * Model description here for TypeScript hints.
 */
export const AppSettingModel = types
  .model("AppSetting")
  .props({
    setting: types.frozen({}),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    getWarrantyInfo: () => {
      return get(self.setting, "setting.values", {})
    },
  }))
  .actions((self) => ({
    getSetting: flow(function* getSetting(): any {
      const appSettingApi = new AppSettingApi()
      const { result }: any = yield appSettingApi.getAppSetting()
      self.setting = result
      return result
    }),
  }))

export interface AppSetting extends Instance<typeof AppSettingModel> {}
export interface AppSettingSnapshotOut extends SnapshotOut<typeof AppSettingModel> {}
export interface AppSettingSnapshotIn extends SnapshotIn<typeof AppSettingModel> {}
export const createAppSettingDefaultModel = () => types.optional(AppSettingModel, {})
