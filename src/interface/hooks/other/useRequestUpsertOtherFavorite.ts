import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';

import { idTokenState, userState } from '@src/states/user';
import { otherStocksState } from '@src/states/fridge/other';
import { otherStockRepository } from '@src/interface/repositories/otherStockRepository';

type UpsertOtherStockArgs = {
  id: string;
  isFavorite: boolean;
};

export const useRequestUpsertOtherFavorite = () => {
  const idToken = useRecoilValue(idTokenState);
  const user = useRecoilValue(userState);
  const otherStocks = useRecoilValue(otherStocksState);

  // MEMO: コールバック関数内で最新の otherStocks を参照するために、useRefを使用する
  const otherStocksRef = useRef(otherStocks);
  useEffect(() => {
    otherStocksRef.current = otherStocks;
  }, [otherStocks]);

  return async ({ id: otherId, isFavorite }: UpsertOtherStockArgs) => {
    const existingStock = await otherStockRepository.getOne({
      idToken,
      userId: user!.uid,
      otherId,
    });
    if (existingStock.length === 0) {
      const data = await otherStockRepository.insert({
        idToken,
        userId: user!.uid,
        otherId,
        isFavorite,
        quantity: otherStocksRef.current.byId[otherId].quantity,
        incrementalUnit: otherStocksRef.current.byId[otherId].incrementalUnit,
        defaultExpirationPeriod:
          otherStocksRef.current.byId[otherId].defaultExpirationPeriod,
      });
      return data;
    } else {
      const data = await otherStockRepository.updateIsFavorite({
        idToken,
        userId: user!.uid,
        otherId,
        isFavorite,
      });
      return data;
    }
  };
};
