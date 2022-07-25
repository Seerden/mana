import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type List = {
  __typename?: 'List';
  created_at: Scalars['Float'];
  from_language: Scalars['String'];
  last_reviewed?: Maybe<Scalars['Float']>;
  list_id: Scalars['Float'];
  name: Scalars['String'];
  terms: Array<Maybe<Term>>;
  to_language: Scalars['String'];
  user_id: Scalars['Float'];
};


export type ListTermsArgs = {
  populate?: Maybe<Scalars['Boolean']>;
};

export type ListAndTerms = {
  __typename?: 'ListAndTerms';
  list: List;
  terms: Array<Maybe<Term>>;
};

export type ListLanguageUpdateInput = {
  from_language?: Maybe<Scalars['String']>;
  list_id: Scalars['Int'];
  to_language?: Maybe<Scalars['String']>;
};

export type ListUpdatePayloadInput = {
  name: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createList: ListAndTerms;
  createSession: ReviewSession;
  createTerms: Array<Term>;
  createUser: User;
  deleteList: ListAndTerms;
  deleteTerms: Array<Term>;
  deleteUser: User;
  login: User;
  logout: Message;
  updateList?: Maybe<List>;
  updateListLanguage?: Maybe<List>;
  updatePassword: User;
  updateTermValues: Array<Term>;
  updateUsername: User;
};


export type MutationCreateListArgs = {
  newList: NewListWithTermsInput;
};


export type MutationCreateSessionArgs = {
  entries: Array<ReviewSessionEntryInput>;
  session: ReviewSessionInput;
};


export type MutationCreateTermsArgs = {
  terms: Array<TermWithoutIdInput>;
};


export type MutationCreateUserArgs = {
  userInput: UserInput;
};


export type MutationDeleteListArgs = {
  listIds: Array<Scalars['Int']>;
};


