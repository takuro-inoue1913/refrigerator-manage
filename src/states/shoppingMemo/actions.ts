import {
  shoppingMemosState,
  ShoppingMemo,
} from '@src/states/shoppingMemo/state';
import { useRecoilCallback } from 'recoil';

export const useShoppingMemoActions = () => {
  const addShoppingMemo = useRecoilCallback(
    ({ set }) =>
      ({
        id,
        name,
        displayName,
        imageUri,
        fridgeType,
        unitName,
        incrementalUnit,
      }: ShoppingMemo) => {
        set(shoppingMemosState, (prev) => [
          ...prev,
          {
            id,
            name,
            displayName,
            imageUri,
            fridgeType,
            unitName,
            incrementalUnit,
          },
        ]);
      },
  );

  return {
    addShoppingMemo,
  };
};
