import { useQuery } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { idTokenState } from '@src/states/user';
import { generateVegetablesStocks } from '@src/interface/logics/generate/generateVegetablesStocks';
import {
  vegetablesStocksIdsState,
  vegetablesStocksState,
} from '@src/states/fridge/vegetables';
import { selectFilterOptionsState } from '@src/states/fridge';
import { vegetableStockRepository } from '@src/interface/repositories/vegetableStockRepository';
import { filterVegetablesStock } from '@src/states/fridge/vegetables/logics/filterVegetablesStock';

export const useRequestGetVegetablesStocks = () => {
  const idToken = useRecoilValue(idTokenState);
  const [vegetablesStocks, setVegetablesStocks] = useRecoilState(
    vegetablesStocksState,
  );
  const setVegetablesStocksIdsState = useSetRecoilState(
    vegetablesStocksIdsState,
  );
  const selectFilterOptions = useRecoilValue(selectFilterOptionsState);

  const { isFetching, refetch } = useQuery({
    queryKey: ['graphl', 'get', 'vegetable', 'master', 'stock'],
    queryFn: async () => {
      const data = await vegetableStockRepository.getAll({ idToken });
      const _vegetablesStocks = generateVegetablesStocks(data);
      setVegetablesStocks({
        byId: _vegetablesStocks.byId,
        ids: filterVegetablesStock({
          vegetablesStocks: _vegetablesStocks,
          originalIds: _vegetablesStocks.ids,
          selectFilterOptions,
        }),
      });
      setVegetablesStocksIdsState(_vegetablesStocks.ids);

      return data;
    },
  });

  return {
    vegetablesStocks,
    isFetching,
    refetch,
  };
};
