import { useRecoilValue } from 'recoil';

import { idTokenState, userState } from '@src/states/user';
import { meatStockRepository } from '@src/interface/repositories/meatStockRepository';

type UpsertMeatStockDetail = {
  id: number;
  quantity: number;
  incrementalUnit: number;
  expirationDate: string;
  memo: string;
};

export const useUpsertMeatStockDetail = () => {
  const idToken = useRecoilValue(idTokenState);
  const user = useRecoilValue(userState);

  return async ({
    id: meatId,
    quantity,
    incrementalUnit,
    expirationDate,
    memo,
  }: UpsertMeatStockDetail) => {
    const existingStock = await meatStockRepository.getOne({
      idToken,
      userId: user!.uid,
      meatId,
    });
    console.log('existingStock: ', existingStock);
    if (existingStock.length === 0) {
      const data = await meatStockRepository.insert({
        idToken,
        userId: user!.uid,
        meatId,
        quantity,
      });
      console.log('useUpsertMeatStockDetail.insert: ', data);
      return data;
    } else {
      const data = await meatStockRepository.updateDetail({
        idToken,
        userId: user!.uid,
        meatId,
        quantity,
        incrementalUnit,
        expirationDate,
        memo,
      });
      console.log('useUpsertMeatStockDetail.updateDetail: ', data);
      return data;
    }
  };
};
