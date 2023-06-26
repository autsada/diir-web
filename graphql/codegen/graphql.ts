/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  authUid?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  defaultStation?: Maybe<Station>;
  id: Scalars['ID']['output'];
  owner: Scalars['String']['output'];
  stations: Array<Station>;
  type: AccountType;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum AccountType {
  Traditional = 'TRADITIONAL',
  Wallet = 'WALLET'
}

export type AddToPlaylistInput = {
  accountId: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  playlistId: Scalars['String']['input'];
  publishId: Scalars['String']['input'];
  stationId: Scalars['String']['input'];
};

export type AddToWatchLaterInput = {
  accountId: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  publishId: Scalars['String']['input'];
  stationId: Scalars['String']['input'];
};

export type CacheSessionInput = {
  accountId: Scalars['String']['input'];
  address: Scalars['String']['input'];
  stationId: Scalars['String']['input'];
};

export type CalculateTipsResult = {
  __typename?: 'CalculateTipsResult';
  tips: Scalars['Int']['output'];
};

export enum Category {
  Ai = 'AI',
  Animals = 'Animals',
  Children = 'Children',
  Education = 'Education',
  Entertainment = 'Entertainment',
  Food = 'Food',
  Gaming = 'Gaming',
  LifeStyle = 'LifeStyle',
  Men = 'Men',
  Movies = 'Movies',
  Music = 'Music',
  News = 'News',
  Other = 'Other',
  Programming = 'Programming',
  Science = 'Science',
  Sports = 'Sports',
  Technology = 'Technology',
  Travel = 'Travel',
  Vehicles = 'Vehicles',
  Women = 'Women'
}

export type CheckPublishPlaylistsInput = {
  accountId: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  publishId: Scalars['String']['input'];
  stationId: Scalars['String']['input'];
};

export type CheckPublishPlaylistsResponse = {
  __typename?: 'CheckPublishPlaylistsResponse';
  isInWatchLater: Scalars['Boolean']['output'];
  items: Array<PlaylistItem>;
  publishId: Scalars['String']['output'];
};

export type Comment = {
  __typename?: 'Comment';
  comment?: Maybe<Comment>;
  commentId?: Maybe<Scalars['String']['output']>;
  commentType: CommentType;
  comments: Array<Comment>;
  commentsCount: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  creator: Station;
  creatorId: Scalars['String']['output'];
  disLiked?: Maybe<Scalars['Boolean']['output']>;
  disLikes: Array<CommentDisLike>;
  disLikesCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  liked?: Maybe<Scalars['Boolean']['output']>;
  likes: Array<CommentLike>;
  likesCount: Scalars['Int']['output'];
  publish: Publish;
  publishId: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CommentDisLike = {
  __typename?: 'CommentDisLike';
  comment: Comment;
  commentId: Scalars['String']['output'];
  station: Station;
  stationId: Scalars['String']['output'];
};

export type CommentEdge = {
  __typename?: 'CommentEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<Comment>;
};

export type CommentLike = {
  __typename?: 'CommentLike';
  comment: Comment;
  commentId: Scalars['String']['output'];
  station: Station;
  stationId: Scalars['String']['output'];
};

export type CommentPublishInput = {
  accountId: Scalars['String']['input'];
  commentId?: InputMaybe<Scalars['String']['input']>;
  commentType: CommentType;
  content: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  publishId: Scalars['String']['input'];
  stationId: Scalars['String']['input'];
};

export enum CommentType {
  Comment = 'COMMENT',
  Publish = 'PUBLISH'
}

export enum CommentsOrderBy {
  Counts = 'counts',
  Newest = 'newest'
}

export type CreateDraftPublishInput = {
  accountId: Scalars['String']['input'];
  creatorId: Scalars['String']['input'];
  filename: Scalars['String']['input'];
  owner: Scalars['String']['input'];
};

export type CreateDraftPublishResult = {
  __typename?: 'CreateDraftPublishResult';
  filename?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
};

export type CreatePlayListInput = {
  accountId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  publishId: Scalars['String']['input'];
  stationId: Scalars['String']['input'];
};

export type CreateStationInput = {
  accountId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  tokenId: Scalars['Int']['input'];
};

export type CreateTipInput = {
  amount: Scalars['String']['input'];
  fee: Scalars['String']['input'];
  from: Scalars['String']['input'];
  publishId: Scalars['String']['input'];
  receiverId: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
  to: Scalars['String']['input'];
};

export type CreateWalletResult = {
  __typename?: 'CreateWalletResult';
  address: Scalars['String']['output'];
  uid: Scalars['String']['output'];
};

export type DeletePlaylistInput = {
  accountId: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  playlistId: Scalars['String']['input'];
  stationId: Scalars['String']['input'];
};

export type DisLike = {
  __typename?: 'DisLike';
  createdAt: Scalars['DateTime']['output'];
  publish: Publish;
  publishId: Scalars['String']['output'];
  station: Station;
  stationId: Scalars['String']['output'];
};

export type DontRecommend = {
  __typename?: 'DontRecommend';
  createdAt: Scalars['DateTime']['output'];
  requestorId: Scalars['String']['output'];
  target: Station;
  targetId: Scalars['String']['output'];
};

export type DontRecommendEdge = {
  __typename?: 'DontRecommendEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<DontRecommend>;
};

export type DontRecommendInput = {
  accountId: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  stationId: Scalars['String']['input'];
  targetId: Scalars['String']['input'];
};

export type FetchCommentsByPublishIdInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<CommentsOrderBy>;
  publishId: Scalars['String']['input'];
  requestorId?: InputMaybe<Scalars['String']['input']>;
};

