import { FILTER_OPTIONS } from '@src/utils/consts';
import { atom } from 'recoil';

export type SelectFridgeCategory =
  | '野菜類'
  | '肉類'
  | '魚介類'
  | '主食・粉'
  | 'スパイス'
  | '調味料'
  | '卵・乳・豆'
  | 'デザート'
  | 'その他';

export type SelectFilterOptions = {
  sort: (typeof FILTER_OPTIONS)['sort'][number];
};

export type UnitMater = {
  id: number;
  name: string;
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

export const unitMasterState = atom<UnitMater[]>({
  key: 'unitMasterState',
  default: [],
});
