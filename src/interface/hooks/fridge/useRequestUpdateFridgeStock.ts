import { useRecoilValue } from 'recoil';

// import { useRef, useEffect } from 'react';
import { TypeName } from '@src/states/fridge';
import { idTokenState, userState } from '@src/states/user';
import { useRequestUpsertVegetableStock } from '@src/interface/hooks/fridge/vegetable/useRequestUpsertVegetableStock';

type DecreaseFridgeStockArgs = {
  masterId: string;
  quantity: number;
  fridgeType: TypeName;
};

export const useRequestUpdateFridgeStock = () => {
  const idToken = useRecoilValue(idTokenState);
  const user = useRecoilValue(userState);
  const requestUpsertVegetableStock = useRequestUpsertVegetableStock();

  return async ({
    masterId,
    quantity,
    fridgeType,
  }: DecreaseFridgeStockArgs) => {
    if (!idToken) {
      throw new Error('idToken is not exist');
    }
    if (!user) {
      throw new Error('user is not exist');
    }

    switch (fridgeType) {
      case 'vegetable_master':
        return requestUpsertVegetableStock({
          id: masterId,
          quantity,
        });
    }
  };
};
