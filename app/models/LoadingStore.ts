import { types } from "mobx-state-tree"

export const LoadingStoreModel = types
  .model("LoadingStore")
  .props({
    loading: types.optional(types.frozen(), {}),
  })
  .actions((store) => ({
    startLoading(action: string) {
      store.loading[action] = true
      store.loading = { ...store.loading, [action]: true }
    },
    stopLoading(action: string) {
      store.loading = { ...store.loading, [action]: false }
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    stopLoadingAndShowError(action: string, error: any) {
      store.loading = { ...store.loading, [action]: false }
    },
  }))
