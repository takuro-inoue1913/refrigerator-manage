import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import { idTokenState } from '@src/states/user';
import { GetVegetableMasterAndUnitAndStocksDocument } from '@src/interface/__generated__/graphql';
import { buildGraphQLUserClient } from '@src/interface/logics/buildGraphQLClient/buildGraphQLUserClient';
import { generateVegetablesStocks } from '@src/interface/logics/generate/generateVegetablesStocks';

export const useGetVegetableMasterAndUserStocks = () => {
  const idToken = useRecoilValue(idTokenState);

  return useQuery({
    queryKey: ['graphl', 'get', 'vegetable_master'],
    queryFn: async () => {
      const client = buildGraphQLUserClient(idToken);
      const data = await client.request(
        GetVegetableMasterAndUnitAndStocksDocument,
      );
      return generateVegetablesStocks(data);
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    // staleTime: 5 * 60 * 1000, // データを5分間新鮮とみなす
    // refetchOnMount: false, // コンポーネントがマウントされた際にはデフォルトでリフェッチしない
    // refetchOnWindowFocus: false, // ウィンドウフォーカス時にリフェッチしない
  });
};
