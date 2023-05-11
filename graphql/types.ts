import type {
  NexusGenFieldTypes,
  NexusGenArgTypes,
  NexusGenObjects,
  NexusGenEnums,
  NexusGenInputs,
} from "./typegen"

export type QueryReturnType<T extends keyof NexusGenFieldTypes["Query"]> = {
  [k in T]: NexusGenFieldTypes["Query"][T]
}
export type QueryArgsType<T extends keyof NexusGenArgTypes["Query"]> =
  NexusGenArgTypes["Query"][T]

export type MutationReturnType<T extends keyof NexusGenFieldTypes["Mutation"]> =
  {
    [k in T]: NexusGenFieldTypes["Mutation"][T]
  }
export type MutationArgsType<T extends keyof NexusGenArgTypes["Mutation"]> =
  NexusGenArgTypes["Mutation"][T]

export type Account = NexusGenObjects["Account"] & {
  defaultStation: Station
  stations: Station[]
}
export type Station = NexusGenObjects["Station"] & {
  followersCount: number
  followingCount: number
  publishesCount: number
  isFollowing: boolean
  isOwner: boolean
  publishes: Publish[]
}

export type Publish = NexusGenObjects["Publish"]
export type PublishCategory = NexusGenEnums["Category"]
export type UploadedPublish = Publish & {
  playback: NexusGenObjects["PlaybackLink"]
}
export type ThumbSource = NexusGenEnums["ThumbSource"]
export type PublishKind = NexusGenEnums["PublishKind"]
export type UpdatePublishInput = NexusGenInputs["UpdatePublishInput"]
