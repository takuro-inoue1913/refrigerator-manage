import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import { idTokenState } from '@src/states/user';
import { GetUserDocument } from '@src/interface/__generated__/graphql';
import { buildGraphQLClient } from '@src/interface/buildGraphQLClient';

export const useGetUser = () => {
  const idToken = useRecoilValue(idTokenState);

  return useQuery({
    queryKey: ['graphl', 'get', 'user'],
    queryFn: async () => {
      const client = buildGraphQLClient(idToken);
      const { users } = await client.request(GetUserDocument);
      return users[0];
    },
  });
};
