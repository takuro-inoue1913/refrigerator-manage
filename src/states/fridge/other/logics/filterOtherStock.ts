import { SelectFilterOptions } from '@src/states/fridge/state';
import { OtherStocks } from '@src/states/fridge/other/state';
import {
  sortOwnedIngredients,
  sortNearingExpirationDate,
  sortAiueo,
  sortNormal,
} from '@src/utils/logics/sortByFunctions';

/**
 * 在庫をフィルタリングする。
 *
 * @param otherStocks
 * @param originalIds
 * @param selectFilterOptions
 * @returns {number[]}
 */
export const filterOtherStock = ({
  otherStocks,
  originalIds,
  selectFilterOptions,
}: {
  otherStocks: OtherStocks;
  originalIds: string[];
  selectFilterOptions: SelectFilterOptions;
}): string[] => {
  let sortedIds = [...originalIds];
  switch (selectFilterOptions.sort) {
    case '通常':
      sortedIds = sortNormal(originalIds, otherStocks);
      break;
    case '所有食材':
      sortedIds = sortOwnedIngredients(originalIds, otherStocks);
      break;
    case '賞味期限が近いもの':
      sortedIds = sortNearingExpirationDate(originalIds, otherStocks);
      break;
    case 'あいうえお順':
      sortedIds = sortAiueo(originalIds, otherStocks);
      break;
    default:
      sortedIds = [...originalIds];
      break;
  }
  return sortedIds;
};
