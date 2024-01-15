import { useQuery } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { idTokenState } from '@src/states/user';
import { generateStapleFoodStocks } from '@src/interface/logics/generate/generateStapleFoodStocks';
import {
  stapleFoodStocksState,
  stapleFoodStocksIdsState,
} from '@src/states/fridge/stapleFood';
import { stapleFoodStockRepository } from '@src/interface/repositories/stapleFoodStockRepository';
import { filterStapleFoodStock } from '@src/states/fridge/stapleFood/logics/filterStapleFoodStock';
import { selectFilterOptionsState } from '@src/states/fridge';

export const useRequestGetStapleFoodStocks = () => {
  const idToken = useRecoilValue(idTokenState);
  const [stapleFoodStocks, setStapleFoodStocks] = useRecoilState(
    stapleFoodStocksState,
  );
  const setStapleFoodStocksIds = useSetRecoilState(stapleFoodStocksIdsState);
  const selectFilterOptions = useRecoilValue(selectFilterOptionsState);

  const { isFetching, refetch } = useQuery({
    queryKey: ['graphl', 'get', 'stapleFood', 'master', 'stock'],
    queryFn: async () => {
      const data = await stapleFoodStockRepository.getAll({ idToken });
      const _stapleFoodStocks = generateStapleFoodStocks(data);
      setStapleFoodStocks({
        byId: _stapleFoodStocks.byId,
        ids: filterStapleFoodStock({
          stapleFoodStocks: _stapleFoodStocks,
          originalIds: _stapleFoodStocks.ids,
          selectFilterOptions,
        }),
      });
      setStapleFoodStocksIds(_stapleFoodStocks.ids);

      return data;
    },
  });

  return {
    stapleFoodStocks,
    isFetching,
    refetch,
  };
};