export type FetchCommentsResponse = {
  __typename?: 'FetchCommentsResponse';
  edges: Array<CommentEdge>;
  pageInfo: PageInfo;
};

export type FetchDontRecommendsInput = {
  accountId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  owner: Scalars['String']['input'];
  requestorId: Scalars['String']['input'];
};

export type FetchDontRecommendsResponse = {
  __typename?: 'FetchDontRecommendsResponse';
  edges: Array<DontRecommendEdge>;
  pageInfo: PageInfo;
};

export type FetchMyPlaylistsInput = {
  accountId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  owner: Scalars['String']['input'];
  stationId: Scalars['String']['input'];
};

export type FetchMyPublishesInput = {
  accountId: Scalars['String']['input'];
  creatorId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  kind: QueryPublishKind;
  owner: Scalars['String']['input'];
};

export type FetchPlaylistItemsInput = {
  accountId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<PlaylistOrderBy>;
  owner: Scalars['String']['input'];
  playlistId: Scalars['String']['input'];
  stationId: Scalars['String']['input'];
};

export type FetchPlaylistItemsResponse = {
  __typename?: 'FetchPlaylistItemsResponse';
  edges: Array<PlaylistItemEdge>;
  pageInfo: PageInfo;
  playlistDescription?: Maybe<Scalars['String']['output']>;
  playlistName: Scalars['String']['output'];
};

export type FetchPlaylistsResponse = {
  __typename?: 'FetchPlaylistsResponse';
  edges: Array<PlaylistEdge>;
  pageInfo: PageInfo;
};

export type FetchPreviewPlaylistsResponse = {
  __typename?: 'FetchPreviewPlaylistsResponse';
  edges: Array<PreviewPlaylistEdge>;
  pageInfo: PageInfo;
};

export type FetchPublishesByCatInput = {
  category: Category;
  cursor?: InputMaybe<Scalars['String']['input']>;
  requestorId?: InputMaybe<Scalars['String']['input']>;
};

export type FetchPublishesInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  requestorId?: InputMaybe<Scalars['String']['input']>;
};

export type FetchPublishesResponse = {
  __typename?: 'FetchPublishesResponse';
  edges: Array<PublishEdge>;
  pageInfo: PageInfo;
};

