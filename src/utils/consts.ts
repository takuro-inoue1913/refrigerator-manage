import { SelectFridgeCategory } from '@src/states/fridge';

/** FridgeScreen でのカテゴリー選択肢。 */
export const selectItems: SelectFridgeCategory[] = ['野菜類', '肉類'];

/** 共通の青色。 */
export const COMMON_COLOR_BLUE = '#3498db';
/** 共通の緑色。 */
export const COMMON_COLOR_GREEN = '#2ecc71';

/** 野菜の初期上限数。 */
export const VEGETABLE_DEFAULT__INCREMENTAL_UNIT = 1;

/** 肉の初期上限数。 */
export const MEAT_DEFAULT_INCREMENTAL_UNIT = 50;

/** 絞り込みの選択肢。 */
export const FILTER_OPTIONS = {
  sort: ['通常', '所有食材', '賞味期限が近いもの', 'あいうえお順'],
};
