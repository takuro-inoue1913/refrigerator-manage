import { useQuery } from '@tanstack/react-query';

import { GetVegetableMasterDocument } from '@src/interface/__generated__/graphql';
import { buildGraphQLMasterClient } from '@src/interface/buildGraphQLMasterClient';

export const useGetVegetableMaster = () => {
  return useQuery({
    queryKey: ['graphl', 'get', 'vegetable_master'],
    queryFn: async () => {
      const client = buildGraphQLMasterClient();
      const { vegetable_master } = await client.request(
        GetVegetableMasterDocument,
      );
      console.log('useGetVegetableMaster: ', vegetable_master);
      return vegetable_master;
    },
    staleTime: 5 * 60 * 1000, // データを5分間新鮮とみなす
    refetchOnMount: false, // コンポーネントがマウントされた際にはデフォルトでリフェッチしない
    refetchOnWindowFocus: false, // ウィンドウフォーカス時にリフェッチしない
  });
};