export type FetchShortsInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  requestorId?: InputMaybe<Scalars['String']['input']>;
};

export type FetchStationPublishesInput = {
  creatorId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<QueryPublishKind>;
  orderBy?: InputMaybe<PublishOrderBy>;
  requestorId?: InputMaybe<Scalars['String']['input']>;
};

export type FetchSuggestedPublishesInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  publishId: Scalars['String']['input'];
  requestorId?: InputMaybe<Scalars['String']['input']>;
};

export type FetchWatchLaterInput = {
  accountId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<PlaylistOrderBy>;
  owner: Scalars['String']['input'];
  stationId: Scalars['String']['input'];
};

export type FetchWatchLaterResponse = {
  __typename?: 'FetchWatchLaterResponse';
  edges: Array<WatchLaterEdge>;
  pageInfo: PageInfo;
};

export type Follow = {
  __typename?: 'Follow';
  follower: Station;
  followerId: Scalars['String']['output'];
  following: Station;
  followingId: Scalars['String']['output'];
};

export type FollowInput = {
  accountId: Scalars['String']['input'];
  followerId: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  stationId: Scalars['String']['input'];
};

export type GetMyAccountInput = {
  accountType: AccountType;
};

export type GetShortInput = {
  publishId: Scalars['String']['input'];
  requestorId?: InputMaybe<Scalars['String']['input']>;
};

export type GetShortResponse = {
  __typename?: 'GetShortResponse';
  current: Publish;
  next?: Maybe<Publish>;
  prev?: Maybe<Publish>;
};

export type Like = {
  __typename?: 'Like';
  createdAt: Scalars['DateTime']['output'];
  publish: Publish;
  publishId: Scalars['String']['output'];
  station: Station;
  stationId: Scalars['String']['output'];
};

export type LikeCommentInput = {
  accountId: Scalars['String']['input'];
  commentId: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  publishId: Scalars['String']['input'];
  stationId: Scalars['String']['input'];
};

export type LikePublishInput = {
  accountId: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  publishId: Scalars['String']['input'];
  stationId: Scalars['String']['input'];
};

export type MintStationNftInput = {
  accountId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  to: Scalars['String']['input'];
};

