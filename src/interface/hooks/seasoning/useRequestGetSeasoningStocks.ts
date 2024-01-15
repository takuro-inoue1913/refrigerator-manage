import { useQuery } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { idTokenState } from '@src/states/user';
import { generateSeasoningStocks } from '@src/interface/logics/generate/generateSeasoningStocks';
import {
  seasoningStocksState,
  seasoningStocksIdsState,
} from '@src/states/fridge/seasoning';
import { seasoningStockRepository } from '@src/interface/repositories/seasoningStockRepository';
import { filterSeasoningStock } from '@src/states/fridge/seasoning/logics/filterSeasoningStock';
import { selectFilterOptionsState } from '@src/states/fridge';

export const useRequestGetSeasoningStocks = () => {
  const idToken = useRecoilValue(idTokenState);
  const [seasoningStocks, setSeasoningStocks] =
    useRecoilState(seasoningStocksState);
  const setSeasoningStocksIds = useSetRecoilState(seasoningStocksIdsState);
  const selectFilterOptions = useRecoilValue(selectFilterOptionsState);

  const { isFetching, refetch } = useQuery({
    queryKey: ['graphl', 'get', 'seasoning', 'master', 'stock'],
    queryFn: async () => {
      const data = await seasoningStockRepository.getAll({ idToken });
      const _seasoningStocks = generateSeasoningStocks(data);
      setSeasoningStocks({
        byId: _seasoningStocks.byId,
        ids: filterSeasoningStock({
          seasoningStocks: _seasoningStocks,
          originalIds: _seasoningStocks.ids,
          selectFilterOptions,
        }),
      });
      setSeasoningStocksIds(_seasoningStocks.ids);

      return data;
    },
  });

  return {
    seasoningStocks,
    isFetching,
    refetch,
  };
};
