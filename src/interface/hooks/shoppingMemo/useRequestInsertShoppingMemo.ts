import { useRecoilValue } from 'recoil';

import { idTokenState } from '@src/states/user';
import { shoppingMemoRepository } from '@src/interface/repositories/shoppingMemoRepository';
import Toast from 'react-native-toast-message';

type InsertShoppingMemoArgs = {
  masterId: string;
  userId: string;
  quantity: number;
};

export const useRequestInsertShoppingMemo = () => {
  const idToken = useRecoilValue(idTokenState);

  return async (args: InsertShoppingMemoArgs) => {
    try {
      const data = await shoppingMemoRepository.insert({
        idToken,
        ...args,
      });
      return Promise.resolve(data);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'サーバーエラーが発生しました',
        text2: '時間をおいて再度お試しください',
      });
      return Promise.reject(error);
    }
  };
};
