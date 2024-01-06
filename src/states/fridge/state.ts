import { atom } from 'recoil';

export type SelectFridgeCategory = '野菜類' | '肉類';

export const selectFridgeCategoryState = atom<SelectFridgeCategory>({
  key: 'selectedCategoryState',
  default: '野菜類',
});
