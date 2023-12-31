import { GraphQLClient } from 'graphql-request';
import Toast from 'react-native-toast-message';

export const buildGraphQLClient = (idToken: string | null) => {
  if (!idToken) {
    Toast.show({
      type: 'error',
      position: 'top',
      text1: '認証情報が切れている可能性があります。',
      text2: '再度ログインしてください。',
    });
    throw new Error('idToken is not found');
  }
  return new GraphQLClient('https://frimane.hasura.app/v1/graphql', {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
};
