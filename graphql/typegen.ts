/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

// import type { Context } from "./context"
// import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    // dateTime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    // dateTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CacheSessionInput: {
    // input type
    accountId: string // String!
    address: string // String!
    stationId: string // String!
  }
  CreateDraftPublishInput: {
    // input type
    accountId: string // String!
    creatorId: string // String!
    filename: string // String!
    owner: string // String!
  }
  CreateStationInput: {
    // input type
    accountId: string // String!
    name: string // String!
    owner: string // String!
    tokenId: number // Int!
  }
  CreateTipInput: {
    // input type
    amount: string // String!
    fee: string // String!
    from: string // String!
    publishId: string // String!
    receiverId: string // String!
    senderId: string // String!
    to: string // String!
  }
  FetchMyPublishesInput: {
    // input type
    accountId: string // String!
    creatorId: string // String!
    cursor?: string | null // String
    kind: NexusGenEnums["QueryPublishKind"] // QueryPublishKind!
    owner: string // String!
  }
  FetchPublishesByCatInput: {
    // input type
    category: NexusGenEnums["Category"] // Category!
    cursor?: string | null // String
  }
  FetchPublishesInput: {
    // input type
    cursor?: string | null // String
    prefer?: NexusGenEnums["Category"][] | null // [Category!]
  }
  GetMyAccountInput: {
    // input type
    accountType: NexusGenEnums["AccountType"] // AccountType!
  }
  GetWatchLaterInput: {
    // input type
    accountId: string // String!
    owner: string // String!
    stationId: string // String!
  }
  MintStationNFTInput: {
    // input type
    accountId: string // String!
    name: string // String!
    to: string // String!
  }
  QueryByIdInput: {
    // input type
    requestorId?: string | null // String
    targetId: string // String!
  }
  QueryByNameInput: {
    // input type
    name: string // String!
    requestorId?: string | null // String
  }
  RemovePublishToPlayListInput: {
    // input type
    accountId: string // String!
    id: string // String!
    owner: string // String!
    stationId: string // String!
  }
  SavePublishToPlayListInput: {
    // input type
    accountId: string // String!
    owner: string // String!
    publishId: string // String!
    stationId: string // String!
  }
  SendTipsInput: {
    // input type
    publishId: string // String!
    qty: number // Int!
    receiverId: string // String!
    senderId: string // String!
  }
  UpdateDisplayNameInput: {
    // input type
    accountId: string // String!
    name: string // String!
    owner: string // String!
    stationId: string // String!
  }
  UpdateImageInput: {
    // input type
    accountId: string // String!
    image: string // String!
    imageRef: string // String!
    owner: string // String!
    stationId: string // String!
  }
  UpdatePublishInput: {
    // input type
    accountId: string // String!
    contentRef?: string | null // String
    contentURI?: string | null // String
    description?: string | null // String
    kind?: NexusGenEnums["PublishKind"] | null // PublishKind
    owner: string // String!
    primaryCategory?: NexusGenEnums["Category"] | null // Category
    publishId: string // String!
    secondaryCategory?: NexusGenEnums["Category"] | null // Category
    stationId: string // String!
    thumbSource: NexusGenEnums["ThumbSource"] // ThumbSource!
    thumbnail?: string | null // String
    thumbnailRef?: string | null // String
    title?: string | null // String
    visibility?: NexusGenEnums["Visibility"] | null // Visibility
  }
}

