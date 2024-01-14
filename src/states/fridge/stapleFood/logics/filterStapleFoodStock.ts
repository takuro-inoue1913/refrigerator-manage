import { SelectFilterOptions } from '@src/states/fridge/state';
import { StapleFoodStocks } from '@src/states/fridge/stapleFood/state';
import {
  sortOwnedIngredients,
  sortNearingExpirationDate,
  sortAiueo,
  sortNormal,
} from '@src/utils/logics/sortByFunctions';

/**
 * 在庫をフィルタリングする。
 *
 * @param stapleFoodStocks
 * @param originalIds
 * @param selectFilterOptions
 * @returns {number[]}
 */
export const filterStapleFoodStock = ({
  stapleFoodStocks,
  originalIds,
  selectFilterOptions,
}: {
  stapleFoodStocks: StapleFoodStocks;
  originalIds: string[];
  selectFilterOptions: SelectFilterOptions;
}): string[] => {
  let sortedIds = [...originalIds];
  switch (selectFilterOptions.sort) {
    case '通常':
      sortedIds = sortNormal(originalIds, stapleFoodStocks);
      break;
    case '所有食材':
      sortedIds = sortOwnedIngredients(originalIds, stapleFoodStocks);
      break;
    case '賞味期限が近いもの':
      sortedIds = sortNearingExpirationDate(originalIds, stapleFoodStocks);
      break;
    case 'あいうえお順':
      sortedIds = sortAiueo(originalIds, stapleFoodStocks);
      break;
    default:
      sortedIds = [...originalIds];
      break;
  }
  return sortedIds;
};
