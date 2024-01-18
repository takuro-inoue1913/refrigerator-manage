import { useRecoilCallback } from 'recoil';
import {
  MeatStocks,
  meatStocksIdsState,
  meatStocksState,
} from '@src/states/fridge/meat/state';
import { filterMeatStock } from '@src/states/fridge/meat/logics/filterMeatStock';
import { selectFilterOptionsState } from '@src/states/fridge';

type MeatStockActions = {
  increaseMeatStock: ({
    id,
    quantity,
  }: {
    /** 増やす肉ID */
    id: string;
    /** 増やす数を指定。 */
    quantity: number;
  }) => void;
  decreaseMeatStock: ({
    id,
    quantity,
  }: {
    /** 減らす肉ID */
    id: string;
    /** 減らす数を指定。 */
    quantity: number;
  }) => void;
  updateMeatStockDetail: ({
    id,
    quantity,
    incrementalUnit,
    expirationDate,
    memo,
    isFavorite,
  }: {
    /** 更新する肉ID */
    id: string;
    /** 更新する数量を指定。 */
    quantity: number;
    /** 更新する単位を指定。 */
    incrementalUnit: number;
    /** 更新する賞味期限を指定。 */
    expirationDate: string;
    /** 更新するメモを指定。 */
    memo: string;
    /** 更新するお気に入りの状態を指定。 */
    isFavorite: boolean;
  }) => void;
  filterVegetableStocks: () => void;
  updateIsFavorite: ({
    id,
    isFavorite,
  }: {
    /** 更新する肉ID */
    id: string;
    /** 更新するお気に入りの状態を指定。 */
    isFavorite: boolean;
  }) => void;
};

export const useMeatStockActions = () => {
  const increaseMeatStock: MeatStockActions['increaseMeatStock'] =
    useRecoilCallback(
      ({ set }) =>
        ({ id: meatId, quantity }) => {
          set(meatStocksState, (prev) => {
            const newStocks: MeatStocks = {
              ids: [...prev.ids],
              byId: prev.ids.reduce(
                (acc, cur) => {
                  acc[cur] = { ...prev.byId[cur] };
                  if (cur === meatId) {
                    acc[cur].quantity += quantity;
                    acc[cur].hasStock = true;
                  }
                  return acc;
                },
                {} as MeatStocks['byId'],
              ),
            };
            return newStocks;
          });
        },
      [],
    );

  const decreaseMeatStock: MeatStockActions['decreaseMeatStock'] =
    useRecoilCallback(
      ({ set }) =>
        ({ id: meatId, quantity }) => {
          set(meatStocksState, (prev) => {
            const updatedQuantity = prev.byId[meatId].quantity - quantity;

            const newStocks: MeatStocks = {
              ids: [...prev.ids],
              byId: prev.ids.reduce(
                (acc, cur) => {
                  acc[cur] = { ...prev.byId[cur] };
                  if (cur === meatId) {
                    acc[cur].quantity = Math.max(updatedQuantity, 0);
                    acc[cur].hasStock = updatedQuantity > 0;
                  }
                  return acc;
                },
                {} as MeatStocks['byId'],
              ),
            };
            return newStocks;
          });
        },
      [],
    );

  const updateMeatStockDetail: MeatStockActions['updateMeatStockDetail'] =
    useRecoilCallback(
      ({ set }) =>
        ({
          id: meatId,
          quantity,
          incrementalUnit,
          expirationDate,
          memo,
          isFavorite,
        }) => {
          set(meatStocksState, (prev) => {
            const newStocks: MeatStocks = {
              ids: [...prev.ids],
              byId: prev.ids.reduce(
                (acc, cur) => {
                  acc[cur] = { ...prev.byId[cur] };
                  if (cur === meatId) {
                    acc[cur].quantity = quantity;
                    acc[cur].incrementalUnit = incrementalUnit;
                    acc[cur].expirationDate = expirationDate;
                    acc[cur].memo = memo;
                    acc[cur].hasStock = quantity > 0;
                    acc[cur].isFavorite = isFavorite;
                  }
                  return acc;
                },
                {} as MeatStocks['byId'],
              ),
            };
            return newStocks;
          });
        },
      [],
    );

  const filterMeatStocks: MeatStockActions['filterVegetableStocks'] =
    useRecoilCallback(
      ({ snapshot, set }) =>
        async () => {
          const selectFilterOptions = await snapshot.getPromise(
            selectFilterOptionsState,
          );
          const meatStocksIds = await snapshot.getPromise(meatStocksIdsState);
          set(meatStocksState, (prev) => {
            const sortedIds = filterMeatStock({
              meatStocks: prev,
              originalIds: meatStocksIds,
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

  const updateIsFavorite: MeatStockActions['updateIsFavorite'] =
    useRecoilCallback(
      ({ set }) =>
        ({ id: meatId, isFavorite }) => {
          set(meatStocksState, (prev) => {
            const newStocks: MeatStocks = {
              ids: [...prev.ids],
              byId: prev.ids.reduce(
                (acc, cur) => {
                  acc[cur] = { ...prev.byId[cur] };
                  if (cur === meatId) {
                    acc[cur].isFavorite = isFavorite;
                  }
                  return acc;
                },
                {} as MeatStocks['byId'],
              ),
            };
            return newStocks;
          });
        },
      [],
    );

  const deleteMeatStock = useRecoilCallback(
    ({ set }) =>
      (meatId: string) => {
        set(meatStocksState, (prev) => {
          const newStocks: MeatStocks = {
            ids: prev.ids.filter((id) => id !== meatId),
            byId: prev.ids.reduce(
              (acc, cur) => {
                if (cur === meatId) {
                  return acc;
                }
                acc[cur] = { ...prev.byId[cur] };
                return acc;
              },
              {} as MeatStocks['byId'],
            ),
          };
          return newStocks;
        });
      },
    [],
  );
  return {
    increaseMeatStock,
    decreaseMeatStock,
    updateMeatStockDetail,
    filterMeatStocks,
    updateIsFavorite,
    deleteMeatStock,
  };
};
