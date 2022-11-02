import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: any;
};

export type Account = {
  __typename?: 'Account';
  amount: Scalars['Int'];
  created_at: Scalars['Time'];
  description: Scalars['String'];
  genre: Genre;
  id: Scalars['Int'];
  tags: Array<Maybe<Tag>>;
};

export type Analysis = {
  __typename?: 'Analysis';
  amount: Scalars['Int'];
  consumes: Array<Maybe<GenreAnalysis>>;
  incomes: Array<Maybe<GenreAnalysis>>;
};

export type Genre = {
  __typename?: 'Genre';
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type GenreAnalysis = {
  __typename?: 'GenreAnalysis';
  amount: Scalars['Int'];
  genre: Genre;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: Account;
  createGenre: Genre;
  createTag: Tag;
  deleteAccount: Scalars['Int'];
};


export type MutationCreateAccountArgs = {
  input: NewAccount;
};


export type MutationCreateGenreArgs = {
  input: NewGenre;
};


export type MutationCreateTagArgs = {
  input: NewTag;
};


export type MutationDeleteAccountArgs = {
  id: Scalars['Int'];
};

export type NewAccount = {
  amount: Scalars['Int'];
  description: Scalars['String'];
  genre_id: Scalars['Int'];
  tag_ids: Array<InputMaybe<Scalars['Int']>>;
};

export type NewGenre = {
  title: Scalars['String'];
};

export type NewTag = {
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  accounts: Array<Maybe<Account>>;
  analysis?: Maybe<Analysis>;
  genres: Array<Maybe<Genre>>;
  tags: Array<Maybe<Tag>>;
};


export type QueryAccountsArgs = {
  month?: InputMaybe<Scalars['Time']>;
};


export type QueryAnalysisArgs = {
  end: Scalars['Time'];
  start: Scalars['Time'];
};

export enum Role {
  Guest = 'GUEST',
  Owner = 'OWNER'
}

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  name: Scalars['String'];
  role: Role;
};

export type AnalysisQueryVariables = Exact<{
  start: Scalars['Time'];
  end: Scalars['Time'];
}>;


export type AnalysisQuery = { __typename?: 'Query', analysis?: { __typename?: 'Analysis', amount: number, consumes: Array<{ __typename?: 'GenreAnalysis', amount: number, genre: { __typename?: 'Genre', id: number, title: string } } | null>, incomes: Array<{ __typename?: 'GenreAnalysis', amount: number, genre: { __typename?: 'Genre', id: number, title: string } } | null> } | null };

export type AccountsQueryVariables = Exact<{
  month?: InputMaybe<Scalars['Time']>;
}>;


export type AccountsQuery = { __typename?: 'Query', accounts: Array<{ __typename?: 'Account', id: number, amount: number, description: string, created_at: any, genre: { __typename?: 'Genre', id: number, title: string } } | null> };

export type GenresQueryVariables = Exact<{ [key: string]: never; }>;


export type GenresQuery = { __typename?: 'Query', genres: Array<{ __typename?: 'Genre', id: number, title: string } | null> };

export type AccountMutationVariables = Exact<{
  newAccount: NewAccount;
}>;


export type AccountMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'Account', id: number, amount: number, description: string, created_at: any, genre: { __typename?: 'Genre', id: number, title: string } } };

export type GenreMutationVariables = Exact<{
  newGenre: NewGenre;
}>;


export type GenreMutation = { __typename?: 'Mutation', createGenre: { __typename?: 'Genre', id: number, title: string } };

export type TagMutationVariables = Exact<{
  newTag: NewTag;
}>;


export type TagMutation = { __typename?: 'Mutation', createTag: { __typename?: 'Tag', id: number, title: string } };

export type DeleteAccountMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount: number };


export const AnalysisDocument = gql`
    query analysis($start: Time!, $end: Time!) {
  analysis(start: $start, end: $end) {
    amount
    consumes {
      genre {
        id
        title
      }
      amount
    }
    incomes {
      genre {
        id
        title
      }
      amount
    }
  }
}
    `;

/**
 * __useAnalysisQuery__
 *
 * To run a query within a React component, call `useAnalysisQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnalysisQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnalysisQuery({
 *   variables: {
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useAnalysisQuery(baseOptions: Apollo.QueryHookOptions<AnalysisQuery, AnalysisQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AnalysisQuery, AnalysisQueryVariables>(AnalysisDocument, options);
      }
export function useAnalysisLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AnalysisQuery, AnalysisQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AnalysisQuery, AnalysisQueryVariables>(AnalysisDocument, options);
        }
export type AnalysisQueryHookResult = ReturnType<typeof useAnalysisQuery>;
export type AnalysisLazyQueryHookResult = ReturnType<typeof useAnalysisLazyQuery>;
export type AnalysisQueryResult = Apollo.QueryResult<AnalysisQuery, AnalysisQueryVariables>;
export const AccountsDocument = gql`
    query accounts($month: Time) {
  accounts(month: $month) {
    id
    genre {
      id
      title
    }
    amount
    description
    created_at
  }
}
    `;

/**
 * __useAccountsQuery__
 *
 * To run a query within a React component, call `useAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountsQuery({
 *   variables: {
 *      month: // value for 'month'
 *   },
 * });
 */
