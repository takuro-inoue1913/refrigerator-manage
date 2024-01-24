import { useRecoilValue } from 'recoil';

import { idTokenState } from '@src/states/user';
import { customOtherMasterRepository } from '@src/interface/repositories/customOtherMasterRepository';
import Toast from 'react-native-toast-message';

export const useRequestDeleteCustomOtherMaster = () => {
  const idToken = useRecoilValue(idTokenState);

  return async (otherId: string) => {
    try {
      const data = await customOtherMasterRepository.delete({
        idToken,
        otherId,
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
