import { FILTER_OPTIONS } from '@src/utils/consts';
import { atom } from 'recoil';

export type SelectFridgeCategory = '野菜類' | '肉類';

export type SelectFilterOptions = {
  sort: (typeof FILTER_OPTIONS)['sort'][number];
};

export const selectFridgeCategoryState = atom<SelectFridgeCategory>({
  key: 'selectedCategoryState',
  default: '野菜類',
});

export const selectFilterOptionsState = atom<SelectFilterOptions>({
  key: 'selectFilterOptionsState',
  default: {
    sort: '通常',
  },
});
