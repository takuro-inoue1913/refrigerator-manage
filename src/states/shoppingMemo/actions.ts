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
        quantity,
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
            quantity,
          },
        ]);
      },
  );

  const upsertShoppingMemo = useRecoilCallback(
    ({ set }) =>
      ({
        id,
        prevId,
        name,
        displayName,
        imageUri,
        fridgeType,
        unitName,
        incrementalUnit,
        quantity,
      }: ShoppingMemo & {
        prevId: string | null;
      }) => {
        set(shoppingMemosState, (prev) =>
          prev.map((shoppingMemo) => {
            if (shoppingMemo.id === prevId) {
              return {
                id,
                name,
                displayName,
                imageUri,
                fridgeType,
                unitName,
                incrementalUnit,
                quantity,
              };
            }
            return shoppingMemo;
          }),
        );
      },
  );

  const deleteShoppingMemo = useRecoilCallback(
    ({ set }) =>
      ({ id }: { id: string }) => {
        set(shoppingMemosState, (prev) =>
          prev.filter((shoppingMemo) => shoppingMemo.id !== id),
        );
      },
  );

  return {
    addShoppingMemo,
    upsertShoppingMemo,
    deleteShoppingMemo,
  };
};
