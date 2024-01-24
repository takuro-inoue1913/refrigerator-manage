import { useRecoilState, useRecoilValue } from 'recoil';

import { idTokenState } from '@src/states/user';
import { shoppingMemoRepository } from '@src/interface/repositories/shoppingMemoRepository';
import { useQuery } from '@tanstack/react-query';
import { generateShoppingMemo } from '@src/interface/logics/generate/generateShoppingMemo';
import { shoppingMemosState } from '@src/states/shoppingMemo';
import { fridgeMasterState } from '@src/states/fridge';

export const useRequestGetAllShoppingMemo = () => {
  const idToken = useRecoilValue(idTokenState);
  const [shoppingMemo, setShoppingMemo] = useRecoilState(shoppingMemosState);
  const fridgeMaster = useRecoilValue(fridgeMasterState);

  const { isFetching, refetch } = useQuery({
    queryKey: ['graphl', 'get', 'all', 'shopping', 'memo'],
    queryFn: async () => {
      const data = await shoppingMemoRepository.getAll({ idToken });
      if (fridgeMaster.length > 0) {
        const _shoppingMemo = generateShoppingMemo(data, fridgeMaster);
        setShoppingMemo(_shoppingMemo);
      }
      return data;
    },
    enabled: fridgeMaster.length > 0,
  });

  return {
    isFetching,
    shoppingMemo,
    refetch,
  };
};