export interface NexusGenEnums {
  AccountType: "TRADITIONAL" | "WALLET"
  Category:
    | "Animals"
    | "Children"
    | "Education"
    | "Entertainment"
    | "Food"
    | "Gaming"
    | "LifeStyle"
    | "Men"
    | "Movies"
    | "Music"
    | "News"
    | "Other"
    | "Programming"
    | "Science"
    | "Sports"
    | "Technology"
    | "Travel"
    | "Vehicles"
    | "Women"
  CommentType: "COMMENT" | "PUBLISH"
  PublishKind: "Adds" | "Blog" | "Podcast" | "Short" | "Video"
  QueryPublishKind: "adds" | "all" | "blogs" | "podcasts" | "videos"
  ThumbSource: "custom" | "generated"
  ThumbnailSource: "custom" | "generated"
  Visibility: "draft" | "private" | "public"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  Account: {
    // root type
    authUid?: string | null // String
    createdAt: NexusGenScalars["DateTime"] // DateTime!
    id: string // ID!
    owner: string // String!
    type: NexusGenEnums["AccountType"] // AccountType!
    updatedAt?: NexusGenScalars["DateTime"] | null // DateTime
  }
  CalculateTipsResult: {
    // root type
    tips: number // Int!
  }
  Comment: {
    // root type
    commentId?: string | null // String
    commentType: NexusGenEnums["CommentType"] // CommentType!
    content: string // String!
    createdAt: NexusGenScalars["DateTime"] // DateTime!
    creatorId: string // String!
    id: string // ID!
    publishId: string // String!
    updatedAt?: NexusGenScalars["DateTime"] | null // DateTime
  }
  CommentDisLike: {
    // root type
    commentId: string // String!
    stationId: string // String!
  }
  CommentLike: {
    // root type
    commentId: string // String!
    stationId: string // String!
  }
  CreateDraftPublishResult: {
    // root type
    filename?: string | null // String
    id: string // String!
  }
  CreateWalletResult: {
    // root type
    address: string // String!
    uid: string // String!
  }
  DisLike: {
    // root type
    createdAt: NexusGenScalars["DateTime"] // DateTime!
    publishId: string // String!
    stationId: string // String!
  }
  FetchPublishesResponse: {
    // root type
    edges: NexusGenRootTypes["PublishEdge"][] // [PublishEdge!]!
    pageInfo: NexusGenRootTypes["PageInfo"] // PageInfo!
  }
  Follow: {
    // root type
    followerId: string // String!
    followingId: string // String!
  }
  Like: {
    // root type
    createdAt: NexusGenScalars["DateTime"] // DateTime!
    publishId: string // String!
    stationId: string // String!
  }
  MintStationNFTResult: {
    // root type
    tokenId: number // Int!
  }
  Mutation: {}
  PageInfo: {
    // root type
    endCursor?: string | null // String
    hasNextPage?: boolean | null // Boolean
  }
  PlaybackLink: {
    // root type
    createdAt: NexusGenScalars["DateTime"] // DateTime!
    dash: string // String!
    duration: number // Float!
    hls: string // String!
    id: string // ID!
    preview: string // String!
    publishId: string // String!
    thumbnail: string // String!
    updatedAt?: NexusGenScalars["DateTime"] | null // DateTime
    videoId: string // String!
  }
  Publish: {
    // root type
    contentRef?: string | null // String
    contentURI?: string | null // String
    createdAt: NexusGenScalars["DateTime"] // DateTime!
    creatorId: string // String!
    description?: string | null // String
    filename?: string | null // String
    id: string // ID!
    kind?: NexusGenEnums["PublishKind"] | null // PublishKind
    primaryCategory?: NexusGenEnums["Category"] | null // Category
    secondaryCategory?: NexusGenEnums["Category"] | null // Category
    thumbSource: NexusGenEnums["ThumbnailSource"] // ThumbnailSource!
    thumbnail?: string | null // String
    thumbnailRef?: string | null // String
    title?: string | null // String
    transcodeError: boolean // Boolean!
    updatedAt?: NexusGenScalars["DateTime"] | null // DateTime
    uploadError: boolean // Boolean!
    uploading: boolean // Boolean!
    views: number // Int!
    visibility: NexusGenEnums["Visibility"] // Visibility!
  }
  PublishEdge: {
    // root type
    cursor?: string | null // String
    node?: NexusGenRootTypes["Publish"] | null // Publish
  }
  Query: {}
  SendTipsResult: {
    // root type
    amount: string // String!
    fee: string // String!
    from: string // String!
    to: string // String!
  }
  Station: {
    // root type
    accountId: string // String!
    bannerImage?: string | null // String
    bannerImageRef?: string | null // String
    createdAt: NexusGenScalars["DateTime"] // DateTime!
    defaultColor?: string | null // String
    displayName: string // String!
    id: string // ID!
    image?: string | null // String
    imageRef?: string | null // String
    name: string // String!
    owner: string // String!
    tokenId?: number | null // Int
    updatedAt?: NexusGenScalars["DateTime"] | null // DateTime
  }
  Tip: {
    // root type
    amount: string // String!
    createdAt: NexusGenScalars["DateTime"] // DateTime!
    fee: string // String!
    from: string // String!
    id: string // ID!
    publishId: string // String!
    receiverId: string // String!
    senderId: string // String!
    to: string // String!
  }
  WatchLater: {
    // root type
    createdAt: NexusGenScalars["DateTime"] // DateTime!
    id: string // ID!
    publishId: string // String!
    stationId: string // String!
  }
  WriteResult: {
    // root type
    status: string // String!
  }
}

