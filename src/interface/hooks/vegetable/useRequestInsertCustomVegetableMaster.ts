import { useRecoilValue } from 'recoil';

import { idTokenState, userState } from '@src/states/user';
import { customVegetableMasterRepository } from '@src/interface/repositories/customVegetableMasterRepository';
import { vegetableStockRepository } from '@src/interface/repositories/vegetableStockRepository';
import Toast from 'react-native-toast-message';

type InsertCustomVegetableMasterArgs = {
  vegetableName: string;
  displayName: string;
  imageUri: string;
  incrementUnit: number;
  defaultExpirationPeriod: number;
  unitId: number;
  isFavorite: boolean;
};

export const useRequestInsertCustomVegetableMaster = () => {
  const idToken = useRecoilValue(idTokenState);
  const user = useRecoilValue(userState);

  return async (args: InsertCustomVegetableMasterArgs) => {
    if (user?.uid === undefined) {
      throw new Error('user is not defined');
    }
    try {
      const data = await customVegetableMasterRepository.insert({
        idToken,
        userId: user.uid,
        ...args,
      });

      await vegetableStockRepository.insert({
        idToken,
        userId: user.uid,
        vegetableId: data!.custom_vegetable_id,
        quantity: 0,
        incrementalUnit: args.incrementUnit,
        defaultExpirationPeriod: args.defaultExpirationPeriod,
        isFavorite: args.isFavorite,
      });
      return data;
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'サーバーエラーが発生しました',
        text2: '時間をおいて再度お試しください',
      });
      throw error;
    }
  };
};
