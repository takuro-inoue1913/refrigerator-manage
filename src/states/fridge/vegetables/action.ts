import { useRecoilCallback } from 'recoil';
import dayjs from 'dayjs';
import {
  VegetablesStocks,
  vegetablesStocksIdsState,
  vegetablesStocksState,
} from '@src/states/fridge/vegetables/state';
import {
  SelectFilterOptions,
  selectFilterOptionsState,
} from '@src/states/fridge/state';

type VegetableStockActions = {
  increaseVegetableStock: ({
    id,
    quantity,
  }: {
    /** 増やす野菜のID */
    id: number;
    /** 増やす数を指定。 */
    quantity: number;
  }) => void;
  decreaseVegetableStock: ({
    id,
    quantity,
  }: {
    /** 減らす野菜のID */
    id: number;
    /** 減らす数を指定。 */
    quantity: number;
  }) => void;
  updateVegetableStockDetail: ({
    id,
    quantity,
    incrementalUnit,
    expirationDate,
    memo,
  }: {
    /** 更新する野菜のID */
    id: number;
    /** 更新する数量を指定。 */
    quantity: number;
    /** 更新する単位を指定。 */
    incrementalUnit: number;
    /** 更新する賞味期限を指定。 */
    expirationDate: string;
    /** 更新するメモを指定。 */
    memo: string;
  }) => void;
};

export const filterVegetablesStock = ({
  vegetablesStocks,
  originalIds,
  selectFilterOptions,
}: {
  vegetablesStocks: VegetablesStocks;
  originalIds: number[];
  selectFilterOptions: SelectFilterOptions;
}) => {
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

export const useVegetablesStockActions = () => {
  const increaseVegetableStock: VegetableStockActions['increaseVegetableStock'] =
    useRecoilCallback(
      ({ set }) =>
        ({ id: vegetableId, quantity }) => {
          set(vegetablesStocksState, (prev) => {
            const newStocks: VegetablesStocks = {
              ids: [...prev.ids],
              byId: prev.ids.reduce(
                (acc, cur) => {
                  acc[cur] = { ...prev.byId[cur] };
                  if (cur === vegetableId) {
                    acc[cur].quantity += quantity;
                    acc[cur].hasStock = true;
                  }
                  return acc;
                },
                {} as VegetablesStocks['byId'],
              ),
            };
            return newStocks;
          });
        },
      [],
    );

  const decreaseVegetableStock: VegetableStockActions['decreaseVegetableStock'] =
    useRecoilCallback(
      ({ set }) =>
        ({ id: vegetableId, quantity }) => {
          set(vegetablesStocksState, (prev) => {
            const updatedQuantity = prev.byId[vegetableId].quantity - quantity;

            const newStocks: VegetablesStocks = {
              ids: [...prev.ids],
              byId: prev.ids.reduce(
                (acc, cur) => {
                  acc[cur] = { ...prev.byId[cur] };
                  if (cur === vegetableId) {
                    acc[cur].quantity = Math.max(updatedQuantity, 0);
                    acc[cur].hasStock = updatedQuantity > 0;
                  }
                  return acc;
                },
                {} as VegetablesStocks['byId'],
              ),
            };
            return newStocks;
          });
        },
      [],
    );

  const updateVegetableStockDetail: VegetableStockActions['updateVegetableStockDetail'] =
    useRecoilCallback(
      ({ set }) =>
        ({
          id: vegetableId,
          quantity,
          incrementalUnit,
          expirationDate,
          memo,
        }) => {
          set(vegetablesStocksState, (prev) => {
            const newStocks: VegetablesStocks = {
              ids: [...prev.ids],
              byId: prev.ids.reduce(
                (acc, cur) => {
                  acc[cur] = { ...prev.byId[cur] };
                  if (cur === vegetableId) {
                    acc[cur].quantity = quantity;
                    acc[cur].incrementalUnit = incrementalUnit;
                    acc[cur].expirationDate = expirationDate;
                    acc[cur].memo = memo;
                    acc[cur].hasStock = quantity > 0;
                  }
                  return acc;
                },
                {} as VegetablesStocks['byId'],
              ),
            };
            return newStocks;
          });
        },
      [],
    );

  const filterVegetableStocks = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        const selectFilterOptions = await snapshot.getPromise(
          selectFilterOptionsState,
        );
        const vegetablesStocksIds = await snapshot.getPromise(
          vegetablesStocksIdsState,
        );
        set(vegetablesStocksState, (prev) => {
          const sortedIds = filterVegetablesStock({
            vegetablesStocks: prev,
            originalIds: vegetablesStocksIds,
            selectFilterOptions,
          });
          return {
            ids: sortedIds,
            byId: prev.byId,
          };
        });
      },
    [],
  );

  return {
    increaseVegetableStock,
    decreaseVegetableStock,
    updateVegetableStockDetail,
    filterVegetableStocks,
  };
};
