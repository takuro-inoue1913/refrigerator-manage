import { useQuery } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue } from 'recoil';

import { idTokenState } from '@src/states/user';
import { generateVegetablesStocks } from '@src/interface/logics/generate/generateVegetablesStocks';
import { vegetablesStocksState } from '@src/states/fridge/vegetables';
import { vegetableStockRepository } from '@src/interface/repositories/vegetableStockRepository';

export const useVegetablesStocks = () => {
  const idToken = useRecoilValue(idTokenState);
  const [vegetablesStocks, setVegetablesStocks] = useRecoilState(
    vegetablesStocksState,
  );

  const { isFetching } = useQuery({
    queryKey: ['graphl', 'get', 'vegetable', 'master', 'stock'],
    queryFn: async () => {
      const data = await vegetableStockRepository.getAll({ idToken });
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