export type MutationDeleteTermsArgs = {
  termIds: Array<Scalars['Int']>;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdateListArgs = {
  list_id: Scalars['Float'];
  payload: ListUpdatePayloadInput;
  user_id: Scalars['Float'];
};


export type MutationUpdateListLanguageArgs = {
  payload: ListLanguageUpdateInput;
};


export type MutationUpdatePasswordArgs = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationUpdateTermValuesArgs = {
  updateOptions: Array<TermUpdateInput>;
};


export type MutationUpdateUsernameArgs = {
  username: Scalars['String'];
};

export type NewListWithTermsInput = {
  from_language: Scalars['String'];
  name: Scalars['String'];
  terms: Array<TermWithoutIdsInput>;
  to_language: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  listsById: Array<List>;
  listsByUser: Array<List>;
  me?: Maybe<User>;
  sessionEntriesByTermIds: Array<TermIdWithEntries>;
  sessionsById: Array<Maybe<ReviewSession>>;
  sessionsByUser: Array<Maybe<ReviewSession>>;
  users: Array<User>;
};


export type QueryListsByIdArgs = {
  list_ids: Array<Scalars['Int']>;
};


export type QuerySessionEntriesByTermIdsArgs = {
  termIds: Array<Scalars['Int']>;
};


export type QuerySessionsByIdArgs = {
  sessionIds: Array<Scalars['Int']>;
  user_id: Scalars['Float'];
};


export type QuerySessionsByUserArgs = {
  user_id: Scalars['Float'];
};

export type ReviewSession = {
  __typename?: 'ReviewSession';
  direction: Scalars['String'];
  end_date?: Maybe<Scalars['Int']>;
  list_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  n: Scalars['Int'];
  review_session_id: Scalars['Float'];
  saturation_threshold?: Maybe<Scalars['Int']>;
  set_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  start_date: Scalars['Int'];
  user_id: Scalars['Int'];
};

export type ReviewSessionEntry = {
  __typename?: 'ReviewSessionEntry';
  created_at: Scalars['Int'];
  direction: Scalars['String'];
  passfail: Scalars['String'];
  review_entry_id: Scalars['Int'];
  review_session_id: Scalars['Int'];
  term_id: Scalars['Int'];
  time_on_card: Scalars['Int'];
};

export type ReviewSessionEntryInput = {
  direction: Scalars['String'];
  passfail: Scalars['String'];
  term_id: Scalars['Int'];
  time_on_card: Scalars['Int'];
};

export type ReviewSessionInput = {
  direction: Scalars['String'];
  end_date?: Maybe<Scalars['Int']>;
  list_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  n: Scalars['Int'];
  saturation_threshold?: Maybe<Scalars['Int']>;
  set_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  start_date: Scalars['Int'];
  user_id: Scalars['Int'];
};

export type Term = {
  __typename?: 'Term';
  from_language: Scalars['String'];
  from_value: Scalars['String'];
  history?: Maybe<Array<ReviewSessionEntry>>;
  list_id: Scalars['Int'];
  saturation?: Maybe<TermSaturation>;
  term_id: Scalars['Int'];
  to_language: Scalars['String'];
  to_value: Scalars['String'];
  user_id: Scalars['Int'];
};


export type TermHistoryArgs = {
  populate?: Maybe<Scalars['Boolean']>;
};


export type TermSaturationArgs = {
  populate?: Maybe<Scalars['Boolean']>;
};

export type TermIdWithEntries = {
  __typename?: 'TermIdWithEntries';
  entries: Array<ReviewSessionEntry>;
  term_id: Scalars['Int'];
};

export type TermSaturation = {
  __typename?: 'TermSaturation';
  backwards: Scalars['Int'];
  forwards: Scalars['Int'];
  last_updated: Scalars['Float'];
  term_id: Scalars['Int'];
};

export type TermUpdateInput = {
  from_value?: Maybe<Scalars['String']>;
  term_id: Scalars['Int'];
  to_value?: Maybe<Scalars['String']>;
};

export type TermWithoutIdInput = {
  from_language: Scalars['String'];
  from_value: Scalars['String'];
  list_id: Scalars['Int'];
  to_language: Scalars['String'];
  to_value: Scalars['String'];
  user_id: Scalars['Int'];
};

export type TermWithoutIdsInput = {
  from_language: Scalars['String'];
  from_value: Scalars['String'];
  to_language: Scalars['String'];
  to_value: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  created_at: Scalars['Float'];
  password: Scalars['String'];
  user_id: Scalars['Float'];
  username: Scalars['String'];
};

export type UserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
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
  List: ResolverTypeWrapper<List>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ListAndTerms: ResolverTypeWrapper<ListAndTerms>;
  ListLanguageUpdateInput: ListLanguageUpdateInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  ListUpdatePayloadInput: ListUpdatePayloadInput;
  Message: ResolverTypeWrapper<Message>;
  Mutation: ResolverTypeWrapper<{}>;
  NewListWithTermsInput: NewListWithTermsInput;
  Query: ResolverTypeWrapper<{}>;
  ReviewSession: ResolverTypeWrapper<ReviewSession>;
  ReviewSessionEntry: ResolverTypeWrapper<ReviewSessionEntry>;
  ReviewSessionEntryInput: ReviewSessionEntryInput;
  ReviewSessionInput: ReviewSessionInput;
  Term: ResolverTypeWrapper<Term>;
  TermIdWithEntries: ResolverTypeWrapper<TermIdWithEntries>;
  TermSaturation: ResolverTypeWrapper<TermSaturation>;
  TermUpdateInput: TermUpdateInput;
  TermWithoutIdInput: TermWithoutIdInput;
  TermWithoutIdsInput: TermWithoutIdsInput;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  List: List;
  Float: Scalars['Float'];
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  ListAndTerms: ListAndTerms;
  ListLanguageUpdateInput: ListLanguageUpdateInput;
  Int: Scalars['Int'];
  ListUpdatePayloadInput: ListUpdatePayloadInput;
  Message: Message;
  Mutation: {};
  NewListWithTermsInput: NewListWithTermsInput;
  Query: {};
  ReviewSession: ReviewSession;
  ReviewSessionEntry: ReviewSessionEntry;
  ReviewSessionEntryInput: ReviewSessionEntryInput;
  ReviewSessionInput: ReviewSessionInput;
  Term: Term;
  TermIdWithEntries: TermIdWithEntries;
  TermSaturation: TermSaturation;
  TermUpdateInput: TermUpdateInput;
  TermWithoutIdInput: TermWithoutIdInput;
  TermWithoutIdsInput: TermWithoutIdsInput;
  User: User;
  UserInput: UserInput;
};

