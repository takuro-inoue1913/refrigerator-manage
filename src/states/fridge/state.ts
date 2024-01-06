import { FILTER_OPTIONS } from '@src/utils/consts';
import { atom } from 'recoil';

export type SelectFridgeCategory = '野菜類' | '肉類';

export type SelectFilterOptions = {
  narrowDown: (typeof FILTER_OPTIONS)['narrowDown'][number];
};

export const selectFridgeCategoryState = atom<SelectFridgeCategory>({
  key: 'selectedCategoryState',
  default: '野菜類',
});

export const selectFilterOptionsState = atom<SelectFilterOptions>({
  key: 'selectFilterOptionsState',
  default: {
    narrowDown: '通常',
  },
});
