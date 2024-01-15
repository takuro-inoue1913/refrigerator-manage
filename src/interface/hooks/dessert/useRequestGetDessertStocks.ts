import { useQuery } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { idTokenState } from '@src/states/user';
import { generateDessertStocks } from '@src/interface/logics/generate/generateDessertStocks';
import {
  dessertStocksState,
  dessertStocksIdsState,
} from '@src/states/fridge/dessert';
import { dessertStockRepository } from '@src/interface/repositories/dessertStockRepository';
import { filterDessertStock } from '@src/states/fridge/dessert/logics/filterDessertStock';
import { selectFilterOptionsState } from '@src/states/fridge';

export const useRequestGetDessertStocks = () => {
  const idToken = useRecoilValue(idTokenState);
  const [dessertStocks, setDessertStocks] = useRecoilState(dessertStocksState);
  const setDessertStocksIds = useSetRecoilState(dessertStocksIdsState);
  const selectFilterOptions = useRecoilValue(selectFilterOptionsState);

  const { isFetching, refetch } = useQuery({
    queryKey: ['graphl', 'get', 'dessert', 'master', 'stock'],
    queryFn: async () => {
      const data = await dessertStockRepository.getAll({ idToken });
      const _dessertStocks = generateDessertStocks(data);
      setDessertStocks({
        byId: _dessertStocks.byId,
        ids: filterDessertStock({
          dessertStocks: _dessertStocks,
          originalIds: _dessertStocks.ids,
          selectFilterOptions,
        }),
      });
      setDessertStocksIds(_dessertStocks.ids);

      return data;
    },
  });

  return {
    dessertStocks,
    isFetching,
    refetch,
  };
};
