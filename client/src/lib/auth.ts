import { DefaultContext } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
import { ApolloLink } from '@apollo/client'

export const AUTH0_TOKEN_CONTEXT_KEY = 'auth0_access_token'

/**
 * APIリクエストの際に認証トークンを含んだContextを作成し、返すフック
 * 
 * @param token 
 */
export const useAuthContext = async (): Promise<DefaultContext> => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  if (!isAuthenticated) {
    return {}
  }

  try {
    // アクセストークンをAuth0から取得する
    const token = await getAccessTokenSilently()

    return {
      AUTH0_TOKEN_CONTEXT_KEY: token
    }
  } catch (e: unknown) {
    return {}
  }
}

/**
 * ApolloClientのContextに記録されたアクセストークンを取り出し、HTTPのAuthorizationヘッダにセットするApolloLink
 */
export const authLink = new ApolloLink((operation, forward) => {
  const { getContext } = operation
  const context = getContext()
  console.debug(context, context[AUTH0_TOKEN_CONTEXT_KEY])
  return forward(operation)
})