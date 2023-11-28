import { Instance, SnapshotIn, SnapshotOut, flow, types } from "mobx-state-tree"
import { PostApi } from "../services/api/post-api"
import { delay } from "../utils/delay"

/**
 * Model description here for TypeScript hints.
 */
export const PostsModel = types
  .model("Posts")
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    listPost: flow(function* listPost() {
      const postApi = new PostApi()
      return postApi.listPost({})
    }),
    listComment: flow(function* listComment(params) {
      const postApi = new PostApi()
      yield delay(1000)
      return postApi.listComment(params)
    }),
    sendComment: flow(function* sendComment(params) {
      const postApi = new PostApi()
      yield delay(500)
      return postApi.sendComment(params)
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Posts extends Instance<typeof PostsModel> {}
export interface PostsSnapshotOut extends SnapshotOut<typeof PostsModel> {}
export interface PostsSnapshotIn extends SnapshotIn<typeof PostsModel> {}
export const createPostsDefaultModel = () => types.optional(PostsModel, {})
