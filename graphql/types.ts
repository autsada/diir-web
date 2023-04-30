import type {
  NexusGenFieldTypes,
  NexusGenArgTypes,
  NexusGenObjects,
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
}
