import type { Maybe, Playlist, Query } from "./codegen/graphql"
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

export type PublishCategory = NexusGenEnums["Category"]
export type ThumbSource = NexusGenEnums["ThumbSource"]
export type PublishKind = NexusGenEnums["PublishKind"]
export type QueryPublishKind = NexusGenEnums["QueryPublishKind"]
export type QueryByIdInput = NexusGenInputs["QueryByIdInput"]
export type UpdatePublishInput = NexusGenInputs["UpdatePublishInput"]
export type FetchMyPublishesInput = NexusGenInputs["FetchMyPublishesInput"]
export type FetchPublishesInput = NexusGenInputs["FetchPublishesInput"]
export type FetchPublishesByCatInput =
  NexusGenInputs["FetchPublishesByCatInput"]
export type AddToWatchLaterInput = NexusGenInputs["AddToWatchLaterInput"]
export type RemoveFromWatchLaterInput =
  NexusGenInputs["RemoveFromWatchLaterInput"]
export type FetchWatchLaterInput = NexusGenInputs["FetchWatchLaterInput"]
export type FetchMyPlaylistsInput = NexusGenInputs["FetchMyPlaylistsInput"]
export type CheckPublishPlaylistsInput =
  NexusGenInputs["CheckPublishPlaylistsInput"]
export type CreatePlayListInput = NexusGenInputs["CreatePlayListInput"]
export type AddToPlaylistInput = NexusGenInputs["AddToPlaylistInput"]
export type UpdatePlaylistsInput = NexusGenInputs["UpdatePlaylistsInput"]
export type DisplayedPlaylist = {
  isInPlaylist: boolean | undefined
  list: Maybe<Playlist> | undefined
}
export type DontRecommendInput = NexusGenInputs["DontRecommendInput"]
export type FetchDontRecommendsInput =
  NexusGenInputs["FetchDontRecommendsInput"]
