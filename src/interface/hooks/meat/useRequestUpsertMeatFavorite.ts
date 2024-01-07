import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';

import { idTokenState, userState } from '@src/states/user';
import { meatStocksState } from '@src/states/fridge/meat';
import { meatStockRepository } from '@src/interface/repositories/meatStockRepository';

type UpsertMeatStockArgs = {
  id: number;
  isFavorite: boolean;
};

export const useRequestUpsertMeatFavorite = () => {
  const idToken = useRecoilValue(idTokenState);
  const user = useRecoilValue(userState);
  const meatStocks = useRecoilValue(meatStocksState);

  // MEMO: コールバック関数内で最新の meatStocks を参照するために、useRefを使用する
  const meatStocksRef = useRef(meatStocks);
  useEffect(() => {
    meatStocksRef.current = meatStocks;
  }, [meatStocks]);

  return async ({ id: meatId, isFavorite }: UpsertMeatStockArgs) => {
    const existingStock = await meatStockRepository.getOne({
      idToken,
      userId: user!.uid,
      meatId,
    });
    if (existingStock.length === 0) {
      const data = await meatStockRepository.insert({
        idToken,
        userId: user!.uid,
        meatId,
        isFavorite,
        quantity: meatStocksRef.current.byId[meatId].quantity,
        incrementalUnit: meatStocksRef.current.byId[meatId].incrementalUnit,
      });
      console.log(data);
      return data;
    } else {
      const data = await meatStockRepository.updateIsFavorite({
        idToken,
        userId: user!.uid,
        meatId,
        isFavorite,
      });
      console.log(data);
      return data;
    }
  };
};
