import { GetShoppingMemosQuery } from '@src/interface/__generated__/graphql';
import { FridgeMaster } from '@src/states/fridge';
import { ShoppingMemo } from '@src/states/shoppingMemo';

/**
 * shoppingMemo の生成
 * @param {GetShoppingMemosQuery} data
 */
export const generateShoppingMemo = (
  data: GetShoppingMemosQuery,
  fridgeMaster: FridgeMaster[],
): ShoppingMemo => {
  const ids = data.shopping_memo.map((i) => i.shopping_memo_id);
  const _shoppingMemo: ShoppingMemo['byId'] = {};

  data.shopping_memo.forEach((i) => {
    const _fridgeMaster = fridgeMaster.find((j) => j.id === i.master_id);
    if (!_fridgeMaster) {
      throw new Error('fridgeMaster is not found');
    }

    _shoppingMemo[i.shopping_memo_id] = {
      id: i.shopping_memo_id,
      masterId: i.master_id,
      name: _fridgeMaster.name,
      displayName: _fridgeMaster.displayName,
      imageUri: _fridgeMaster.imageUri,
      fridgeType: _fridgeMaster.fridgeType,
      unitName: _fridgeMaster.unitName,
      incrementalUnit: _fridgeMaster.incrementalUnit,
      quantity: i.quantity,
    };
  });

  return {
    ids,
    byId: _shoppingMemo,
  };
};
