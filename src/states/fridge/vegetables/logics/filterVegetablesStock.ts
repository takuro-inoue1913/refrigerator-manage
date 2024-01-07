import dayjs from 'dayjs';
import { SelectFilterOptions } from '@src/states/fridge/state';
import { VegetablesStocks } from '@src/states/fridge/vegetables/state';

/**
 * 野菜在庫を絞り込む。
 *
 * @param vegetablesStocks 野菜在庫。
 * @param originalIds 絞り込み前の野菜在庫のIDの配列。
 * @param selectFilterOptions 絞り込みの選択肢。
 * @returns {number[]} 絞り込み後の野菜在庫のIDの配列。
 */
export const filterVegetablesStock = ({
  vegetablesStocks,
  originalIds,
  selectFilterOptions,
}: {
  vegetablesStocks: VegetablesStocks;
  originalIds: number[];
  selectFilterOptions: SelectFilterOptions;
}): number[] => {
  let sortedIds = [...originalIds];
  switch (selectFilterOptions.sort) {
    case '通常':
      // 通常はID順にソートする。
      sortedIds.sort((a, b) => a - b);
      break;
    case '所有食材':
      // hasStock が true のものを優先してソートし、、その後、残りのものを id 順にソートする。
      {
        const sortedIdsWithStock = [...sortedIds].filter(
          (id) => vegetablesStocks.byId[id].hasStock,
        );
        const sortedIdsWithoutStock = [...sortedIds].filter(
          (id) => !vegetablesStocks.byId[id].hasStock,
        );
        sortedIds = [...sortedIdsWithStock, ...sortedIdsWithoutStock];
      }
      break;
    case '賞味期限が近いもの':
      // hasStock が true のものを賞味期限が近いものを優先してソートし、その後、残りのものを賞味期限が近いものを優先してソートする。
      {
        const now = dayjs();
        const sortedIdsWithExpirationDate = [...sortedIds]
          .filter((id) => vegetablesStocks.byId[id].hasStock)
          .sort((a, b) => {
            const aExpirationDate = dayjs(
              vegetablesStocks.byId[a].expirationDate,
            );
            const bExpirationDate = dayjs(
              vegetablesStocks.byId[b].expirationDate,
            );
            const aDiff = aExpirationDate.diff(now, 'day');
            const bDiff = bExpirationDate.diff(now, 'day');
            return aDiff - bDiff;
          });
        const sortedIdsWithoutExpirationDate = [...sortedIds]
          .filter((id) => !vegetablesStocks.byId[id].hasStock)
          .sort((a, b) => {
            const aExpirationDate = dayjs(
              vegetablesStocks.byId[a].expirationDate,
            );
            const bExpirationDate = dayjs(
              vegetablesStocks.byId[b].expirationDate,
            );
            const aDiff = aExpirationDate.diff(now, 'day');
            const bDiff = bExpirationDate.diff(now, 'day');
            return aDiff - bDiff;
          });
        sortedIds = [
          ...sortedIdsWithExpirationDate,
          ...sortedIdsWithoutExpirationDate,
        ];
      }

      break;
    case 'あいうえお順':
      // 名前でソートする。
      sortedIds.sort((a, b) =>
        vegetablesStocks.byId[a].vegetableName.localeCompare(
          vegetablesStocks.byId[b].vegetableName,
        ),
      );
      break;
    default:
      sortedIds = vegetablesStocks.ids;
      break;
  }
  return sortedIds;
};
