import { GraphQLClient } from 'graphql-request';
import { HASURA_ADMIN_SECRET } from '@env';

/**
 * マスター情報を取得するための GraphQLClient を生成する。
 */
export const buildGraphQLMasterClient = () => {
  return new GraphQLClient('https://frimane.hasura.app/v1/graphql', {
    headers: {
      'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
    },
  });
};