export interface NexusGenInterfaces {}

export interface NexusGenUnions {}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes &
  NexusGenScalars &
  NexusGenEnums

export interface NexusGenFieldTypes {
  Account: {
    // field return type
    authUid: string | null // String
    createdAt: NexusGenScalars["DateTime"] // DateTime!
    defaultStation: NexusGenRootTypes["Station"] | null // Station
    id: string // ID!
    owner: string // String!
    stations: NexusGenRootTypes["Station"][] // [Station!]!
    type: NexusGenEnums["AccountType"] // AccountType!
    updatedAt: NexusGenScalars["DateTime"] | null // DateTime
  }
  CalculateTipsResult: {
    // field return type
    tips: number // Int!
  }
  Comment: {
    // field return type
    comment: NexusGenRootTypes["Comment"] | null // Comment
    commentId: string | null // String
    commentType: NexusGenEnums["CommentType"] // CommentType!
    comments: NexusGenRootTypes["Comment"][] // [Comment!]!
    commentsCount: number // Int!
    content: string // String!
    createdAt: NexusGenScalars["DateTime"] // DateTime!
    creator: NexusGenRootTypes["Station"] // Station!
    creatorId: string // String!
    disLiked: boolean | null // Boolean
    disLikes: NexusGenRootTypes["CommentDisLike"][] // [CommentDisLike!]!
    disLikesCount: number // Int!
    id: string // ID!
    liked: boolean | null // Boolean
    likes: NexusGenRootTypes["CommentLike"][] // [CommentLike!]!
    likesCount: number // Int!
    publish: NexusGenRootTypes["Publish"] // Publish!
    publishId: string // String!
    updatedAt: NexusGenScalars["DateTime"] | null // DateTime
  }
  CommentDisLike: {
    // field return type
    comment: NexusGenRootTypes["Comment"] // Comment!
    commentId: string // String!
    station: NexusGenRootTypes["Station"] // Station!
    stationId: string // String!
  }
  CommentLike: {
    // field return type
    comment: NexusGenRootTypes["Comment"] // Comment!
    commentId: string // String!
    station: NexusGenRootTypes["Station"] // Station!
    stationId: string // String!
  }
  CreateDraftPublishResult: {
    // field return type
    filename: string | null // String
    id: string // String!
  }
  CreateWalletResult: {
    // field return type
    address: string // String!
    uid: string // String!
  }
  DisLike: {
    // field return type
    createdAt: NexusGenScalars["DateTime"] // DateTime!
    publish: NexusGenRootTypes["Publish"] // Publish!
    publishId: string // String!
    station: NexusGenRootTypes["Station"] // Station!
    stationId: string // String!
  }
  FetchPublishesResponse: {
    // field return type
    edges: NexusGenRootTypes["PublishEdge"][] // [PublishEdge!]!
    pageInfo: NexusGenRootTypes["PageInfo"] // PageInfo!
  }
  Follow: {
    // field return type
    follower: NexusGenRootTypes["Station"] // Station!
    followerId: string // String!
    following: NexusGenRootTypes["Station"] // Station!
    followingId: string // String!
  }
  Like: {
    // field return type
    createdAt: NexusGenScalars["DateTime"] // DateTime!
    publish: NexusGenRootTypes["Publish"] // Publish!
    publishId: string // String!
    station: NexusGenRootTypes["Station"] // Station!
    stationId: string // String!
  }
  MintStationNFTResult: {
    // field return type
    tokenId: number // Int!
  }
  Mutation: {
    // field return type
    addToWatchLater: NexusGenRootTypes["WriteResult"] | null // WriteResult
    cacheSession: NexusGenRootTypes["WriteResult"] // WriteResult!
    calculateTips: NexusGenRootTypes["CalculateTipsResult"] | null // CalculateTipsResult
    createAccount: NexusGenRootTypes["Account"] | null // Account
    createDraftPublish: NexusGenRootTypes["CreateDraftPublishResult"] | null // CreateDraftPublishResult
    createStation: NexusGenRootTypes["Station"] | null // Station
    createTip: NexusGenRootTypes["Tip"] | null // Tip
    mintFirstStationNFT: NexusGenRootTypes["MintStationNFTResult"] | null // MintStationNFTResult
    mintStationNFT: NexusGenRootTypes["MintStationNFTResult"] | null // MintStationNFTResult
    removeFromWatchLater: NexusGenRootTypes["WriteResult"] | null // WriteResult
    sendTips: NexusGenRootTypes["SendTipsResult"] | null // SendTipsResult
    updateBannerImage: NexusGenRootTypes["WriteResult"] | null // WriteResult
    updateDisplayName: NexusGenRootTypes["WriteResult"] | null // WriteResult
    updateProfileImage: NexusGenRootTypes["WriteResult"] | null // WriteResult
    updatePublish: NexusGenRootTypes["Publish"] | null // Publish
    validateDisplayName: boolean | null // Boolean
    validateName: boolean | null // Boolean
  }
  PageInfo: {
    // field return type
    endCursor: string | null // String
    hasNextPage: boolean | null // Boolean
  }
  PlaybackLink: {
    // field return type
    createdAt: NexusGenScalars["DateTime"] // DateTime!
    dash: string // String!
    duration: number // Float!
    hls: string // String!
    id: string // ID!
    preview: string // String!
    publish: NexusGenRootTypes["Publish"] | null // Publish
    publishId: string // String!
    thumbnail: string // String!
    updatedAt: NexusGenScalars["DateTime"] | null // DateTime
    videoId: string // String!
  }
  Publish: {
    // field return type
    comments: Array<NexusGenRootTypes["Comment"] | null> // [Comment]!
    commentsCount: number // Int!
    contentRef: string | null // String
    contentURI: string | null // String
    createdAt: NexusGenScalars["DateTime"] // DateTime!
    creator: NexusGenRootTypes["Station"] // Station!
    creatorId: string // String!
    description: string | null // String
    disLiked: boolean | null // Boolean
    disLikesCount: number // Int!
    dislikes: NexusGenRootTypes["DisLike"][] // [DisLike!]!
    filename: string | null // String
    id: string // ID!
    kind: NexusGenEnums["PublishKind"] | null // PublishKind
    lastComment: NexusGenRootTypes["Comment"] | null // Comment
    liked: boolean | null // Boolean
    likes: NexusGenRootTypes["Like"][] // [Like!]!
    likesCount: number // Int!
    playback: NexusGenRootTypes["PlaybackLink"] | null // PlaybackLink
    primaryCategory: NexusGenEnums["Category"] | null // Category
    secondaryCategory: NexusGenEnums["Category"] | null // Category
    thumbSource: NexusGenEnums["ThumbnailSource"] // ThumbnailSource!
    thumbnail: string | null // String
    thumbnailRef: string | null // String
    tips: Array<NexusGenRootTypes["Tip"] | null> // [Tip]!
    tipsCount: number // Int!
    title: string | null // String
    transcodeError: boolean // Boolean!
    updatedAt: NexusGenScalars["DateTime"] | null // DateTime
    uploadError: boolean // Boolean!
    uploading: boolean // Boolean!
    views: number // Int!
    visibility: NexusGenEnums["Visibility"] // Visibility!
  }
  PublishEdge: {
    // field return type
    cursor: string | null // String
    node: NexusGenRootTypes["Publish"] | null // Publish
  }
  Query: {
    // field return type
    fetchAllVideos: NexusGenRootTypes["FetchPublishesResponse"] | null // FetchPublishesResponse
    fetchMyPublishes: NexusGenRootTypes["FetchPublishesResponse"] | null // FetchPublishesResponse
    fetchVideosByCategory: NexusGenRootTypes["FetchPublishesResponse"] | null // FetchPublishesResponse
    getBalance: string // String!
    getMyAccount: NexusGenRootTypes["Account"] | null // Account
    getPublishById: NexusGenRootTypes["Publish"] | null // Publish
    getStationById: NexusGenRootTypes["Station"] | null // Station
    getStationByName: NexusGenRootTypes["Station"] | null // Station
    getWatchLater: Array<NexusGenRootTypes["WatchLater"] | null> // [WatchLater]!
    listCommentsByCommentId: Array<NexusGenRootTypes["Comment"] | null> // [Comment]!
    listCommentsByPublishId: Array<NexusGenRootTypes["Comment"] | null> // [Comment]!
  }
  SendTipsResult: {
    // field return type
    amount: string // String!
    fee: string // String!
    from: string // String!
    to: string // String!
  }
  Station: {
    // field return type
    account: NexusGenRootTypes["Account"] // Account!
    accountId: string // String!
    bannerImage: string | null // String
    bannerImageRef: string | null // String
    createdAt: NexusGenScalars["DateTime"] // DateTime!
    defaultColor: string | null // String
    displayName: string // String!
    followersCount: number // Int!
    followingCount: number // Int!
    id: string // ID!
    image: string | null // String
    imageRef: string | null // String
    isFollowing: boolean | null // Boolean
    isOwner: boolean | null // Boolean
    name: string // String!
    owner: string // String!
    publishes: NexusGenRootTypes["Publish"][] // [Publish!]!
    publishesCount: number // Int!
    tokenId: number | null // Int
    updatedAt: NexusGenScalars["DateTime"] | null // DateTime
  }
  Tip: {
    // field return type
    amount: string // String!
    createdAt: NexusGenScalars["DateTime"] // DateTime!
    fee: string // String!
    from: string // String!
    id: string // ID!
    publish: NexusGenRootTypes["Publish"] // Publish!
    publishId: string // String!
    receiver: NexusGenRootTypes["Station"] // Station!
    receiverId: string // String!
    sender: NexusGenRootTypes["Station"] // Station!
    senderId: string // String!
    to: string // String!
  }
  WatchLater: {
    // field return type
    createdAt: NexusGenScalars["DateTime"] // DateTime!
    id: string // ID!
    publish: NexusGenRootTypes["Publish"] // Publish!
    publishId: string // String!
    station: NexusGenRootTypes["Station"] // Station!
    stationId: string // String!
  }
  WriteResult: {
    // field return type
    status: string // String!
  }
}

