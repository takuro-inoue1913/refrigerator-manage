/** FridgeScreen でのカテゴリー。*/
export type SelectFridgeCategory = 'vegetables' | 'meats';

/** FridgeScreen でのカテゴリー選択肢の型。 */
export type SelectItems = {
  label: string;
  value: SelectFridgeCategory;
}[];

/** FridgeScreen でのカテゴリー選択肢。 */
export const selectItems: SelectItems = [
  { label: '野菜類', value: 'vegetables' },
  { label: '肉類', value: 'meats' },
] as const;
