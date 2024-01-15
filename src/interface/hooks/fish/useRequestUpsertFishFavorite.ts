import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';

import { idTokenState, userState } from '@src/states/user';
import { fishStocksState } from '@src/states/fridge/fish';
import { fishStockRepository } from '@src/interface/repositories/fishStockRepository';

type UpsertFishStockArgs = {
  id: string;
  isFavorite: boolean;
};

export const useRequestUpsertFishFavorite = () => {
  const idToken = useRecoilValue(idTokenState);
  const user = useRecoilValue(userState);
  const fishStocks = useRecoilValue(fishStocksState);

  // MEMO: コールバック関数内で最新の fishStocks を参照するために、useRefを使用する
  const fishStocksRef = useRef(fishStocks);
  useEffect(() => {
    fishStocksRef.current = fishStocks;
  }, [fishStocks]);

  return async ({ id: fishId, isFavorite }: UpsertFishStockArgs) => {
    const existingStock = await fishStockRepository.getOne({
      idToken,
      userId: user!.uid,
      fishId,
    });
    if (existingStock.length === 0) {
      const data = await fishStockRepository.insert({
        idToken,
        userId: user!.uid,
        fishId,
        isFavorite,
        quantity: fishStocksRef.current.byId[fishId].quantity,
        incrementalUnit: fishStocksRef.current.byId[fishId].incrementalUnit,
        defaultExpirationPeriod:
          fishStocksRef.current.byId[fishId].defaultExpirationPeriod,
      });
      return data;
    } else {
      const data = await fishStockRepository.updateIsFavorite({
        idToken,
        userId: user!.uid,
        fishId,
        isFavorite,
      });
      return data;
    }
  };
};
