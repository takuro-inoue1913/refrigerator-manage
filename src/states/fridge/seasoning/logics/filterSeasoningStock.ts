import { SelectFilterOptions } from '@src/states/fridge/state';
import { SeasoningStocks } from '@src/states/fridge/seasoning/state';
import {
  sortOwnedIngredients,
  sortNearingExpirationDate,
  sortAiueo,
  sortNormal,
} from '@src/utils/logics/sortByFunctions';

/**
 * 在庫をフィルタリングする。
 *
 * @param seasoningStocks
 * @param originalIds
 * @param selectFilterOptions
 * @returns {number[]}
 */
export const filterSeasoningStock = ({
  seasoningStocks,
  originalIds,
  selectFilterOptions,
}: {
  seasoningStocks: SeasoningStocks;
  originalIds: string[];
  selectFilterOptions: SelectFilterOptions;
}): string[] => {
  let sortedIds = [...originalIds];
  switch (selectFilterOptions.sort) {
    case '通常':
      sortedIds = sortNormal(originalIds, seasoningStocks);
      break;
    case '所有食材':
      sortedIds = sortOwnedIngredients(originalIds, seasoningStocks);
      break;
    case '賞味期限が近いもの':
      sortedIds = sortNearingExpirationDate(originalIds, seasoningStocks);
      break;
    case 'あいうえお順':
      sortedIds = sortAiueo(originalIds, seasoningStocks);
      break;
    default:
      sortedIds = [...originalIds];
      break;
  }

  if (selectFilterOptions.searchFridgeName) {
    const searchLower = selectFilterOptions.searchFridgeName.toLowerCase();
    sortedIds = sortedIds.filter(
      (id) =>
        seasoningStocks.byId[id].name.toLowerCase().includes(searchLower) ||
        seasoningStocks.byId[id].displayName
          .toLowerCase()
          .includes(searchLower),
    );
  }
  return sortedIds;
};
