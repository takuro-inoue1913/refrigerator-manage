import dayjs from 'dayjs';
import { SelectFilterOptions } from '@src/states/fridge/state';
import { MeatStocks } from '@src/states/fridge/meat/state';

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
  originalIds: number[];
  selectFilterOptions: SelectFilterOptions;
}): number[] => {
  let sortedIds = [...originalIds];
  switch (selectFilterOptions.sort) {
    case '通常':
      // 通常はそのままの順番で表示する。
      sortedIds = [...originalIds];
      break;
    case '所有食材':
      // hasStock が true のものを優先してソートし、、その後、残りのものを id 順にソートする。
      {
        const sortedIdsWithStock = [...sortedIds].filter(
          (id) => meatStocks.byId[id].hasStock,
        );
        const sortedIdsWithoutStock = [...sortedIds].filter(
          (id) => !meatStocks.byId[id].hasStock,
        );
        sortedIds = [...sortedIdsWithStock, ...sortedIdsWithoutStock];
      }
      break;
    case '賞味期限が近いもの':
      // hasStock が true のものを賞味期限が近いものを優先してソートし、その後、残りのものを賞味期限が近いものを優先してソートする。
      {
        const now = dayjs();
        const sortedIdsWithExpirationDate = [...sortedIds]
          .filter((id) => meatStocks.byId[id].hasStock)
          .sort((a, b) => {
            const aExpirationDate = dayjs(meatStocks.byId[a].expirationDate);
            const bExpirationDate = dayjs(meatStocks.byId[b].expirationDate);
            const aDiff = aExpirationDate.diff(now, 'day');
            const bDiff = bExpirationDate.diff(now, 'day');
            return aDiff - bDiff;
          });
        const sortedIdsWithoutExpirationDate = [...sortedIds]
          .filter((id) => !meatStocks.byId[id].hasStock)
          .sort((a, b) => {
            const aExpirationDate = dayjs(meatStocks.byId[a].expirationDate);
            const bExpirationDate = dayjs(meatStocks.byId[b].expirationDate);
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
        meatStocks.byId[a].name.localeCompare(meatStocks.byId[b].name),
      );
      break;
    default:
      sortedIds = meatStocks.ids;
      break;
  }
  return sortedIds;
};
