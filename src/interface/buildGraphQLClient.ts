import { GraphQLClient } from 'graphql-request';

export const buildGraphQLClient = (idToken: string | null) => {
  if (!idToken) {
    throw new Error('idToken is not found');
  }
  return new GraphQLClient('https://frimane.hasura.app/v1/graphql', {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
};
