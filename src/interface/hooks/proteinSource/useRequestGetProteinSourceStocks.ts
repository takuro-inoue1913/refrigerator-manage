import { useQuery } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { idTokenState } from '@src/states/user';
import { generateProteinSourceStocks } from '@src/interface/logics/generate/generateProteinSourceStocks';
import {
  proteinSourceStocksState,
  proteinSourceStocksIdsState,
} from '@src/states/fridge/proteinSource';
import { proteinSourceStockRepository } from '@src/interface/repositories/proteinSourceStockRepository';
import { filterProteinSourceStock } from '@src/states/fridge/proteinSource/logics/filterProteinSourceStock';
import { selectFilterOptionsState } from '@src/states/fridge';

export const useRequestGetProteinSourceStocks = () => {
  const idToken = useRecoilValue(idTokenState);
  const [proteinSourceStocks, setProteinSourceStocks] = useRecoilState(
    proteinSourceStocksState,
  );
  const setProteinSourceStocksIds = useSetRecoilState(
    proteinSourceStocksIdsState,
  );
  const selectFilterOptions = useRecoilValue(selectFilterOptionsState);

  const { isFetching, refetch } = useQuery({
    queryKey: ['graphl', 'get', 'proteinSource', 'master', 'stock'],
    queryFn: async () => {
      const data = await proteinSourceStockRepository.getAll({ idToken });
      const _proteinSourceStocks = generateProteinSourceStocks(data);
      setProteinSourceStocks({
        byId: _proteinSourceStocks.byId,
        ids: filterProteinSourceStock({
          proteinSourceStocks: _proteinSourceStocks,
          originalIds: _proteinSourceStocks.ids,
          selectFilterOptions,
        }),
      });
      setProteinSourceStocksIds(_proteinSourceStocks.ids);

      return data;
    },
  });

  return {
    proteinSourceStocks,
    isFetching,
    refetch,
  };
};
