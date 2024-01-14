import { SelectFilterOptions } from '@src/states/fridge/state';
import { ProteinSourceStocks } from '@src/states/fridge/proteinSource/state';
import {
  sortOwnedIngredients,
  sortNearingExpirationDate,
  sortAiueo,
  sortNormal,
} from '@src/utils/logics/sortByFunctions';

/**
 * 在庫をフィルタリングする。
 *
 * @param proteinSourceStocks
 * @param originalIds
 * @param selectFilterOptions
 * @returns {number[]}
 */
export const filterProteinSourceStock = ({
  proteinSourceStocks,
  originalIds,
  selectFilterOptions,
}: {
  proteinSourceStocks: ProteinSourceStocks;
  originalIds: string[];
  selectFilterOptions: SelectFilterOptions;
}): string[] => {
  let sortedIds = [...originalIds];
  switch (selectFilterOptions.sort) {
    case '通常':
      sortedIds = sortNormal(originalIds, proteinSourceStocks);
      break;
    case '所有食材':
      sortedIds = sortOwnedIngredients(originalIds, proteinSourceStocks);
      break;
    case '賞味期限が近いもの':
      sortedIds = sortNearingExpirationDate(originalIds, proteinSourceStocks);
      break;
    case 'あいうえお順':
      sortedIds = sortAiueo(originalIds, proteinSourceStocks);
      break;
    default:
      sortedIds = [...originalIds];
      break;
  }
  return sortedIds;
};
