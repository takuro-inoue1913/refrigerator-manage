import { useRecoilValue } from 'recoil';

import { idTokenState, userState } from '@src/states/user';
import { customMeatMasterRepository } from '@src/interface/repositories/customMeatMasterRepository';
import Toast from 'react-native-toast-message';

type InsertCustomMeatMasterArgs = {
  meatName: string;
  displayName: string;
  imageUri: string;
  defaultExpirationPeriod: number;
  unitId: number;
};

export const useRequestInsertCustomMeatMaster = () => {
  const idToken = useRecoilValue(idTokenState);
  const user = useRecoilValue(userState);

  return async (args: InsertCustomMeatMasterArgs) => {
    if (user?.uid === undefined) {
      throw new Error('user is not defined');
    }
    try {
      const data = await customMeatMasterRepository.insert({
        idToken,
        userId: user.uid,
        ...args,
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
