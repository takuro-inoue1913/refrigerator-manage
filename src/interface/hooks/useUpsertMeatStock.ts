import { useRecoilValue } from 'recoil';

import { idTokenState, userState } from '@src/states/user';
import { meatStockRepository } from '@src/interface/repositories/meatStockRepository';

type UpsertMeatStockArgs = {
  id: number;
  quantity: number;
};

export const useUpsertMeatStock = () => {
  const idToken = useRecoilValue(idTokenState);
  const user = useRecoilValue(userState);

  return async ({ id: meatId, quantity }: UpsertMeatStockArgs) => {
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
      console.log('meatStockRepository.insert: ', data);
      return data;
    } else {
      // MEMO: 既存の在庫と同じ数量の場合は更新しない
      if (existingStock[0].quantity === quantity) {
        return;
      }
      const data = await meatStockRepository.updateQuantity({
        idToken,
        userId: user!.uid,
        meatId,
        quantity,
      });
      console.log('meatStockRepository.update: ', data);
      return data;
    }
  };
};
