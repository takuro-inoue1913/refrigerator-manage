import { useQuery } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { idTokenState } from '@src/states/user';
import { generateMeatStocks } from '@src/interface/logics/generate/generateMeatStocks';
import { meatStocksState, meatStocksIdsState } from '@src/states/fridge/meat';
import { meatStockRepository } from '@src/interface/repositories/meatStockRepository';
import { filterMeatStock } from '@src/states/fridge/meat/logics/filterMeatStock';
import { selectFilterOptionsState } from '@src/states/fridge';

export const useRequestGetMeatStocks = () => {
  const idToken = useRecoilValue(idTokenState);
  const [meatStocks, setMeatStocks] = useRecoilState(meatStocksState);
  const setMeatStocksIds = useSetRecoilState(meatStocksIdsState);
  const selectFilterOptions = useRecoilValue(selectFilterOptionsState);

  const { isFetching, refetch } = useQuery({
    queryKey: ['graphl', 'get', 'meat', 'master', 'stock'],
    queryFn: async () => {
      const data = await meatStockRepository.getAll({ idToken });
      const _meatStocks = generateMeatStocks(data);
      setMeatStocks({
        byId: _meatStocks.byId,
        ids: filterMeatStock({
          meatStocks: _meatStocks,
          originalIds: _meatStocks.ids,
          selectFilterOptions,
        }),
      });
      setMeatStocksIds(_meatStocks.ids);

      return data;
    },
    // キャッシュ時間を延長
    staleTime: 1000 * 60 * 60 * 24 * 7,
  });

  return {
    meatStocks,
    isFetching,
    refetch,
  };
};
