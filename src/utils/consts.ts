import { SelectFridgeCategory } from '@src/states/fridge';

/** FridgeScreen でのカテゴリー選択肢の型。 */
export type SelectItems = {
  label: string;
  value: SelectFridgeCategory;
}[];

/** 画像を押したときの引数の型。 */
export type OnPressImageArgs = {
  /** 対象ID */
  targetId: number;
  /** 現在の在庫数 */
  currentQuantity: number;
  /** 増減単位 */
  incrementalUnit: number;
};

/** FridgeScreen でのカテゴリー選択肢。 */
export const selectItems: SelectItems = [
  { label: '野菜類', value: 'vegetable' },
  { label: '肉類', value: 'meat' },
];

/** 共通の青色。 */
export const COMMON_COLOR_BLUE = '#3498db';
/** 共通の緑色。 */
export const COMMON_COLOR_GREEN = '#2ecc71';
