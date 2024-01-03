import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import { idTokenState } from '@src/states/user';
import { vegetableStockRepository } from '../repositories/vegetableStockRepository';

export const useUpsertVegetableStock = () => {
  const idToken = useRecoilValue(idTokenState);

  return async ({
    userId,
    vegetableId,
    quantity,
  }: {
    userId: string;
    vegetableId: number;
    quantity: number;
  }) =>
    useQuery({
      queryKey: ['graphl', 'upsert', 'vegetable', 'stock'],
      queryFn: async () => {
        const existingStock = await vegetableStockRepository.getOne({
          idToken,
          userId,
          vegetableId,
        });
        if (existingStock.length === 0) {
          const data = await vegetableStockRepository.insert({
            idToken,
            userId,
            vegetableId,
            quantity,
          });
          return data;
        } else {
          const data = await vegetableStockRepository.update({
            idToken,
            userId,
            vegetableId,
            quantity,
          });
          return data;
        }
      },
      staleTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    });
};
