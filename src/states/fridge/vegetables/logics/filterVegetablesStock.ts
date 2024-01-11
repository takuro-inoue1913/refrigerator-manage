import { SelectFilterOptions } from '@src/states/fridge/state';
import { VegetablesStocks } from '@src/states/fridge/vegetables/state';
import {
  sortOwnedIngredients,
  sortNearingExpirationDate,
  sortAiueo,
  sortNormal,
} from '@src/utils/logics/sortByFunctions';

/**
 * 野菜在庫を絞り込む。
 *
 * @param vegetablesStocks 野菜在庫。
 * @param originalIds 絞り込み前の野菜在庫のIDの配列。
 * @param selectFilterOptions 絞り込みの選択肢。
 * @returns {string[]} 絞り込み後の野菜在庫のIDの配列。
 */
export const filterVegetablesStock = ({
  vegetablesStocks,
  originalIds,
  selectFilterOptions,
}: {
  vegetablesStocks: VegetablesStocks;
  originalIds: string[];
  selectFilterOptions: SelectFilterOptions;
}): string[] => {
  let sortedIds = [...originalIds];
  switch (selectFilterOptions.sort) {
    case '通常':
      sortedIds = sortNormal(originalIds, vegetablesStocks);
      break;
    case '所有食材':
      sortedIds = sortOwnedIngredients(originalIds, vegetablesStocks);
      break;
    case '賞味期限が近いもの':
      sortedIds = sortNearingExpirationDate(originalIds, vegetablesStocks);
      break;
    case 'あいうえお順':
      sortedIds = sortAiueo(originalIds, vegetablesStocks);
      break;
    default:
      sortedIds = [...originalIds];
      break;
  }
  return sortedIds;
};
