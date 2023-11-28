import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { BaseApi } from "../services/api/base-api"
import { configOf } from "../config"

export const EnvironmentStoreModel = types
  .model("EnvironmentStore")
  .props({
    currentEnvironment: types.optional(types.enumeration(["dev", "test", "staging", "prod"]), "prod"),
  })
  .views((store) => ({
    get currentEnv() {
      return store.currentEnvironment
    },
  }))
  .actions((store) => ({
    setCurrentEnvironment(value: "test" | "staging" | "prod") {
      store.currentEnvironment = value
      BaseApi.forceInitInstance()
    },
    getBaseUrl() {
      return configOf(store.currentEnvironment).API_URL
    },
  }))

export interface EnvironmentStore extends Instance<typeof EnvironmentStoreModel> {
}

export interface EnvironmentStoreSnapshot extends SnapshotOut<typeof EnvironmentStoreModel> {
}
