import { atom } from 'recoil';
import { TypeName } from '@src/states/fridge';

export type ShoppingMemo = {
  id: string;
  name: string;
  displayName: string;
  imageUri: string;
  fridgeType: TypeName;
  /** 単位名 */
  unitName: string;
  /** 増減単位 */
  incrementalUnit: number;
  /** 数量 */
  quantity: number;
};

export const shoppingMemosState = atom<ShoppingMemo[]>({
  key: 'shoppingMemosState',
  default: [],
});
