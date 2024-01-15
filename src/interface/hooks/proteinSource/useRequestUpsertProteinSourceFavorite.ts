import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';

import { idTokenState, userState } from '@src/states/user';
import { proteinSourceStocksState } from '@src/states/fridge/proteinSource';
import { proteinSourceStockRepository } from '@src/interface/repositories/proteinSourceStockRepository';

type UpsertProteinSourceStockArgs = {
  id: string;
  isFavorite: boolean;
};

export const useRequestUpsertProteinSourceFavorite = () => {
  const idToken = useRecoilValue(idTokenState);
  const user = useRecoilValue(userState);
  const proteinSourceStocks = useRecoilValue(proteinSourceStocksState);

  // MEMO: コールバック関数内で最新の proteinSourceStocks を参照するために、useRefを使用する
  const proteinSourceStocksRef = useRef(proteinSourceStocks);
  useEffect(() => {
    proteinSourceStocksRef.current = proteinSourceStocks;
  }, [proteinSourceStocks]);

  return async ({
    id: proteinSourceId,
    isFavorite,
  }: UpsertProteinSourceStockArgs) => {
    const existingStock = await proteinSourceStockRepository.getOne({
      idToken,
      userId: user!.uid,
      proteinSourceId,
    });
    if (existingStock.length === 0) {
      const data = await proteinSourceStockRepository.insert({
        idToken,
        userId: user!.uid,
        proteinSourceId,
        isFavorite,
        quantity: proteinSourceStocksRef.current.byId[proteinSourceId].quantity,
        incrementalUnit:
          proteinSourceStocksRef.current.byId[proteinSourceId].incrementalUnit,
        defaultExpirationPeriod:
          proteinSourceStocksRef.current.byId[proteinSourceId]
            .defaultExpirationPeriod,
      });
      return data;
    } else {
      const data = await proteinSourceStockRepository.updateIsFavorite({
        idToken,
        userId: user!.uid,
        proteinSourceId,
        isFavorite,
      });
      return data;
    }
  };
};
