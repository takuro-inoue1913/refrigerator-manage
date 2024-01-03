import { useRecoilValue } from 'recoil';

import { idTokenState, userState } from '@src/states/user';
import { vegetableStockRepository } from '../repositories/vegetableStockRepository';

export const useUpsertVegetableStock = () => {
  const idToken = useRecoilValue(idTokenState);
  const user = useRecoilValue(userState);

  return async ({
    vegetableId,
    quantity,
  }: {
    vegetableId: number;
    quantity: number;
  }) => {
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
      const data = await vegetableStockRepository.update({
        idToken,
        userId: user!.uid,
        vegetableId,
        quantity: existingStock[0].quantity + quantity,
      });
      console.log('vegetableStockRepository.update: ', data);
      return data;
    }
  };
};
