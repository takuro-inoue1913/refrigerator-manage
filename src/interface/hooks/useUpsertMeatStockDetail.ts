import { useRecoilValue } from 'recoil';

import { idTokenState, userState } from '@src/states/user';
import { meatStockRepository } from '@src/interface/repositories/meatStockRepository';

type UpsertMeatStockDetail = {
  id: number;
  quantity: number;
  expirationDate: string;
  memo: string;
};

export const useUpsertMeatStockDetail = () => {
  const idToken = useRecoilValue(idTokenState);
  const user = useRecoilValue(userState);

  return async ({
    id: meatId,
    quantity,
    expirationDate,
    memo,
  }: UpsertMeatStockDetail) => {
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
        quantity,
      });
      return data;
    } else {
      const data = await meatStockRepository.updateDetail({
        idToken,
        userId: user!.uid,
        meatId,
        quantity,
        expirationDate,
        memo,
      });
      return data;
    }
  };
};
