import { useRecoilValue } from 'recoil';

import { idTokenState, userState } from '@src/states/user';
import { customVegetableMasterRepository } from '@src/interface/repositories/customVegetableMasterRepository';

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
    const data = await customVegetableMasterRepository.insert({
      idToken,
      userId: user.uid,
      ...args,
    });
    console.log(data);
    return data;
  };
};