export type ListResolvers<ContextType = any, ParentType extends ResolversParentTypes['List'] = ResolversParentTypes['List']> = {
  created_at?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  from_language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  last_reviewed?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  list_id?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  terms?: Resolver<Array<Maybe<ResolversTypes['Term']>>, ParentType, ContextType, RequireFields<ListTermsArgs, never>>;
  to_language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ListAndTermsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ListAndTerms'] = ResolversParentTypes['ListAndTerms']> = {
  list?: Resolver<ResolversTypes['List'], ParentType, ContextType>;
  terms?: Resolver<Array<Maybe<ResolversTypes['Term']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createList?: Resolver<ResolversTypes['ListAndTerms'], ParentType, ContextType, RequireFields<MutationCreateListArgs, 'newList'>>;
  createSession?: Resolver<ResolversTypes['ReviewSession'], ParentType, ContextType, RequireFields<MutationCreateSessionArgs, 'entries' | 'session'>>;
  createTerms?: Resolver<Array<ResolversTypes['Term']>, ParentType, ContextType, RequireFields<MutationCreateTermsArgs, 'terms'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'userInput'>>;
  deleteList?: Resolver<ResolversTypes['ListAndTerms'], ParentType, ContextType, RequireFields<MutationDeleteListArgs, 'listIds'>>;
  deleteTerms?: Resolver<Array<ResolversTypes['Term']>, ParentType, ContextType, RequireFields<MutationDeleteTermsArgs, 'termIds'>>;
  deleteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  login?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'password' | 'username'>>;
  logout?: Resolver<ResolversTypes['Message'], ParentType, ContextType>;
  updateList?: Resolver<Maybe<ResolversTypes['List']>, ParentType, ContextType, RequireFields<MutationUpdateListArgs, 'list_id' | 'payload' | 'user_id'>>;
  updateListLanguage?: Resolver<Maybe<ResolversTypes['List']>, ParentType, ContextType, RequireFields<MutationUpdateListLanguageArgs, 'payload'>>;
  updatePassword?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdatePasswordArgs, 'currentPassword' | 'newPassword'>>;
  updateTermValues?: Resolver<Array<ResolversTypes['Term']>, ParentType, ContextType, RequireFields<MutationUpdateTermValuesArgs, 'updateOptions'>>;
  updateUsername?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUsernameArgs, 'username'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  listsById?: Resolver<Array<ResolversTypes['List']>, ParentType, ContextType, RequireFields<QueryListsByIdArgs, 'list_ids'>>;
  listsByUser?: Resolver<Array<ResolversTypes['List']>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  sessionEntriesByTermIds?: Resolver<Array<ResolversTypes['TermIdWithEntries']>, ParentType, ContextType, RequireFields<QuerySessionEntriesByTermIdsArgs, 'termIds'>>;
  sessionsById?: Resolver<Array<Maybe<ResolversTypes['ReviewSession']>>, ParentType, ContextType, RequireFields<QuerySessionsByIdArgs, 'sessionIds' | 'user_id'>>;
  sessionsByUser?: Resolver<Array<Maybe<ResolversTypes['ReviewSession']>>, ParentType, ContextType, RequireFields<QuerySessionsByUserArgs, 'user_id'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type ReviewSessionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReviewSession'] = ResolversParentTypes['ReviewSession']> = {
  direction?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  end_date?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  list_ids?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  n?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  review_session_id?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  saturation_threshold?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  set_ids?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  start_date?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReviewSessionEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReviewSessionEntry'] = ResolversParentTypes['ReviewSessionEntry']> = {
  created_at?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  direction?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  passfail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  review_entry_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  review_session_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  term_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  time_on_card?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TermResolvers<ContextType = any, ParentType extends ResolversParentTypes['Term'] = ResolversParentTypes['Term']> = {
  from_language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from_value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  history?: Resolver<Maybe<Array<ResolversTypes['ReviewSessionEntry']>>, ParentType, ContextType, RequireFields<TermHistoryArgs, never>>;
  list_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  saturation?: Resolver<Maybe<ResolversTypes['TermSaturation']>, ParentType, ContextType, RequireFields<TermSaturationArgs, never>>;
  term_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  to_language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to_value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TermIdWithEntriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['TermIdWithEntries'] = ResolversParentTypes['TermIdWithEntries']> = {
  entries?: Resolver<Array<ResolversTypes['ReviewSessionEntry']>, ParentType, ContextType>;
  term_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TermSaturationResolvers<ContextType = any, ParentType extends ResolversParentTypes['TermSaturation'] = ResolversParentTypes['TermSaturation']> = {
  backwards?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  forwards?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_updated?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  term_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  created_at?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  List?: ListResolvers<ContextType>;
  ListAndTerms?: ListAndTermsResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ReviewSession?: ReviewSessionResolvers<ContextType>;
  ReviewSessionEntry?: ReviewSessionEntryResolvers<ContextType>;
  Term?: TermResolvers<ContextType>;
  TermIdWithEntries?: TermIdWithEntriesResolvers<ContextType>;
  TermSaturation?: TermSaturationResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
