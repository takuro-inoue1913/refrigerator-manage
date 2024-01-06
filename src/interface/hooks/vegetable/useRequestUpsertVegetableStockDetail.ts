import { useRecoilValue } from 'recoil';

import { idTokenState, userState } from '@src/states/user';
import { vegetableStockRepository } from '@src/interface/repositories/vegetableStockRepository';

type UpsertMeatStockDetail = {
  id: number;
  quantity: number;
  incrementalUnit: number;
  expirationDate: string;
  memo: string;
};

export const useRequestUpsertVegetableStockDetail = () => {
  const idToken = useRecoilValue(idTokenState);
  const user = useRecoilValue(userState);

  return async ({
    id: vegetableId,
    quantity,
    incrementalUnit,
    expirationDate,
    memo,
  }: UpsertMeatStockDetail) => {
    const existingStock = await vegetableStockRepository.getOne({
      idToken,
      userId: user!.uid,
      vegetableId,
    });
    if (existingStock.length === 0) {
      const data = await vegetableStockRepository.insert({
        idToken,
        userId: user!.uid,
        vegetableId,
        quantity,
        incrementalUnit,
      });
      return data;
    } else {
      const data = await vegetableStockRepository.updateDetail({
        idToken,
        userId: user!.uid,
        vegetableId,
        quantity,
        incrementalUnit,
        expirationDate,
        memo,
      });
      return data;
    }
  };
};
