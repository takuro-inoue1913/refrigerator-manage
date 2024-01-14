import { useRecoilCallback } from 'recoil';
import {
  DessertStocks,
  dessertStocksIdsState,
  dessertStocksState,
} from '@src/states/fridge/dessert/state';
import { filterDessertStock } from '@src/states/fridge/dessert/logics/filterDessertStock';
import { selectFilterOptionsState } from '@src/states/fridge';

type DessertStockActions = {
  increaseDessertStock: ({
    id,
    quantity,
  }: {
    /** 増やすID */
    id: string;
    /** 増やす数を指定。 */
    quantity: number;
  }) => void;
  decreaseDessertStock: ({
    id,
    quantity,
  }: {
    /** 減らすID */
    id: string;
    /** 減らす数を指定。 */
    quantity: number;
  }) => void;
  updateDessertStockDetail: ({
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

export const useDessertStockActions = () => {
  const increaseDessertStock: DessertStockActions['increaseDessertStock'] =
    useRecoilCallback(
      ({ set }) =>
        ({ id: dessertId, quantity }) => {
          set(dessertStocksState, (prev) => {
            const newStocks: DessertStocks = {
              ids: [...prev.ids],
              byId: prev.ids.reduce(
                (acc, cur) => {
                  acc[cur] = { ...prev.byId[cur] };
                  if (cur === dessertId) {
                    acc[cur].quantity += quantity;
                    acc[cur].hasStock = true;
                  }
                  return acc;
                },
                {} as DessertStocks['byId'],
              ),
            };
            return newStocks;
          });
        },
      [],
    );

  const decreaseDessertStock: DessertStockActions['decreaseDessertStock'] =
    useRecoilCallback(
      ({ set }) =>
        ({ id: dessertId, quantity }) => {
          set(dessertStocksState, (prev) => {
            const updatedQuantity = prev.byId[dessertId].quantity - quantity;

            const newStocks: DessertStocks = {
              ids: [...prev.ids],
              byId: prev.ids.reduce(
                (acc, cur) => {
                  acc[cur] = { ...prev.byId[cur] };
                  if (cur === dessertId) {
                    acc[cur].quantity = Math.max(updatedQuantity, 0);
                    acc[cur].hasStock = updatedQuantity > 0;
                  }
                  return acc;
                },
                {} as DessertStocks['byId'],
              ),
            };
            return newStocks;
          });
        },
      [],
    );

  const updateDessertStockDetail: DessertStockActions['updateDessertStockDetail'] =
    useRecoilCallback(
      ({ set }) =>
        ({
          id: dessertId,
          quantity,
          incrementalUnit,
          expirationDate,
          memo,
          isFavorite,
        }) => {
          set(dessertStocksState, (prev) => {
            const newStocks: DessertStocks = {
              ids: [...prev.ids],
              byId: prev.ids.reduce(
                (acc, cur) => {
                  acc[cur] = { ...prev.byId[cur] };
                  if (cur === dessertId) {
                    acc[cur].quantity = quantity;
                    acc[cur].incrementalUnit = incrementalUnit;
                    acc[cur].expirationDate = expirationDate;
                    acc[cur].memo = memo;
                    acc[cur].hasStock = quantity > 0;
                    acc[cur].isFavorite = isFavorite;
                  }
                  return acc;
                },
                {} as DessertStocks['byId'],
              ),
            };
            return newStocks;
          });
        },
      [],
    );

  const filterDessertStocks: DessertStockActions['filterVegetableStocks'] =
    useRecoilCallback(
      ({ snapshot, set }) =>
        async () => {
          const selectFilterOptions = await snapshot.getPromise(
            selectFilterOptionsState,
          );
          const dessertStocksIds = await snapshot.getPromise(
            dessertStocksIdsState,
          );
          set(dessertStocksState, (prev) => {
            const sortedIds = filterDessertStock({
              dessertStocks: prev,
              originalIds: dessertStocksIds,
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

  const updateIsFavorite: DessertStockActions['updateIsFavorite'] =
    useRecoilCallback(
      ({ set }) =>
        ({ id: dessertId, isFavorite }) => {
          set(dessertStocksState, (prev) => {
            const newStocks: DessertStocks = {
              ids: [...prev.ids],
              byId: prev.ids.reduce(
                (acc, cur) => {
                  acc[cur] = { ...prev.byId[cur] };
                  if (cur === dessertId) {
                    acc[cur].isFavorite = isFavorite;
                  }
                  return acc;
                },
                {} as DessertStocks['byId'],
              ),
            };
            return newStocks;
          });
        },
      [],
    );
  return {
    increaseDessertStock,
    decreaseDessertStock,
    updateDessertStockDetail,
    filterDessertStocks,
    updateIsFavorite,
  };
};
