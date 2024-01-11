import { SelectFilterOptions } from '@src/states/fridge/state';
import { MeatStocks } from '@src/states/fridge/meat/state';
import {
  sortOwnedIngredients,
  sortNearingExpirationDate,
  sortAiueo,
} from '@src/utils/logics/sortByFunctions';

/**
 * 肉在庫を絞り込む。
 *
 * @param meatStocks 肉在庫。
 * @param originalIds 絞り込み前の野菜在庫のIDの配列。
 * @param selectFilterOptions 絞り込みの選択肢。
 * @returns {number[]} 絞り込み後の野菜在庫のIDの配列。
 */
export const filterMeatStock = ({
  meatStocks,
  originalIds,
  selectFilterOptions,
}: {
  meatStocks: MeatStocks;
  originalIds: string[];
  selectFilterOptions: SelectFilterOptions;
}): string[] => {
  let sortedIds = [...originalIds];
  switch (selectFilterOptions.sort) {
    case '通常':
      // 通常はそのままの順番で表示する。
      sortedIds = [...originalIds];
      break;
    case '所有食材':
      sortedIds = sortOwnedIngredients(originalIds, meatStocks);
      break;
    case '賞味期限が近いもの':
      sortedIds = sortNearingExpirationDate(originalIds, meatStocks);
      break;
    case 'あいうえお順':
      sortedIds = sortAiueo(originalIds, meatStocks);
      break;
    default:
      sortedIds = [...originalIds];
      break;
  }
  return sortedIds;
};