export type MintStationNftResult = {
  __typename?: 'MintStationNFTResult';
  tokenId: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addToNewPlaylist?: Maybe<WriteResult>;
  addToPlaylist?: Maybe<WriteResult>;
  addToWatchLater?: Maybe<WriteResult>;
  cacheSession: WriteResult;
  calculateTips?: Maybe<CalculateTipsResult>;
  comment?: Maybe<WriteResult>;
  countViews?: Maybe<WriteResult>;
  createAccount?: Maybe<Account>;
  createDraftPublish?: Maybe<CreateDraftPublishResult>;
  createStation?: Maybe<Station>;
  createTip?: Maybe<Tip>;
  deleteAllPlaylistItems?: Maybe<WriteResult>;
  deletePlaylist?: Maybe<WriteResult>;
  disLikeComment?: Maybe<WriteResult>;
  disLikePublish?: Maybe<WriteResult>;
  dontRecommend?: Maybe<WriteResult>;
  follow?: Maybe<WriteResult>;
  likeComment?: Maybe<WriteResult>;
  likePublish?: Maybe<WriteResult>;
  mintFirstStationNFT?: Maybe<MintStationNftResult>;
  mintStationNFT?: Maybe<MintStationNftResult>;
  removeAllWatchLater?: Maybe<WriteResult>;
  removeDontRecommend?: Maybe<WriteResult>;
  removeFromPlaylist?: Maybe<WriteResult>;
  removeFromWatchLater?: Maybe<WriteResult>;
  reportPublish?: Maybe<WriteResult>;
  sendTips?: Maybe<SendTipsResult>;
  updateBannerImage?: Maybe<WriteResult>;
  updateDisplayName?: Maybe<WriteResult>;
  updatePlaylistDescription?: Maybe<WriteResult>;
  updatePlaylistName?: Maybe<WriteResult>;
  updatePlaylists?: Maybe<WriteResult>;
  updatePreferences?: Maybe<WriteResult>;
  updateProfileImage?: Maybe<WriteResult>;
  updatePublish?: Maybe<Publish>;
  validateDisplayName?: Maybe<Scalars['Boolean']['output']>;
  validateName?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationAddToNewPlaylistArgs = {
  input: CreatePlayListInput;
};


export type MutationAddToPlaylistArgs = {
  input: AddToPlaylistInput;
};


export type MutationAddToWatchLaterArgs = {
  input: AddToWatchLaterInput;
};


export type MutationCacheSessionArgs = {
  input: CacheSessionInput;
};


export type MutationCalculateTipsArgs = {
  qty: Scalars['Int']['input'];
};


export type MutationCommentArgs = {
  input: CommentPublishInput;
};


export type MutationCountViewsArgs = {
  publishId: Scalars['String']['input'];
};


export type MutationCreateAccountArgs = {
  input: GetMyAccountInput;
};


export type MutationCreateDraftPublishArgs = {
  input: CreateDraftPublishInput;
};


export type MutationCreateStationArgs = {
  input: CreateStationInput;
};


export type MutationCreateTipArgs = {
  input: CreateTipInput;
};


export type MutationDeleteAllPlaylistItemsArgs = {
  input: DeletePlaylistInput;
};


export type MutationDeletePlaylistArgs = {
  input: DeletePlaylistInput;
};


export type MutationDisLikeCommentArgs = {
  input: LikeCommentInput;
};


export type MutationDisLikePublishArgs = {
  input: LikePublishInput;
};


export type MutationDontRecommendArgs = {
  input: DontRecommendInput;
};


export type MutationFollowArgs = {
  input: FollowInput;
};


export type MutationLikeCommentArgs = {
  input: LikeCommentInput;
};


export type MutationLikePublishArgs = {
  input: LikePublishInput;
};


export type MutationMintFirstStationNftArgs = {
  input: MintStationNftInput;
};


export type MutationMintStationNftArgs = {
  input: MintStationNftInput;
};


export type MutationRemoveAllWatchLaterArgs = {
  input: RemoveAllWatchLaterInput;
};


export type MutationRemoveDontRecommendArgs = {
  input: DontRecommendInput;
};


export type MutationRemoveFromPlaylistArgs = {
  input: RemoveFromPlaylistInput;
};


export type MutationRemoveFromWatchLaterArgs = {
  input: RemoveFromWatchLaterInput;
};


export type MutationReportPublishArgs = {
  input: ReportPublishInput;
};


export type MutationSendTipsArgs = {
  input: SendTipsInput;
};


export type MutationUpdateBannerImageArgs = {
  input: UpdateImageInput;
};


export type MutationUpdateDisplayNameArgs = {
  input: UpdateDisplayNameInput;
};


export type MutationUpdatePlaylistDescriptionArgs = {
  input: UpdatePlaylistDescriptionInput;
};


export type MutationUpdatePlaylistNameArgs = {
  input: UpdatePlaylistNameInput;
};


export type MutationUpdatePlaylistsArgs = {
  input: UpdatePlaylistsInput;
};


export type MutationUpdatePreferencesArgs = {
  input: UpdatePreferencesInput;
};


export type MutationUpdateProfileImageArgs = {
  input: UpdateImageInput;
};


export type MutationUpdatePublishArgs = {
  input: UpdatePublishInput;
};


export type MutationValidateDisplayNameArgs = {
  name: Scalars['String']['input'];
};


export type MutationValidateNameArgs = {
  name: Scalars['String']['input'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  count?: Maybe<Scalars['Int']['output']>;
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
};

export type PlaybackLink = {
  __typename?: 'PlaybackLink';
  createdAt: Scalars['DateTime']['output'];
  dash: Scalars['String']['output'];
  duration: Scalars['Float']['output'];
  hls: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  preview: Scalars['String']['output'];
  publish?: Maybe<Publish>;
  publishId: Scalars['String']['output'];
  thumbnail: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  videoId: Scalars['String']['output'];
};

export type Playlist = {
  __typename?: 'Playlist';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  items: Array<PlaylistItem>;
  name: Scalars['String']['output'];
  owner: Station;
  ownerId: Scalars['String']['output'];
};

export type PlaylistEdge = {
  __typename?: 'PlaylistEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<Playlist>;
};

export type PlaylistItem = {
  __typename?: 'PlaylistItem';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  playlist: Playlist;
  playlistId: Scalars['String']['output'];
  publish: Publish;
  publishId: Scalars['String']['output'];
};

export type PlaylistItemEdge = {
  __typename?: 'PlaylistItemEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<PlaylistItem>;
};

export type PlaylistItemStatus = {
  isInPlaylist: Scalars['Boolean']['input'];
  playlistId: Scalars['String']['input'];
};

export enum PlaylistOrderBy {
  Newest = 'newest',
  Oldest = 'oldest'
}

export type PreviewPlaylist = {
  __typename?: 'PreviewPlaylist';
  count: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  lastItem?: Maybe<Publish>;
  name: Scalars['String']['output'];
};

export type PreviewPlaylistEdge = {
  __typename?: 'PreviewPlaylistEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<PreviewPlaylist>;
};

export type Publish = {
  __typename?: 'Publish';
  comments: Array<Comment>;
  commentsCount: Scalars['Int']['output'];
  contentRef?: Maybe<Scalars['String']['output']>;
  contentURI?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  creator: Station;
  creatorId: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  disLiked?: Maybe<Scalars['Boolean']['output']>;
  disLikesCount: Scalars['Int']['output'];
  dislikes: Array<DisLike>;
  filename?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  kind?: Maybe<PublishKind>;
  lastComment?: Maybe<Comment>;
  liked?: Maybe<Scalars['Boolean']['output']>;
  likes: Array<Like>;
  likesCount: Scalars['Int']['output'];
  playback?: Maybe<PlaybackLink>;
  primaryCategory?: Maybe<Category>;
  secondaryCategory?: Maybe<Category>;
  thumbSource: ThumbnailSource;
  thumbnail?: Maybe<Scalars['String']['output']>;
  thumbnailRef?: Maybe<Scalars['String']['output']>;
  tips: Array<Maybe<Tip>>;
  tipsCount: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
  transcodeError: Scalars['Boolean']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uploadError: Scalars['Boolean']['output'];
  uploading: Scalars['Boolean']['output'];
  views: Scalars['Int']['output'];
  visibility: Visibility;
};

export type PublishEdge = {
  __typename?: 'PublishEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<Publish>;
};

export enum PublishKind {
  Ads = 'Ads',
  Blog = 'Blog',
  Podcast = 'Podcast',
  Short = 'Short',
  Video = 'Video'
}

export enum PublishOrderBy {
  Latest = 'latest',
  Popular = 'popular'
}

export type Query = {
  __typename?: 'Query';
  checkPublishPlaylists?: Maybe<CheckPublishPlaylistsResponse>;
  fetchAllVideos?: Maybe<FetchPublishesResponse>;
  fetchCommentsByPublishId?: Maybe<FetchCommentsResponse>;
  fetchDontRecommends?: Maybe<FetchDontRecommendsResponse>;
  fetchMyPlaylists?: Maybe<FetchPlaylistsResponse>;
  fetchMyPublishes?: Maybe<FetchPublishesResponse>;
  fetchPlaylistItems?: Maybe<FetchPlaylistItemsResponse>;
  fetchPreviewPlaylists?: Maybe<FetchPreviewPlaylistsResponse>;
  fetchPreviewWatchLater?: Maybe<FetchWatchLaterResponse>;
  fetchShorts?: Maybe<FetchPublishesResponse>;
  fetchStationPublishes?: Maybe<FetchPublishesResponse>;
  fetchSuggestedVideos?: Maybe<FetchPublishesResponse>;
  fetchVideosByCategory?: Maybe<FetchPublishesResponse>;
  fetchWatchLater?: Maybe<FetchWatchLaterResponse>;
  getBalance: Scalars['String']['output'];
  getMyAccount?: Maybe<Account>;
  getPublishById?: Maybe<Publish>;
  getShort?: Maybe<Publish>;
  getStationById?: Maybe<Station>;
  getStationByName?: Maybe<Station>;
};


export type QueryCheckPublishPlaylistsArgs = {
  input: CheckPublishPlaylistsInput;
};


export type QueryFetchAllVideosArgs = {
  input: FetchPublishesInput;
};


export type QueryFetchCommentsByPublishIdArgs = {
  input: FetchCommentsByPublishIdInput;
};


export type QueryFetchDontRecommendsArgs = {
  input: FetchDontRecommendsInput;
};


export type QueryFetchMyPlaylistsArgs = {
  input: FetchMyPlaylistsInput;
};


export type QueryFetchMyPublishesArgs = {
  input: FetchMyPublishesInput;
};


export type QueryFetchPlaylistItemsArgs = {
  input: FetchPlaylistItemsInput;
};


export type QueryFetchPreviewPlaylistsArgs = {
  input: FetchMyPlaylistsInput;
};


export type QueryFetchPreviewWatchLaterArgs = {
  input: FetchWatchLaterInput;
};


export type QueryFetchShortsArgs = {
  input: FetchShortsInput;
};


export type QueryFetchStationPublishesArgs = {
  input: FetchStationPublishesInput;
};


export type QueryFetchSuggestedVideosArgs = {
  input: FetchSuggestedPublishesInput;
};


export type QueryFetchVideosByCategoryArgs = {
  input: FetchPublishesByCatInput;
};


export type QueryFetchWatchLaterArgs = {
  input: FetchWatchLaterInput;
};


export type QueryGetBalanceArgs = {
  address: Scalars['String']['input'];
};


export type QueryGetMyAccountArgs = {
  input: GetMyAccountInput;
};


export type QueryGetPublishByIdArgs = {
  input: QueryByIdInput;
};


export type QueryGetShortArgs = {
  input: GetShortInput;
};


export type QueryGetStationByIdArgs = {
  input: QueryByIdInput;
};


export type QueryGetStationByNameArgs = {
  input: QueryByNameInput;
};

export type QueryByIdInput = {
  requestorId?: InputMaybe<Scalars['String']['input']>;
  targetId: Scalars['String']['input'];
};

export type QueryByNameInput = {
  name: Scalars['String']['input'];
  requestorId?: InputMaybe<Scalars['String']['input']>;
};

export enum QueryPublishKind {
  Ads = 'ads',
  All = 'all',
  Blogs = 'blogs',
  Podcasts = 'podcasts',
  Videos = 'videos'
}

export type RemoveAllWatchLaterInput = {
  accountId: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  stationId: Scalars['String']['input'];
};

export type RemoveFromPlaylistInput = {
  accountId: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  playlistId: Scalars['String']['input'];
  publishId: Scalars['String']['input'];
  stationId: Scalars['String']['input'];
};

export type RemoveFromWatchLaterInput = {
  accountId: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  owner: Scalars['String']['input'];
  publishId: Scalars['String']['input'];
  stationId: Scalars['String']['input'];
};

export type Report = {
  __typename?: 'Report';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  publish: Publish;
  publishId: Scalars['String']['output'];
  reason: ReportReason;
  submittedBy: Station;
  submittedById: Scalars['String']['output'];
};

export type ReportPublishInput = {
  accountId: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  publishId: Scalars['String']['input'];
  reason: ReportReason;
  stationId: Scalars['String']['input'];
};

export enum ReportReason {
  Abuse = 'abuse',
  Adult = 'adult',
  Harass = 'harass',
  Harmful = 'harmful',
  Hateful = 'hateful',
  Mislead = 'mislead',
  Spam = 'spam',
  Terrorism = 'terrorism',
  Violent = 'violent'
}

export type SendTipsInput = {
  publishId: Scalars['String']['input'];
  qty: Scalars['Int']['input'];
  receiverId: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
};

export type SendTipsResult = {
  __typename?: 'SendTipsResult';
  amount: Scalars['String']['output'];
  fee: Scalars['String']['output'];
  from: Scalars['String']['output'];
  to: Scalars['String']['output'];
};

export type Station = {
  __typename?: 'Station';
  account: Account;
  accountId: Scalars['String']['output'];
  bannerImage?: Maybe<Scalars['String']['output']>;
  bannerImageRef?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  defaultColor?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  followersCount: Scalars['Int']['output'];
  followingCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  imageRef?: Maybe<Scalars['String']['output']>;
  isFollowing?: Maybe<Scalars['Boolean']['output']>;
  isOwner?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  preferences: Array<Category>;
  publishes: Array<Publish>;
  publishesCount: Scalars['Int']['output'];
  tokenId?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  watchLater: Array<WatchLater>;
};

export enum ThumbSource {
  Custom = 'custom',
  Generated = 'generated'
}

export enum ThumbnailSource {
  Custom = 'custom',
  Generated = 'generated'
}

export type Tip = {
  __typename?: 'Tip';
  amount: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  fee: Scalars['String']['output'];
  from: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  publish: Publish;
  publishId: Scalars['String']['output'];
  receiver: Station;
  receiverId: Scalars['String']['output'];
  sender: Station;
  senderId: Scalars['String']['output'];
  to: Scalars['String']['output'];
};

export type UpdateDisplayNameInput = {
  accountId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  stationId: Scalars['String']['input'];
};

export type UpdateImageInput = {
  accountId: Scalars['String']['input'];
  image: Scalars['String']['input'];
  imageRef: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  stationId: Scalars['String']['input'];
};

export type UpdatePlaylistDescriptionInput = {
  accountId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  playlistId: Scalars['String']['input'];
  stationId: Scalars['String']['input'];
};

export type UpdatePlaylistNameInput = {
  accountId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  playlistId: Scalars['String']['input'];
  stationId: Scalars['String']['input'];
};

export type UpdatePlaylistsInput = {
  accountId: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  playlists: Array<PlaylistItemStatus>;
  publishId: Scalars['String']['input'];
  stationId: Scalars['String']['input'];
};

export type UpdatePreferencesInput = {
  accountId: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  preferences: Array<Category>;
  stationId: Scalars['String']['input'];
};

export type UpdatePublishInput = {
  accountId: Scalars['String']['input'];
  contentRef?: InputMaybe<Scalars['String']['input']>;
  contentURI?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<PublishKind>;
  owner: Scalars['String']['input'];
  primaryCategory?: InputMaybe<Category>;
  publishId: Scalars['String']['input'];
  secondaryCategory?: InputMaybe<Category>;
  stationId: Scalars['String']['input'];
  thumbSource: ThumbSource;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  thumbnailRef?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  visibility?: InputMaybe<Visibility>;
};

export enum Visibility {
  Draft = 'draft',
  Private = 'private',
  Public = 'public'
}

export type WatchLater = {
  __typename?: 'WatchLater';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  publish: Publish;
  publishId: Scalars['String']['output'];
  station: Station;
  stationId: Scalars['String']['output'];
};

export type WatchLaterEdge = {
  __typename?: 'WatchLaterEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<WatchLater>;
};

export type WriteResult = {
  __typename?: 'WriteResult';
  status: Scalars['String']['output'];
};
