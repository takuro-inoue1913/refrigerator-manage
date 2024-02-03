import { SelectFilterOptions } from '@src/states/fridge/state';
import { FishStocks } from '@src/states/fridge/fish/state';
import {
  sortOwnedIngredients,
  sortNearingExpirationDate,
  sortAiueo,
  sortNormal,
} from '@src/utils/logics/sortByFunctions';

/**
 * 在庫をフィルタリングする。
 *
 * @param fishStocks
 * @param originalIds
 * @param selectFilterOptions
 * @returns {number[]}
 */
export const filterFishStock = ({
  fishStocks,
  originalIds,
  selectFilterOptions,
}: {
  fishStocks: FishStocks;
  originalIds: string[];
  selectFilterOptions: SelectFilterOptions;
}): string[] => {
  let sortedIds = [...originalIds];
  switch (selectFilterOptions.sort) {
    case '通常':
      sortedIds = sortNormal(originalIds, fishStocks);
      break;
    case '所有食材':
      sortedIds = sortOwnedIngredients(originalIds, fishStocks);
      break;
    case '賞味期限が近いもの':
      sortedIds = sortNearingExpirationDate(originalIds, fishStocks);
      break;
    case 'あいうえお順':
      sortedIds = sortAiueo(originalIds, fishStocks);
      break;
    default:
      sortedIds = [...originalIds];
      break;
  }

  if (selectFilterOptions.searchFridgeName) {
    const searchLower = selectFilterOptions.searchFridgeName.toLowerCase();
    sortedIds = sortedIds.filter(
      (id) =>
        fishStocks.byId[id].name.toLowerCase().includes(searchLower) ||
        fishStocks.byId[id].displayName.toLowerCase().includes(searchLower),
    );
  }
  return sortedIds;
};
