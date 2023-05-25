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

export type Comment = {
  __typename?: 'Comment';
  commentId?: Maybe<Scalars['String']['output']>;
  commentType: CommentType;
  commentsCount: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  creator?: Maybe<Station>;
  creatorId: Scalars['String']['output'];
  disLiked?: Maybe<Scalars['Boolean']['output']>;
  disLikesCount: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  liked?: Maybe<Scalars['Boolean']['output']>;
  likes: Array<Maybe<Station>>;
  likesCount: Scalars['Int']['output'];
  publishId: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum CommentType {
  Comment = 'COMMENT',
  Publish = 'PUBLISH'
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

export type DraftPublish = {
  __typename?: 'DraftPublish';
  createdAt: Scalars['DateTime']['output'];
  creatorId: Scalars['String']['output'];
  filename: Scalars['String']['output'];
  id: Scalars['String']['output'];
  public: Scalars['Boolean']['output'];
  transcodeError: Scalars['Boolean']['output'];
  uploadError: Scalars['Boolean']['output'];
  uploading: Scalars['Boolean']['output'];
};

export type Edge = {
  __typename?: 'Edge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<Account>;
};

export type FetchPublishesByCatInput = {
  category: Category;
};

export type Follow = {
  __typename?: 'Follow';
  follower: Station;
  followerId: Scalars['String']['output'];
  following: Station;
  followingId: Scalars['String']['output'];
};

export type GetMyAccountInput = {
  accountType: AccountType;
};

export type GetMyPublishesInput = {
  accountId: Scalars['String']['input'];
  creatorId: Scalars['String']['input'];
  kind: QueryPublishKind;
  owner: Scalars['String']['input'];
};

export type GetWatchLaterInput = {
  accountId: Scalars['String']['input'];
  owner: Scalars['String']['input'];
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
  addToWatchLater?: Maybe<WriteResult>;
  cacheSession: WriteResult;
  calculateTips?: Maybe<CalculateTipsResult>;
  createAccount?: Maybe<Account>;
  createDraftPublish?: Maybe<CreateDraftPublishResult>;
  createStation?: Maybe<Station>;
  createTip?: Maybe<Tip>;
  mintFirstStationNFT?: Maybe<MintStationNftResult>;
  mintStationNFT?: Maybe<MintStationNftResult>;
  removeFromWatchLater?: Maybe<WriteResult>;
  sendTips?: Maybe<SendTipsResult>;
  updateBannerImage?: Maybe<WriteResult>;
  updateDisplayName?: Maybe<WriteResult>;
  updateProfileImage?: Maybe<WriteResult>;
  updatePublish?: Maybe<Publish>;
  validateDisplayName?: Maybe<Scalars['Boolean']['output']>;
  validateName?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationAddToWatchLaterArgs = {
  input: SavePublishToPlayListInput;
};


export type MutationCacheSessionArgs = {
  input: CacheSessionInput;
};


export type MutationCalculateTipsArgs = {
  qty: Scalars['Int']['input'];
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


export type MutationMintFirstStationNftArgs = {
  input: MintStationNftInput;
};


export type MutationMintStationNftArgs = {
  input: MintStationNftInput;
};


export type MutationRemoveFromWatchLaterArgs = {
  input: RemovePublishToPlayListInput;
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
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
};

export type PlaybackLink = {
  __typename?: 'PlaybackLink';
  createdAt: Scalars['DateTime']['output'];
  dash: Scalars['String']['output'];
  duration: Scalars['Float']['output'];
  hls: Scalars['String']['output'];
  id: Scalars['String']['output'];
  preview: Scalars['String']['output'];
  publishId: Scalars['String']['output'];
  thumbnail: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  videoId: Scalars['String']['output'];
};

export type Publish = {
  __typename?: 'Publish';
  comments: Array<Maybe<Comment>>;
  commentsCount: Scalars['Int']['output'];
  contentRef?: Maybe<Scalars['String']['output']>;
  contentURI?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  creator?: Maybe<Station>;
  creatorId: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  disLiked?: Maybe<Scalars['Boolean']['output']>;
  disLikesCount: Scalars['Int']['output'];
  filename?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  kind?: Maybe<PublishKind>;
  lastComment?: Maybe<Comment>;
  liked?: Maybe<Scalars['Boolean']['output']>;
  likes: Array<Maybe<Station>>;
  likesCount: Scalars['Int']['output'];
  playback?: Maybe<PlaybackLink>;
  primaryCategory?: Maybe<Category>;
  secondaryCategory?: Maybe<Category>;
  thumbSource: ThumbSource;
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

export enum PublishKind {
  Adds = 'Adds',
  Blog = 'Blog',
  Podcast = 'Podcast',
  Short = 'Short',
  Video = 'Video'
}

export type Query = {
  __typename?: 'Query';
  fetchAllVideos: Array<Maybe<Publish>>;
  fetchVideosByCategory: Array<Maybe<Publish>>;
  getBalance: Scalars['String']['output'];
  getMyAccount?: Maybe<Account>;
  getMyPublishes: Array<Maybe<Publish>>;
  getPublishById?: Maybe<Publish>;
  getPublishForCreator?: Maybe<Publish>;
  getStationById?: Maybe<Station>;
  getStationByName?: Maybe<Station>;
  getWatchLater: Array<Maybe<WatchLater>>;
  listCommentsByCommentId: Array<Maybe<Comment>>;
  listCommentsByPublishId: Array<Maybe<Comment>>;
};


export type QueryFetchVideosByCategoryArgs = {
  input: FetchPublishesByCatInput;
};


export type QueryGetBalanceArgs = {
  address: Scalars['String']['input'];
};


export type QueryGetMyAccountArgs = {
  input: GetMyAccountInput;
};


export type QueryGetMyPublishesArgs = {
  input: GetMyPublishesInput;
};


export type QueryGetPublishByIdArgs = {
  input: QueryByIdInput;
};


export type QueryGetPublishForCreatorArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetStationByIdArgs = {
  input: QueryByIdInput;
};


export type QueryGetStationByNameArgs = {
  input: QueryByNameInput;
};


export type QueryGetWatchLaterArgs = {
  input: GetWatchLaterInput;
};


export type QueryListCommentsByCommentIdArgs = {
  input: QueryByIdInput;
};


export type QueryListCommentsByPublishIdArgs = {
  input: QueryByIdInput;
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
  Adds = 'adds',
  All = 'all',
  Blogs = 'blogs',
  Podcasts = 'podcasts',
  Videos = 'videos'
}

export type RemovePublishToPlayListInput = {
  accountId: Scalars['String']['input'];
  id: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  stationId: Scalars['String']['input'];
};

export type Response = {
  __typename?: 'Response';
  edges: Array<Maybe<Edge>>;
  pageInfo: PageInfo;
};

export type SavePublishToPlayListInput = {
  accountId: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  publishId: Scalars['String']['input'];
  stationId: Scalars['String']['input'];
};

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
  publishes: Array<Publish>;
  publishesCount: Scalars['Int']['output'];
  tokenId?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum ThumbSource {
  Custom = 'custom',
  Generated = 'generated'
}

export type Tip = {
  __typename?: 'Tip';
  amount: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  fee: Scalars['String']['output'];
  from: Scalars['String']['output'];
  id: Scalars['String']['output'];
  publish?: Maybe<Publish>;
  publishId: Scalars['String']['output'];
  receiver?: Maybe<Station>;
  receiverId: Scalars['String']['output'];
  sender?: Maybe<Station>;
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
  id: Scalars['String']['output'];
  publish?: Maybe<Publish>;
  publishId: Scalars['String']['output'];
  stationId: Scalars['String']['output'];
};

export type WriteResult = {
  __typename?: 'WriteResult';
  status: Scalars['String']['output'];
};
