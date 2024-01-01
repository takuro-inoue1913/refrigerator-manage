import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import { idTokenState } from '@src/states/user';
import { GetUserDocument } from '@src/interface/__generated__/graphql';
import { buildGraphQLUserClient } from '@src/interface/logics/buildGraphQLClient/buildGraphQLUserClient';

export const useGetUser = () => {
  const idToken = useRecoilValue(idTokenState);

  return useQuery({
    queryKey: ['graphl', 'get', 'user'],
    queryFn: async () => {
      const client = buildGraphQLUserClient(idToken);
      const { users } = await client.request(GetUserDocument);
      console.log('useGetUser: ', users);
      return users[0];
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
