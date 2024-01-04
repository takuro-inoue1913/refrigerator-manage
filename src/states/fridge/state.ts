import { atom } from 'recoil';

export type SelectFridgeCategory = 'vegetable' | 'meat';

export const selectFridgeCategoryState = atom<SelectFridgeCategory>({
  key: 'selectedCategoryState',
  default: 'vegetable',
});
