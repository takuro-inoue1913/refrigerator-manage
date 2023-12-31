import { GraphQLClient } from 'graphql-request';

/**
 * ユーザー情報を取得するための GraphQLClient を生成する。
 * @param idToken Firebase の ID Token
 */
export const buildGraphQLUserClient = (idToken: string | null) => {
  if (!idToken) {
    throw new Error('idToken is not found');
  }
  return new GraphQLClient('https://frimane.hasura.app/v1/graphql', {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
};
