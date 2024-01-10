import { useRecoilValue } from 'recoil';

import { idTokenState, userState } from '@src/states/user';
import { customVegetableMasterRepository } from '@src/interface/repositories/customVegetableMasterRepository';
import Toast from 'react-native-toast-message';

type InsertCustomVegetableMasterArgs = {
  vegetableName: string;
  displayName: string;
  imageUri: string;
  defaultExpirationPeriod: number;
  unitId: number;
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
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (
        error.response &&
        error.response.errors &&
        error.response.errors.length > 0
      ) {
        const graphQLErrors = error.response.errors;
        const constraintViolationError = graphQLErrors.find(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (e: any) =>
            e.extensions && e.extensions.code === 'constraint-violation',
        );
        if (constraintViolationError) {
          Toast.show({
            type: 'error',
            text1: '同じ表示名が既に存在します',
            visibilityTime: 2000,
          });
          return null;
        }
      }
      throw error;
    }
  };
};
