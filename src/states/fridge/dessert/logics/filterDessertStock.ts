import { SelectFilterOptions } from '@src/states/fridge/state';
import { DessertStocks } from '@src/states/fridge/dessert/state';
import {
  sortOwnedIngredients,
  sortNearingExpirationDate,
  sortAiueo,
  sortNormal,
} from '@src/utils/logics/sortByFunctions';

/**
 * 在庫をフィルタリングする。
 *
 * @param dessertStocks
 * @param originalIds
 * @param selectFilterOptions
 * @returns {number[]}
 */
export const filterDessertStock = ({
  dessertStocks,
  originalIds,
  selectFilterOptions,
}: {
  dessertStocks: DessertStocks;
  originalIds: string[];
  selectFilterOptions: SelectFilterOptions;
}): string[] => {
  let sortedIds = [...originalIds];
  switch (selectFilterOptions.sort) {
    case '通常':
      sortedIds = sortNormal(originalIds, dessertStocks);
      break;
    case '所有食材':
      sortedIds = sortOwnedIngredients(originalIds, dessertStocks);
      break;
    case '賞味期限が近いもの':
      sortedIds = sortNearingExpirationDate(originalIds, dessertStocks);
      break;
    case 'あいうえお順':
      sortedIds = sortAiueo(originalIds, dessertStocks);
      break;
    default:
      sortedIds = [...originalIds];
      break;
  }
  return sortedIds;
};
