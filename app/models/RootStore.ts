import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { EnvironmentStoreModel } from "./EnvironmentStore"
import { AuthenticationStoreModel } from "./AuthenticationStore"
import { LoadingStoreModel } from "./LoadingStore"
import { AppSettingModel } from "./AppSetting"
import { PostsModel } from "./Posts"

/**
 * A RootStore model.
 */
export const RootStoreModel = types
  .model("RootStore")
  .props({
    environmentStore: types.optional(EnvironmentStoreModel, { currentEnvironment: "prod" }),
    authenticationStore: types.optional(AuthenticationStoreModel, {}),
    loadingStore: types.optional(LoadingStoreModel, {}),
    appStore: types.optional(AppSettingModel, {}),
    postStore: types.optional(PostsModel, {}),
  })
  .actions((self) => ({
    cleanData: () => {
      // clean other store data if need
    },
  }))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
