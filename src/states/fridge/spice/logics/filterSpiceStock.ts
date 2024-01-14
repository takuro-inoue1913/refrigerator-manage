import { SelectFilterOptions } from '@src/states/fridge/state';
import { SpiceStocks } from '@src/states/fridge/spice/state';
import {
  sortOwnedIngredients,
  sortNearingExpirationDate,
  sortAiueo,
  sortNormal,
} from '@src/utils/logics/sortByFunctions';

/**
 * 在庫をフィルタリングする。
 *
 * @param spiceStocks
 * @param originalIds
 * @param selectFilterOptions
 * @returns {number[]}
 */
export const filterSpiceStock = ({
  spiceStocks,
  originalIds,
  selectFilterOptions,
}: {
  spiceStocks: SpiceStocks;
  originalIds: string[];
  selectFilterOptions: SelectFilterOptions;
}): string[] => {
  let sortedIds = [...originalIds];
  switch (selectFilterOptions.sort) {
    case '通常':
      sortedIds = sortNormal(originalIds, spiceStocks);
      break;
    case '所有食材':
      sortedIds = sortOwnedIngredients(originalIds, spiceStocks);
      break;
    case '賞味期限が近いもの':
      sortedIds = sortNearingExpirationDate(originalIds, spiceStocks);
      break;
    case 'あいうえお順':
      sortedIds = sortAiueo(originalIds, spiceStocks);
      break;
    default:
      sortedIds = [...originalIds];
      break;
  }
  return sortedIds;
};
