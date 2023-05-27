import { Query } from "./codegen/graphql"

import type {
  NexusGenFieldTypes,
  NexusGenArgTypes,
  NexusGenEnums,
  NexusGenInputs,
} from "./typegen"

export type QueryReturnType<T extends keyof Query> = {
  [k in T]: Query[T]
}
export type QueryArgsType<T extends keyof NexusGenArgTypes["Query"]> =
  NexusGenArgTypes["Query"][T]

export type MutationReturnType<T extends keyof NexusGenFieldTypes["Mutation"]> =
  {
    [k in T]: NexusGenFieldTypes["Mutation"][T]
  }
export type MutationArgsType<T extends keyof NexusGenArgTypes["Mutation"]> =
  NexusGenArgTypes["Mutation"][T]

export type QueryByIdInput = NexusGenInputs["QueryByIdInput"]
export type PublishCategory = NexusGenEnums["Category"]
export type ThumbSource = NexusGenEnums["ThumbSource"]
export type PublishKind = NexusGenEnums["PublishKind"]
export type QueryPublishKind = NexusGenEnums["QueryPublishKind"]
export type UpdatePublishInput = NexusGenInputs["UpdatePublishInput"]
export type FetchMyPublishesInput = NexusGenInputs["FetchMyPublishesInput"]
export type AddToPlayListInput = NexusGenInputs["SavePublishToPlayListInput"]
export type FetchWatchLaterInput = NexusGenInputs["FetchWatchLaterInput"]