export interface NexusGenFieldTypeNames {
  Account: {
    // field return type name
    authUid: "String"
    createdAt: "DateTime"
    defaultStation: "Station"
    id: "ID"
    owner: "String"
    stations: "Station"
    type: "AccountType"
    updatedAt: "DateTime"
  }
  CalculateTipsResult: {
    // field return type name
    tips: "Int"
  }
  Comment: {
    // field return type name
    comment: "Comment"
    commentId: "String"
    commentType: "CommentType"
    comments: "Comment"
    commentsCount: "Int"
    content: "String"
    createdAt: "DateTime"
    creator: "Station"
    creatorId: "String"
    disLiked: "Boolean"
    disLikes: "CommentDisLike"
    disLikesCount: "Int"
    id: "ID"
    liked: "Boolean"
    likes: "CommentLike"
    likesCount: "Int"
    publish: "Publish"
    publishId: "String"
    updatedAt: "DateTime"
  }
  CommentDisLike: {
    // field return type name
    comment: "Comment"
    commentId: "String"
    station: "Station"
    stationId: "String"
  }
  CommentLike: {
    // field return type name
    comment: "Comment"
    commentId: "String"
    station: "Station"
    stationId: "String"
  }
  CreateDraftPublishResult: {
    // field return type name
    filename: "String"
    id: "String"
  }
  CreateWalletResult: {
    // field return type name
    address: "String"
    uid: "String"
  }
  DisLike: {
    // field return type name
    createdAt: "DateTime"
    publish: "Publish"
    publishId: "String"
    station: "Station"
    stationId: "String"
  }
  FetchPublishesResponse: {
    // field return type name
    edges: "PublishEdge"
    pageInfo: "PageInfo"
  }
  Follow: {
    // field return type name
    follower: "Station"
    followerId: "String"
    following: "Station"
    followingId: "String"
  }
  Like: {
    // field return type name
    createdAt: "DateTime"
    publish: "Publish"
    publishId: "String"
    station: "Station"
    stationId: "String"
  }
  MintStationNFTResult: {
    // field return type name
    tokenId: "Int"
  }
  Mutation: {
    // field return type name
    addToWatchLater: "WriteResult"
    cacheSession: "WriteResult"
    calculateTips: "CalculateTipsResult"
    createAccount: "Account"
    createDraftPublish: "CreateDraftPublishResult"
    createStation: "Station"
    createTip: "Tip"
    mintFirstStationNFT: "MintStationNFTResult"
    mintStationNFT: "MintStationNFTResult"
    removeFromWatchLater: "WriteResult"
    sendTips: "SendTipsResult"
    updateBannerImage: "WriteResult"
    updateDisplayName: "WriteResult"
    updateProfileImage: "WriteResult"
    updatePublish: "Publish"
    validateDisplayName: "Boolean"
    validateName: "Boolean"
  }
  PageInfo: {
    // field return type name
    endCursor: "String"
    hasNextPage: "Boolean"
  }
  PlaybackLink: {
    // field return type name
    createdAt: "DateTime"
    dash: "String"
    duration: "Float"
    hls: "String"
    id: "ID"
    preview: "String"
    publish: "Publish"
    publishId: "String"
    thumbnail: "String"
    updatedAt: "DateTime"
    videoId: "String"
  }
  Publish: {
    // field return type name
    comments: "Comment"
    commentsCount: "Int"
    contentRef: "String"
    contentURI: "String"
    createdAt: "DateTime"
    creator: "Station"
    creatorId: "String"
    description: "String"
    disLiked: "Boolean"
    disLikesCount: "Int"
    dislikes: "DisLike"
    filename: "String"
    id: "ID"
    kind: "PublishKind"
    lastComment: "Comment"
    liked: "Boolean"
    likes: "Like"
    likesCount: "Int"
    playback: "PlaybackLink"
    primaryCategory: "Category"
    secondaryCategory: "Category"
    thumbSource: "ThumbnailSource"
    thumbnail: "String"
    thumbnailRef: "String"
    tips: "Tip"
    tipsCount: "Int"
    title: "String"
    transcodeError: "Boolean"
    updatedAt: "DateTime"
    uploadError: "Boolean"
    uploading: "Boolean"
    views: "Int"
    visibility: "Visibility"
  }
  PublishEdge: {
    // field return type name
    cursor: "String"
    node: "Publish"
  }
  Query: {
    // field return type name
    fetchAllVideos: "FetchPublishesResponse"
    fetchMyPublishes: "FetchPublishesResponse"
    fetchVideosByCategory: "FetchPublishesResponse"
    getBalance: "String"
    getMyAccount: "Account"
    getPublishById: "Publish"
    getStationById: "Station"
    getStationByName: "Station"
    getWatchLater: "WatchLater"
    listCommentsByCommentId: "Comment"
    listCommentsByPublishId: "Comment"
  }
  SendTipsResult: {
    // field return type name
    amount: "String"
    fee: "String"
    from: "String"
    to: "String"
  }
  Station: {
    // field return type name
    account: "Account"
    accountId: "String"
    bannerImage: "String"
    bannerImageRef: "String"
    createdAt: "DateTime"
    defaultColor: "String"
    displayName: "String"
    followersCount: "Int"
    followingCount: "Int"
    id: "ID"
    image: "String"
    imageRef: "String"
    isFollowing: "Boolean"
    isOwner: "Boolean"
    name: "String"
    owner: "String"
    publishes: "Publish"
    publishesCount: "Int"
    tokenId: "Int"
    updatedAt: "DateTime"
  }
  Tip: {
    // field return type name
    amount: "String"
    createdAt: "DateTime"
    fee: "String"
    from: "String"
    id: "ID"
    publish: "Publish"
    publishId: "String"
    receiver: "Station"
    receiverId: "String"
    sender: "Station"
    senderId: "String"
    to: "String"
  }
  WatchLater: {
    // field return type name
    createdAt: "DateTime"
    id: "ID"
    publish: "Publish"
    publishId: "String"
    station: "Station"
    stationId: "String"
  }
  WriteResult: {
    // field return type name
    status: "String"
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    addToWatchLater: {
      // args
      input: NexusGenInputs["SavePublishToPlayListInput"] // SavePublishToPlayListInput!
    }
    cacheSession: {
      // args
      input: NexusGenInputs["CacheSessionInput"] // CacheSessionInput!
    }
    calculateTips: {
      // args
      qty: number // Int!
    }
    createAccount: {
      // args
      input: NexusGenInputs["GetMyAccountInput"] // GetMyAccountInput!
    }
    createDraftPublish: {
      // args
      input: NexusGenInputs["CreateDraftPublishInput"] // CreateDraftPublishInput!
    }
    createStation: {
      // args
      input: NexusGenInputs["CreateStationInput"] // CreateStationInput!
    }
    createTip: {
      // args
      input: NexusGenInputs["CreateTipInput"] // CreateTipInput!
    }
    mintFirstStationNFT: {
      // args
      input: NexusGenInputs["MintStationNFTInput"] // MintStationNFTInput!
    }
    mintStationNFT: {
      // args
      input: NexusGenInputs["MintStationNFTInput"] // MintStationNFTInput!
    }
    removeFromWatchLater: {
      // args
      input: NexusGenInputs["RemovePublishToPlayListInput"] // RemovePublishToPlayListInput!
    }
    sendTips: {
      // args
      input: NexusGenInputs["SendTipsInput"] // SendTipsInput!
    }
    updateBannerImage: {
      // args
      input: NexusGenInputs["UpdateImageInput"] // UpdateImageInput!
    }
    updateDisplayName: {
      // args
      input: NexusGenInputs["UpdateDisplayNameInput"] // UpdateDisplayNameInput!
    }
    updateProfileImage: {
      // args
      input: NexusGenInputs["UpdateImageInput"] // UpdateImageInput!
    }
    updatePublish: {
      // args
      input: NexusGenInputs["UpdatePublishInput"] // UpdatePublishInput!
    }
    validateDisplayName: {
      // args
      name: string // String!
    }
    validateName: {
      // args
      name: string // String!
    }
  }
  Query: {
    fetchAllVideos: {
      // args
      input: NexusGenInputs["FetchPublishesInput"] // FetchPublishesInput!
    }
    fetchMyPublishes: {
      // args
      input: NexusGenInputs["FetchMyPublishesInput"] // FetchMyPublishesInput!
    }
    fetchVideosByCategory: {
      // args
      input: NexusGenInputs["FetchPublishesByCatInput"] // FetchPublishesByCatInput!
    }
    getBalance: {
      // args
      address: string // String!
    }
    getMyAccount: {
      // args
      input: NexusGenInputs["GetMyAccountInput"] // GetMyAccountInput!
    }
    getPublishById: {
      // args
      input: NexusGenInputs["QueryByIdInput"] // QueryByIdInput!
    }
    getStationById: {
      // args
      input: NexusGenInputs["QueryByIdInput"] // QueryByIdInput!
    }
    getStationByName: {
      // args
      input: NexusGenInputs["QueryByNameInput"] // QueryByNameInput!
    }
    getWatchLater: {
      // args
      input: NexusGenInputs["GetWatchLaterInput"] // GetWatchLaterInput!
    }
    listCommentsByCommentId: {
      // args
      input: NexusGenInputs["QueryByIdInput"] // QueryByIdInput!
    }
    listCommentsByPublishId: {
      // args
      input: NexusGenInputs["QueryByIdInput"] // QueryByIdInput!
    }
  }
}

