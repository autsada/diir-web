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

export type Publish = NexusGenObjects["Publish"] & {
  creator: Station
  playback: Playback
  likes: Station[]
  likesCount: number
  liked: boolean
  disLikesCount: number
  disLiked: boolean
  tips: Tip[]
  tipsCount: number
  commentsCount: number
  lastComment: Comment
  comments: Comment[]
}
export type PublishCategory = NexusGenEnums["Category"]
export type ThumbSource = NexusGenEnums["ThumbSource"]
export type PublishKind = NexusGenEnums["PublishKind"]
export type QueryPublishKind = NexusGenEnums["QueryPublishKind"]
export type Playback = NexusGenObjects["PlaybackLink"]
export type Comment = NexusGenObjects["Comment"] & {
  creator: Station
  likes: Station[]
  likesCount: number
  liked: boolean
  disLikesCount: number
  disLiked: boolean
  commentsCount: number
}
export type Tip = NexusGenObjects["Tip"] & {
  publish: Publish
  sender: Station
  receiver: Station
}

export type UpdatePublishInput = NexusGenInputs["UpdatePublishInput"]
export type GetMyPublishesInput = NexusGenInputs["GetMyPublishesInput"]
