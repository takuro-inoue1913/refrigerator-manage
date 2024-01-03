import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import { idTokenState } from '@src/states/user';
import { UpdateVegetableStockDocument } from '@src/interface/__generated__/graphql';
import { buildGraphQLUserClient } from '@src/interface/logics/buildGraphQLClient/buildGraphQLUserClient';
// import { generateVegetablesStocks } from '@src/interface/logics/generate/generateVegetablesStocks';

export const useUpdateVegetableStock = () => {
  const idToken = useRecoilValue(idTokenState);
  const client = buildGraphQLUserClient(idToken);

  return async () =>
    useQuery({
      queryKey: ['graphl', 'update', 'vegetable', 'stock'],
      queryFn: async () => {
        const data = await client.request(UpdateVegetableStockDocument, {
          userId: '1',
          vegetableId: 1,
          quantity: 1,
        });
        return data;
      },
      staleTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    });
};
