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
export type ReportReason = NexusGenEnums["ReportReason"]
export type CommentType = NexusGenEnums["CommentType"]
export type CommentsOrderBy = NexusGenEnums["CommentsOrderBy"]
export type PlaylistOrderBy = NexusGenEnums["PlaylistOrderBy"]
export type PublishOrderBy = NexusGenEnums["PublishOrderBy"]
export type PublishVisibility = NexusGenEnums["Visibility"]

export type QueryByIdInput = NexusGenInputs["QueryByIdInput"]
export type FetchMyPublishesInput = NexusGenInputs["FetchMyPublishesInput"]
export type FetchPublishesInput = NexusGenInputs["FetchPublishesInput"]
export type FetchStationPublishesInput =
  NexusGenInputs["FetchStationPublishesInput"]
export type FetchPublishesByCatInput =
  NexusGenInputs["FetchPublishesByCatInput"]
export type FetchShortsInput = NexusGenInputs["FetchShortsInput"]
export type GetShortInput = NexusGenInputs["GetShortInput"]
export type FetchWatchLaterInput = NexusGenInputs["FetchWatchLaterInput"]
export type FetchMyPlaylistsInput = NexusGenInputs["FetchMyPlaylistsInput"]
export type CheckPublishPlaylistsInput =
  NexusGenInputs["CheckPublishPlaylistsInput"]
export type FetchPlaylistItemsInput = NexusGenInputs["FetchPlaylistItemsInput"]
export type FetchDontRecommendsInput =
  NexusGenInputs["FetchDontRecommendsInput"]
export type FetchSuggestedPublishesInput =
  NexusGenInputs["FetchSuggestedPublishesInput"]
export type FetchCommentsByPublishIdInput =
  NexusGenInputs["FetchCommentsByPublishIdInput"]
export type FetchSubCommentsInput = NexusGenInputs["FetchSubCommentsInput"]

export type CacheSessionInput = NexusGenInputs["CacheSessionInput"]
export type CreateDraftVideoInput = NexusGenInputs["CreateDraftVideoInput"]
export type CreateDraftBlogInput = NexusGenInputs["CreateDraftBlogInput"]
export type UpdateBlogInput = NexusGenInputs["UpdateBlogInput"]
export type UpdateVideoInput = NexusGenInputs["UpdateVideoInput"]
export type DeletePublishInput = NexusGenInputs["DeletePublishInput"]
export type AddToWatchLaterInput = NexusGenInputs["AddToWatchLaterInput"]
export type RemoveFromWatchLaterInput =
  NexusGenInputs["RemoveFromWatchLaterInput"]
export type RemoveAllWatchLaterInput =
  NexusGenInputs["RemoveAllWatchLaterInput"]
export type CreatePlayListInput = NexusGenInputs["CreatePlayListInput"]
export type AddToPlaylistInput = NexusGenInputs["AddToPlaylistInput"]
export type UpdatePlaylistsInput = NexusGenInputs["UpdatePlaylistsInput"]
export type DisplayedPlaylist = {
  isInPlaylist: boolean | undefined
  list: Maybe<Playlist> | undefined
}
export type DontRecommendInput = NexusGenInputs["DontRecommendInput"]
export type ReportPublishInput = NexusGenInputs["ReportPublishInput"]
export type LikePublishInput = NexusGenInputs["LikePublishInput"]
export type TipAmount = 1 | 2 | 5 | 10 | 25 | 50 | 100 | 1000 | 2000
export type CommentPublishInput = NexusGenInputs["CommentPublishInput"]
export type LikeCommentInput = NexusGenInputs["LikeCommentInput"]
export type FollowInput = NexusGenInputs["FollowInput"]
export type UpdatePlaylistNameInput = NexusGenInputs["UpdatePlaylistNameInput"]
export type UpdatePlaylistDescriptionInput =
  NexusGenInputs["UpdatePlaylistDescriptionInput"]
export type DeletePlaylistInput = NexusGenInputs["DeletePlaylistInput"]
export type RemoveFromPlaylistInput = NexusGenInputs["RemoveFromPlaylistInput"]
export type UpdateDisplayNameInput = NexusGenInputs["UpdateDisplayNameInput"]
export type UpdateImageInput = NexusGenInputs["UpdateImageInput"]
export type UpdatePreferencesInput = NexusGenInputs["UpdatePreferencesInput"]
export type BookmarkPostInput = NexusGenInputs["BookmarkPostInput"]
