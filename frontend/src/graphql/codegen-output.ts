import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};


export type ErrorOrSuccess = {
  __typename?: 'ErrorOrSuccess';
  error?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['String']>;
};

export type List = {
  __typename?: 'List';
  _id: Scalars['ID'];
  owner: Scalars['String'];
  name: Scalars['String'];
  from: Scalars['String'];
  to: Array<Scalars['String']>;
  terms: Array<TermsUnion>;
  sessions?: Maybe<Array<ReviewSession>>;
  created: Scalars['DateTime'];
  lastReviewed: Scalars['DateTime'];
  setMembership: Array<Scalars['String']>;
  state: ListState;
};


export type ListTermsArgs = {
  populate?: Maybe<Scalars['Boolean']>;
};

export type ListState = {
  __typename?: 'ListState';
  forwards: Scalars['String'];
  backwards: Scalars['String'];
};

export type MaybeList = {
  __typename?: 'MaybeList';
  list?: Maybe<List>;
  error?: Maybe<Scalars['String']>;
};

export type MaybeUser = {
  __typename?: 'MaybeUser';
  error?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteList: SuccessOrError;
  createList: MaybeList;
  createUser: MaybeUser;
  /** Login mutation */
  login: MaybeUser;
  updateTerms: Scalars['Int'];
  editTerms: Scalars['Int'];
  createTerms: ErrorOrSuccess;
  deleteTermsFromList: ErrorOrSuccess;
};


export type MutationDeleteListArgs = {
  listId: Scalars['String'];
};


export type MutationCreateListArgs = {
  newList: NewListFromClientInput;
};


export type MutationCreateUserArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdateTermsArgs = {
  updateObj: Array<TermUpdateObject>;
};


export type MutationEditTermsArgs = {
  updateObj: Array<TermEditObject>;
};


export type MutationCreateTermsArgs = {
  terms: Array<NewTermFromClient>;
};


export type MutationDeleteTermsFromListArgs = {
  ids: Array<Scalars['String']>;
  remainingTermIds?: Maybe<Array<Scalars['String']>>;
  listId: Scalars['String'];
};

export type NewListFromClientInput = {
  owner: Scalars['String'];
  name: Scalars['String'];
  from: Scalars['String'];
  to: Scalars['String'];
  terms: Array<NewListTermInput>;
};

export type NewListTermInput = {
  from: Scalars['String'];
  to: Scalars['String'];
};

/** New term created client-side, excludes history and saturation fields, since those don't exist yet for the term */
export type NewTermFromClient = {
  to: Scalars['String'];
  from: Scalars['String'];
  languages: TermLanguagesInput;
  owner: Scalars['String'];
  saturation: TermSaturationInput;
  listMembership: Array<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** Find lists by user */
  listsByUser: Array<List>;
  /** Query lists by id */
  listsById: Array<List>;
  users: Array<User>;
  /** Returns currently logged in user.  */
  me: MaybeUser;
};


export type QueryListsByUserArgs = {
  populate?: Maybe<Array<Scalars['String']>>;
  owner: Scalars['String'];
};


export type QueryListsByIdArgs = {
  populate?: Maybe<Array<Scalars['String']>>;
  ids: Array<Scalars['String']>;
};

export type ReviewDate = {
  __typename?: 'ReviewDate';
  start: Scalars['DateTime'];
  end: Scalars['DateTime'];
};

export type ReviewSession = {
  __typename?: 'ReviewSession';
  _id: Scalars['ID'];
  owner: Scalars['String'];
  listIds?: Maybe<Array<List>>;
  date: ReviewDate;
  terms: ReviewSessionTerms;
  settings: ReviewSettings;
};

export type ReviewSessionTerms = {
  __typename?: 'ReviewSessionTerms';
  listId: List;
  termIds: Term;
};

export type ReviewSettings = {
  __typename?: 'ReviewSettings';
  direction: Scalars['String'];
  n: Scalars['Float'];
  sessionStart: Scalars['DateTime'];
  sessionEnd: Scalars['DateTime'];
  started: Scalars['Boolean'];
  ended: Scalars['Boolean'];
};

export type SuccessOrError = {
  __typename?: 'SuccessOrError';
  success?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['Boolean']>;
};

export type Term = {
  __typename?: 'Term';
  _id: Scalars['ID'];
  owner: Scalars['String'];
  languages?: Maybe<TermLanguages>;
  to: Scalars['String'];
  from: Scalars['String'];
  history?: Maybe<Array<TermHistory>>;
  saturation: TermSaturation;
  listMembership?: Maybe<Array<List>>;
};

export type TermEditObject = {
  _id: Scalars['String'];
  to?: Maybe<Scalars['String']>;
  from?: Maybe<Scalars['String']>;
};

export type TermHistory = {
  __typename?: 'TermHistory';
  date: Scalars['DateTime'];
  content: Array<Scalars['String']>;
  direction: Scalars['String'];
};

export type TermHistoryInput = {
  date: Scalars['DateTime'];
  content: Array<Scalars['String']>;
  direction: Scalars['String'];
};