export function useAccountsQuery(baseOptions?: Apollo.QueryHookOptions<AccountsQuery, AccountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountsQuery, AccountsQueryVariables>(AccountsDocument, options);
      }
export function useAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountsQuery, AccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountsQuery, AccountsQueryVariables>(AccountsDocument, options);
        }
export type AccountsQueryHookResult = ReturnType<typeof useAccountsQuery>;
export type AccountsLazyQueryHookResult = ReturnType<typeof useAccountsLazyQuery>;
export type AccountsQueryResult = Apollo.QueryResult<AccountsQuery, AccountsQueryVariables>;
export const GenresDocument = gql`
    query genres {
  genres {
    id
    title
  }
}
    `;

/**
 * __useGenresQuery__
 *
 * To run a query within a React component, call `useGenresQuery` and pass it any options that fit your needs.
 * When your component renders, `useGenresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGenresQuery({
 *   variables: {
 *   },
 * });
 */
export function useGenresQuery(baseOptions?: Apollo.QueryHookOptions<GenresQuery, GenresQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GenresQuery, GenresQueryVariables>(GenresDocument, options);
      }
export function useGenresLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GenresQuery, GenresQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GenresQuery, GenresQueryVariables>(GenresDocument, options);
        }
export type GenresQueryHookResult = ReturnType<typeof useGenresQuery>;
export type GenresLazyQueryHookResult = ReturnType<typeof useGenresLazyQuery>;
export type GenresQueryResult = Apollo.QueryResult<GenresQuery, GenresQueryVariables>;
export const AccountDocument = gql`
    mutation account($newAccount: NewAccount!) {
  createAccount(input: $newAccount) {
    id
    genre {
      id
      title
    }
    amount
    description
    created_at
  }
}
    `;
export type AccountMutationFn = Apollo.MutationFunction<AccountMutation, AccountMutationVariables>;

/**
 * __useAccountMutation__
 *
 * To run a mutation, you first call `useAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [accountMutation, { data, loading, error }] = useAccountMutation({
 *   variables: {
 *      newAccount: // value for 'newAccount'
 *   },
 * });
 */
export function useAccountMutation(baseOptions?: Apollo.MutationHookOptions<AccountMutation, AccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AccountMutation, AccountMutationVariables>(AccountDocument, options);
      }
export type AccountMutationHookResult = ReturnType<typeof useAccountMutation>;
export type AccountMutationResult = Apollo.MutationResult<AccountMutation>;
export type AccountMutationOptions = Apollo.BaseMutationOptions<AccountMutation, AccountMutationVariables>;
export const GenreDocument = gql`
    mutation genre($newGenre: NewGenre!) {
  createGenre(input: $newGenre) {
    id
    title
  }
}
    `;
export type GenreMutationFn = Apollo.MutationFunction<GenreMutation, GenreMutationVariables>;

/**
 * __useGenreMutation__
 *
 * To run a mutation, you first call `useGenreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [genreMutation, { data, loading, error }] = useGenreMutation({
 *   variables: {
 *      newGenre: // value for 'newGenre'
 *   },
 * });
 */
export function useGenreMutation(baseOptions?: Apollo.MutationHookOptions<GenreMutation, GenreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenreMutation, GenreMutationVariables>(GenreDocument, options);
      }
export type GenreMutationHookResult = ReturnType<typeof useGenreMutation>;
export type GenreMutationResult = Apollo.MutationResult<GenreMutation>;
export type GenreMutationOptions = Apollo.BaseMutationOptions<GenreMutation, GenreMutationVariables>;
export const TagDocument = gql`
    mutation tag($newTag: NewTag!) {
  createTag(input: $newTag) {
    id
    title
  }
}
    `;
export type TagMutationFn = Apollo.MutationFunction<TagMutation, TagMutationVariables>;

/**
 * __useTagMutation__
 *
 * To run a mutation, you first call `useTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tagMutation, { data, loading, error }] = useTagMutation({
 *   variables: {
 *      newTag: // value for 'newTag'
 *   },
 * });
 */
export function useTagMutation(baseOptions?: Apollo.MutationHookOptions<TagMutation, TagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TagMutation, TagMutationVariables>(TagDocument, options);
      }
export type TagMutationHookResult = ReturnType<typeof useTagMutation>;
export type TagMutationResult = Apollo.MutationResult<TagMutation>;
export type TagMutationOptions = Apollo.BaseMutationOptions<TagMutation, TagMutationVariables>;
export const DeleteAccountDocument = gql`
    mutation deleteAccount($id: Int!) {
  deleteAccount(id: $id)
}
    `;
export type DeleteAccountMutationFn = Apollo.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, options);
      }
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = Apollo.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;