import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';

import { idTokenState, userState } from '@src/states/user';
import { seasoningStocksState } from '@src/states/fridge/seasoning';
import { seasoningStockRepository } from '@src/interface/repositories/seasoningStockRepository';

type UpsertSeasoningStockArgs = {
  id: string;
  isFavorite: boolean;
};

export const useRequestUpsertSeasoningFavorite = () => {
  const idToken = useRecoilValue(idTokenState);
  const user = useRecoilValue(userState);
  const seasoningStocks = useRecoilValue(seasoningStocksState);

  // MEMO: コールバック関数内で最新の seasoningStocks を参照するために、useRefを使用する
  const seasoningStocksRef = useRef(seasoningStocks);
  useEffect(() => {
    seasoningStocksRef.current = seasoningStocks;
  }, [seasoningStocks]);

  return async ({ id: seasoningId, isFavorite }: UpsertSeasoningStockArgs) => {
    const existingStock = await seasoningStockRepository.getOne({
      idToken,
      userId: user!.uid,
      seasoningId,
    });
    if (existingStock.length === 0) {
      const data = await seasoningStockRepository.insert({
        idToken,
        userId: user!.uid,
        seasoningId,
        isFavorite,
        quantity: seasoningStocksRef.current.byId[seasoningId].quantity,
        incrementalUnit:
          seasoningStocksRef.current.byId[seasoningId].incrementalUnit,
        defaultExpirationPeriod:
          seasoningStocksRef.current.byId[seasoningId].defaultExpirationPeriod,
      });
      return data;
    } else {
      const data = await seasoningStockRepository.updateIsFavorite({
        idToken,
        userId: user!.uid,
        seasoningId,
        isFavorite,
      });
      return data;
    }
  };
};