export type TermId = {
  __typename?: 'TermId';
  _id: Scalars['ID'];
};

export type TermLanguages = {
  __typename?: 'TermLanguages';
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
};

export type TermLanguagesInput = {
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
};

export type TermSaturation = {
  __typename?: 'TermSaturation';
  forwards?: Maybe<Scalars['Float']>;
  backwards?: Maybe<Scalars['Float']>;
};

export type TermSaturationInput = {
  forwards?: Maybe<Scalars['Float']>;
  backwards?: Maybe<Scalars['Float']>;
};

export type TermUpdateObject = {
  _id: Scalars['String'];
  history?: Maybe<TermHistoryInput>;
  saturation?: Maybe<TermSaturationInput>;
};

export type TermsUnion = Term | TermId;

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  username: Scalars['String'];
  lists?: Maybe<Array<Scalars['String']>>;
  currentSession: Scalars['String'];
  password: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  ErrorOrSuccess: ResolverTypeWrapper<ErrorOrSuccess>;
  String: ResolverTypeWrapper<Scalars['String']>;
  List: ResolverTypeWrapper<Omit<List, 'terms'> & { terms: Array<ResolversTypes['TermsUnion']> }>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ListState: ResolverTypeWrapper<ListState>;
  MaybeList: ResolverTypeWrapper<MaybeList>;
  MaybeUser: ResolverTypeWrapper<MaybeUser>;
  Mutation: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  NewListFromClientInput: NewListFromClientInput;
  NewListTermInput: NewListTermInput;
  NewTermFromClient: NewTermFromClient;
  Query: ResolverTypeWrapper<{}>;
  ReviewDate: ResolverTypeWrapper<ReviewDate>;
  ReviewSession: ResolverTypeWrapper<ReviewSession>;
  ReviewSessionTerms: ResolverTypeWrapper<ReviewSessionTerms>;
  ReviewSettings: ResolverTypeWrapper<ReviewSettings>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  SuccessOrError: ResolverTypeWrapper<SuccessOrError>;
  Term: ResolverTypeWrapper<Term>;
  TermEditObject: TermEditObject;
  TermHistory: ResolverTypeWrapper<TermHistory>;
  TermHistoryInput: TermHistoryInput;
  TermId: ResolverTypeWrapper<TermId>;
  TermLanguages: ResolverTypeWrapper<TermLanguages>;
  TermLanguagesInput: TermLanguagesInput;
  TermSaturation: ResolverTypeWrapper<TermSaturation>;
  TermSaturationInput: TermSaturationInput;
  TermUpdateObject: TermUpdateObject;
  TermsUnion: ResolversTypes['Term'] | ResolversTypes['TermId'];
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  DateTime: Scalars['DateTime'];
  ErrorOrSuccess: ErrorOrSuccess;
  String: Scalars['String'];
  List: Omit<List, 'terms'> & { terms: Array<ResolversParentTypes['TermsUnion']> };
  ID: Scalars['ID'];
  Boolean: Scalars['Boolean'];
  ListState: ListState;
  MaybeList: MaybeList;
  MaybeUser: MaybeUser;
  Mutation: {};
  Int: Scalars['Int'];
  NewListFromClientInput: NewListFromClientInput;
  NewListTermInput: NewListTermInput;
  NewTermFromClient: NewTermFromClient;
  Query: {};
  ReviewDate: ReviewDate;
  ReviewSession: ReviewSession;
  ReviewSessionTerms: ReviewSessionTerms;
  ReviewSettings: ReviewSettings;
  Float: Scalars['Float'];
  SuccessOrError: SuccessOrError;
  Term: Term;
  TermEditObject: TermEditObject;
  TermHistory: TermHistory;
  TermHistoryInput: TermHistoryInput;
  TermId: TermId;
  TermLanguages: TermLanguages;
  TermLanguagesInput: TermLanguagesInput;
  TermSaturation: TermSaturation;
  TermSaturationInput: TermSaturationInput;
  TermUpdateObject: TermUpdateObject;
  TermsUnion: ResolversParentTypes['Term'] | ResolversParentTypes['TermId'];
  User: User;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type ErrorOrSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['ErrorOrSuccess'] = ResolversParentTypes['ErrorOrSuccess']> = {
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ListResolvers<ContextType = any, ParentType extends ResolversParentTypes['List'] = ResolversParentTypes['List']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  terms?: Resolver<Array<ResolversTypes['TermsUnion']>, ParentType, ContextType, RequireFields<ListTermsArgs, never>>;
  sessions?: Resolver<Maybe<Array<ResolversTypes['ReviewSession']>>, ParentType, ContextType>;
  created?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  lastReviewed?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  setMembership?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<ResolversTypes['ListState'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ListStateResolvers<ContextType = any, ParentType extends ResolversParentTypes['ListState'] = ResolversParentTypes['ListState']> = {
  forwards?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  backwards?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MaybeListResolvers<ContextType = any, ParentType extends ResolversParentTypes['MaybeList'] = ResolversParentTypes['MaybeList']> = {
  list?: Resolver<Maybe<ResolversTypes['List']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MaybeUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['MaybeUser'] = ResolversParentTypes['MaybeUser']> = {
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  deleteList?: Resolver<ResolversTypes['SuccessOrError'], ParentType, ContextType, RequireFields<MutationDeleteListArgs, 'listId'>>;
  createList?: Resolver<ResolversTypes['MaybeList'], ParentType, ContextType, RequireFields<MutationCreateListArgs, 'newList'>>;
  createUser?: Resolver<ResolversTypes['MaybeUser'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'password' | 'username'>>;
  login?: Resolver<ResolversTypes['MaybeUser'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'password' | 'username'>>;
  updateTerms?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationUpdateTermsArgs, 'updateObj'>>;
  editTerms?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationEditTermsArgs, 'updateObj'>>;
  createTerms?: Resolver<ResolversTypes['ErrorOrSuccess'], ParentType, ContextType, RequireFields<MutationCreateTermsArgs, 'terms'>>;
  deleteTermsFromList?: Resolver<ResolversTypes['ErrorOrSuccess'], ParentType, ContextType, RequireFields<MutationDeleteTermsFromListArgs, 'ids' | 'listId'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  listsByUser?: Resolver<Array<ResolversTypes['List']>, ParentType, ContextType, RequireFields<QueryListsByUserArgs, 'owner'>>;
  listsById?: Resolver<Array<ResolversTypes['List']>, ParentType, ContextType, RequireFields<QueryListsByIdArgs, 'ids'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  me?: Resolver<ResolversTypes['MaybeUser'], ParentType, ContextType>;
};

export type ReviewDateResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReviewDate'] = ResolversParentTypes['ReviewDate']> = {
  start?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  end?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReviewSessionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReviewSession'] = ResolversParentTypes['ReviewSession']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  listIds?: Resolver<Maybe<Array<ResolversTypes['List']>>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['ReviewDate'], ParentType, ContextType>;
  terms?: Resolver<ResolversTypes['ReviewSessionTerms'], ParentType, ContextType>;
  settings?: Resolver<ResolversTypes['ReviewSettings'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReviewSessionTermsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReviewSessionTerms'] = ResolversParentTypes['ReviewSessionTerms']> = {
  listId?: Resolver<ResolversTypes['List'], ParentType, ContextType>;
  termIds?: Resolver<ResolversTypes['Term'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReviewSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReviewSettings'] = ResolversParentTypes['ReviewSettings']> = {
  direction?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  n?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sessionStart?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  sessionEnd?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  started?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  ended?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SuccessOrErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['SuccessOrError'] = ResolversParentTypes['SuccessOrError']> = {
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TermResolvers<ContextType = any, ParentType extends ResolversParentTypes['Term'] = ResolversParentTypes['Term']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  languages?: Resolver<Maybe<ResolversTypes['TermLanguages']>, ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  history?: Resolver<Maybe<Array<ResolversTypes['TermHistory']>>, ParentType, ContextType>;
  saturation?: Resolver<ResolversTypes['TermSaturation'], ParentType, ContextType>;
  listMembership?: Resolver<Maybe<Array<ResolversTypes['List']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TermHistoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['TermHistory'] = ResolversParentTypes['TermHistory']> = {
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  content?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  direction?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TermIdResolvers<ContextType = any, ParentType extends ResolversParentTypes['TermId'] = ResolversParentTypes['TermId']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TermLanguagesResolvers<ContextType = any, ParentType extends ResolversParentTypes['TermLanguages'] = ResolversParentTypes['TermLanguages']> = {
  from?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TermSaturationResolvers<ContextType = any, ParentType extends ResolversParentTypes['TermSaturation'] = ResolversParentTypes['TermSaturation']> = {
  forwards?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  backwards?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TermsUnionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TermsUnion'] = ResolversParentTypes['TermsUnion']> = {
  __resolveType: TypeResolveFn<'Term' | 'TermId', ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lists?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  currentSession?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType;
  ErrorOrSuccess?: ErrorOrSuccessResolvers<ContextType>;
  List?: ListResolvers<ContextType>;
  ListState?: ListStateResolvers<ContextType>;
  MaybeList?: MaybeListResolvers<ContextType>;
  MaybeUser?: MaybeUserResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ReviewDate?: ReviewDateResolvers<ContextType>;
  ReviewSession?: ReviewSessionResolvers<ContextType>;
  ReviewSessionTerms?: ReviewSessionTermsResolvers<ContextType>;
  ReviewSettings?: ReviewSettingsResolvers<ContextType>;
  SuccessOrError?: SuccessOrErrorResolvers<ContextType>;
  Term?: TermResolvers<ContextType>;
  TermHistory?: TermHistoryResolvers<ContextType>;
  TermId?: TermIdResolvers<ContextType>;
  TermLanguages?: TermLanguagesResolvers<ContextType>;
  TermSaturation?: TermSaturationResolvers<ContextType>;
  TermsUnion?: TermsUnionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