export interface NexusGenAbstractTypeMembers {}

export interface NexusGenTypeInterfaces {}

export type NexusGenObjectNames = keyof NexusGenObjects

export type NexusGenInputNames = keyof NexusGenInputs

export type NexusGenEnumNames = keyof NexusGenEnums

export type NexusGenInterfaceNames = never

export type NexusGenScalarNames = keyof NexusGenScalars

export type NexusGenUnionNames = never

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never

export type NexusGenAbstractsUsingStrategyResolveType = never

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  // context: Context;
  inputTypes: NexusGenInputs
  rootTypes: NexusGenRootTypes
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars
  argTypes: NexusGenArgTypes
  fieldTypes: NexusGenFieldTypes
  fieldTypeNames: NexusGenFieldTypeNames
  allTypes: NexusGenAllTypes
  typeInterfaces: NexusGenTypeInterfaces
  objectNames: NexusGenObjectNames
  inputNames: NexusGenInputNames
  enumNames: NexusGenEnumNames
  interfaceNames: NexusGenInterfaceNames
  scalarNames: NexusGenScalarNames
  unionNames: NexusGenUnionNames
  allInputTypes:
    | NexusGenTypes["inputNames"]
    | NexusGenTypes["enumNames"]
    | NexusGenTypes["scalarNames"]
  allOutputTypes:
    | NexusGenTypes["objectNames"]
    | NexusGenTypes["enumNames"]
    | NexusGenTypes["unionNames"]
    | NexusGenTypes["interfaceNames"]
    | NexusGenTypes["scalarNames"]
  allNamedTypes:
    | NexusGenTypes["allInputTypes"]
    | NexusGenTypes["allOutputTypes"]
  abstractTypes: NexusGenTypes["interfaceNames"] | NexusGenTypes["unionNames"]
  abstractTypeMembers: NexusGenAbstractTypeMembers
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType
  features: NexusGenFeaturesConfig
}

declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {}
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {}
  interface NexusGenPluginFieldConfig<
    TypeName extends string,
    FieldName extends string
  > {}
  interface NexusGenPluginInputFieldConfig<
    TypeName extends string,
    FieldName extends string
  > {}
  interface NexusGenPluginSchemaConfig {}
  interface NexusGenPluginArgConfig {}
}
