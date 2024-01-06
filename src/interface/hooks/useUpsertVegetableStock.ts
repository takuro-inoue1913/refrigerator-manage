import { useRecoilValue } from 'recoil';

import { idTokenState, userState } from '@src/states/user';
import { vegetableStockRepository } from '@src/interface/repositories/vegetableStockRepository';

type UpsertVegetableStockArgs = {
  id: number;
  quantity: number;
};

export const useUpsertVegetableStock = () => {
  const idToken = useRecoilValue(idTokenState);
  const user = useRecoilValue(userState);

  return async ({ id: vegetableId, quantity }: UpsertVegetableStockArgs) => {
    const existingStock = await vegetableStockRepository.getOne({
      idToken,
      userId: user!.uid,
      vegetableId,
    });
    console.log('existingStock: ', existingStock);
    if (existingStock.length === 0) {
      const data = await vegetableStockRepository.insert({
        idToken,
        userId: user!.uid,
        vegetableId,
        quantity,
      });
      console.log('vegetableStockRepository.insert: ', data);
      return data;
    } else {
      // MEMO: 既存の在庫と同じ数量の場合は更新しない
      if (existingStock[0].quantity === quantity) {
        return;
      }
      const data = await vegetableStockRepository.updateQuantity({
        idToken,
        userId: user!.uid,
        vegetableId,
        quantity,
      });
      console.log('vegetableStockRepository.update: ', data);
      return data;
    }
  };
};
