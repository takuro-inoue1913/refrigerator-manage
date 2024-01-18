import { useRecoilCallback } from 'recoil';
import {
  StapleFoodStocks,
  stapleFoodStocksIdsState,
  stapleFoodStocksState,
} from '@src/states/fridge/stapleFood/state';
import { filterStapleFoodStock } from '@src/states/fridge/stapleFood/logics/filterStapleFoodStock';
import { selectFilterOptionsState } from '@src/states/fridge';

type StapleFoodStockActions = {
  increaseStapleFoodStock: ({
    id,
    quantity,
  }: {
    /** 増やすID */
    id: string;
    /** 増やす数を指定。 */
    quantity: number;
  }) => void;
  decreaseStapleFoodStock: ({
    id,
    quantity,
  }: {
    /** 減らすID */
    id: string;
    /** 減らす数を指定。 */
    quantity: number;
  }) => void;
  updateStapleFoodStockDetail: ({
    id,
    quantity,
    incrementalUnit,
    expirationDate,
    memo,
    isFavorite,
  }: {
    /** 更新するID */
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
    /** 更新するID */
    id: string;
    /** 更新するお気に入りの状態を指定。 */
    isFavorite: boolean;
  }) => void;
};

export const useStapleFoodStockActions = () => {
  const increaseStapleFoodStock: StapleFoodStockActions['increaseStapleFoodStock'] =
    useRecoilCallback(
      ({ set }) =>
        ({ id: stapleFoodId, quantity }) => {
          set(stapleFoodStocksState, (prev) => {
            const newStocks: StapleFoodStocks = {
              ids: [...prev.ids],
              byId: prev.ids.reduce(
                (acc, cur) => {
                  acc[cur] = { ...prev.byId[cur] };
                  if (cur === stapleFoodId) {
                    acc[cur].quantity += quantity;
                    acc[cur].hasStock = true;
                  }
                  return acc;
                },
                {} as StapleFoodStocks['byId'],
              ),
            };
            return newStocks;
          });
        },
      [],
    );

  const decreaseStapleFoodStock: StapleFoodStockActions['decreaseStapleFoodStock'] =
    useRecoilCallback(
      ({ set }) =>
        ({ id: stapleFoodId, quantity }) => {
          set(stapleFoodStocksState, (prev) => {
            const updatedQuantity = prev.byId[stapleFoodId].quantity - quantity;

            const newStocks: StapleFoodStocks = {
              ids: [...prev.ids],
              byId: prev.ids.reduce(
                (acc, cur) => {
                  acc[cur] = { ...prev.byId[cur] };
                  if (cur === stapleFoodId) {
                    acc[cur].quantity = Math.max(updatedQuantity, 0);
                    acc[cur].hasStock = updatedQuantity > 0;
                  }
                  return acc;
                },
                {} as StapleFoodStocks['byId'],
              ),
            };
            return newStocks;
          });
        },
      [],
    );

  const updateStapleFoodStockDetail: StapleFoodStockActions['updateStapleFoodStockDetail'] =
    useRecoilCallback(
      ({ set }) =>
        ({
          id: stapleFoodId,
          quantity,
          incrementalUnit,
          expirationDate,
          memo,
          isFavorite,
        }) => {
          set(stapleFoodStocksState, (prev) => {
            const newStocks: StapleFoodStocks = {
              ids: [...prev.ids],
              byId: prev.ids.reduce(
                (acc, cur) => {
                  acc[cur] = { ...prev.byId[cur] };
                  if (cur === stapleFoodId) {
                    acc[cur].quantity = quantity;
                    acc[cur].incrementalUnit = incrementalUnit;
                    acc[cur].expirationDate = expirationDate;
                    acc[cur].memo = memo;
                    acc[cur].hasStock = quantity > 0;
                    acc[cur].isFavorite = isFavorite;
                  }
                  return acc;
                },
                {} as StapleFoodStocks['byId'],
              ),
            };
            return newStocks;
          });
        },
      [],
    );

  const filterStapleFoodStocks: StapleFoodStockActions['filterVegetableStocks'] =
    useRecoilCallback(
      ({ snapshot, set }) =>
        async () => {
          const selectFilterOptions = await snapshot.getPromise(
            selectFilterOptionsState,
          );
          const stapleFoodStocksIds = await snapshot.getPromise(
            stapleFoodStocksIdsState,
          );
          set(stapleFoodStocksState, (prev) => {
            const sortedIds = filterStapleFoodStock({
              stapleFoodStocks: prev,
              originalIds: stapleFoodStocksIds,
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

  const updateIsFavorite: StapleFoodStockActions['updateIsFavorite'] =
    useRecoilCallback(
      ({ set }) =>
        ({ id: stapleFoodId, isFavorite }) => {
          set(stapleFoodStocksState, (prev) => {
            const newStocks: StapleFoodStocks = {
              ids: [...prev.ids],
              byId: prev.ids.reduce(
                (acc, cur) => {
                  acc[cur] = { ...prev.byId[cur] };
                  if (cur === stapleFoodId) {
                    acc[cur].isFavorite = isFavorite;
                  }
                  return acc;
                },
                {} as StapleFoodStocks['byId'],
              ),
            };
            return newStocks;
          });
        },
      [],
    );

  const deleteStapleFoodStock = useRecoilCallback(
    ({ set }) =>
      (stapleFoodId: string) => {
        set(stapleFoodStocksState, (prev) => {
          const newStocks: StapleFoodStocks = {
            ids: prev.ids.filter((id) => id !== stapleFoodId),
            byId: prev.ids.reduce(
              (acc, cur) => {
                if (cur === stapleFoodId) {
                  return acc;
                }
                acc[cur] = { ...prev.byId[cur] };
                return acc;
              },
              {} as StapleFoodStocks['byId'],
            ),
          };
          return newStocks;
        });
      },
    [],
  );

  return {
    increaseStapleFoodStock,
    decreaseStapleFoodStock,
    updateStapleFoodStockDetail,
    filterStapleFoodStocks,
    updateIsFavorite,
    deleteStapleFoodStock,
  };
};
