import { useQuery } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue } from 'recoil';

import { idTokenState } from '@src/states/user';
import { GetVegetableMasterAndUnitAndStocksDocument } from '@src/interface/__generated__/graphql';
import { buildGraphQLUserClient } from '@src/interface/logics/buildGraphQLClient/buildGraphQLUserClient';
import { generateVegetablesStocks } from '@src/interface/logics/generate/generateVegetablesStocks';
import { vegetablesStocksState } from '@src/states/vegetables';

export const useVegetablesStocks = () => {
  const idToken = useRecoilValue(idTokenState);
  const [vegetablesStocks, setVegetablesStocks] = useRecoilState(
    vegetablesStocksState,
  );
  const { isFetching } = useQuery({
    queryKey: ['graphl', 'get', 'vegetables_stocks'],
    queryFn: async () => {
      const client = buildGraphQLUserClient(idToken);
      const data = await client.request(
        GetVegetableMasterAndUnitAndStocksDocument,
      );
      const _vegetablesStocks = generateVegetablesStocks(data);
      setVegetablesStocks(_vegetablesStocks);
      return _vegetablesStocks;
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  return {
    vegetablesStocks,
    isFetching,
  };
};
