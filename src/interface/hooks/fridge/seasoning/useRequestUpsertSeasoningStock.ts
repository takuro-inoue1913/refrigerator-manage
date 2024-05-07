import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';

import { idTokenState, userState } from '@src/states/user';
import { seasoningStocksState } from '@src/states/fridge/seasoning';
import { seasoningStockRepository } from '@src/interface/repositories/seasoningStockRepository';

type UpsertSeasoningStockArgs = {
  id: string;
  quantity: number;
};

export const useRequestUpsertSeasoningStock = () => {
  const idToken = useRecoilValue(idTokenState);
  const user = useRecoilValue(userState);
  const seasoningStocks = useRecoilValue(seasoningStocksState);

  // MEMO: コールバック関数内で最新の seasoningStocks を参照するために、useRefを使用する
  const seasoningStocksRef = useRef(seasoningStocks);
  useEffect(() => {
    seasoningStocksRef.current = seasoningStocks;
  }, [seasoningStocks]);

  return async ({ id: seasoningId, quantity }: UpsertSeasoningStockArgs) => {
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
        quantity,
        incrementalUnit:
          seasoningStocksRef.current.byId[seasoningId].incrementalUnit,
        defaultExpirationPeriod:
          seasoningStocksRef.current.byId[seasoningId].defaultExpirationPeriod,
      });
      return data;
    } else {
      // MEMO: 既存の在庫と同じ数量の場合は更新しない
      if (existingStock[0].quantity === quantity) {
        return;
      }
      const data = await seasoningStockRepository.updateQuantity({
        idToken,
        userId: user!.uid,
        seasoningId,
        quantity,
        defaultExpirationPeriod:
          seasoningStocksRef.current.byId[seasoningId]
            ?.defaultExpirationPeriod ?? 0,
      });
      return data;
    }
  };
};
