import { useQuery } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue } from 'recoil';

import { idTokenState } from '@src/states/user';
import { generateMeatStocks } from '@src/interface/logics/generate/generateMeatStocks';
import { meatStocksState } from '@src/states/meat';
import { meatStockRepository } from '@src/interface/repositories/meatStockRepository';

export const useMeatStocks = () => {
  const idToken = useRecoilValue(idTokenState);
  const [meatStocks, setMeatStocks] = useRecoilState(meatStocksState);

  const { isFetching } = useQuery({
    queryKey: ['graphl', 'get', 'meat', 'master', 'stock'],
    queryFn: async () => {
      const data = await meatStockRepository.getAll({ idToken });
      const _meatStocks = generateMeatStocks(data);
      setMeatStocks(_meatStocks);
      return _meatStocks;
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  return {
    meatStocks,
    isFetching,
  };
};
