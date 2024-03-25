import { atom } from 'recoil';
import { TypeName } from '@src/states/fridge';
import { NormalizedArray } from '@src/types';

export type Recipes = NormalizedArray<{
  id: string;
  /** レシピ名 */
  name: string;
  imageUri: string;
  materials: {
    id: string;
    masterId: string;
    fridgeType: TypeName;
    fridgeName: string;
    quantity: number;
  }[];
  descriptions: string[];
}>;

export const recipesState = atom<Recipes>({
  key: 'recipesState',
  default: {
    ids: [],
    byId: {},
  },
});
