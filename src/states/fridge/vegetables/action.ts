import { useRecoilCallback } from 'recoil';
import {
  VegetablesStocks,
  vegetablesStocksIdsState,
  vegetablesStocksState,
} from '@src/states/fridge/vegetables/state';
import { selectFilterOptionsState } from '@src/states/fridge/state';
import { filterVegetablesStock } from '@src/states/fridge/vegetables/logics/filterVegetablesStock';

type VegetableStockActions = {
  increaseVegetableStock: ({
    id,
    quantity,
  }: {
    /** 増やす野菜のID */
    id: string;
    /** 増やす数を指定。 */
    quantity: number;
  }) => void;
  decreaseVegetableStock: ({
    id,
    quantity,
  }: {
    /** 減らす野菜のID */
    id: string;
    /** 減らす数を指定。 */
    quantity: number;
  }) => void;
  updateVegetableStockDetail: ({
    id,
    quantity,
    incrementalUnit,
    expirationDate,
    memo,
    isFavorite,
  }: {
    /** 更新する野菜のID */
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
    /** 更新する野菜のID */
    id: string;
    /** 更新するお気に入りの状態を指定。 */
    isFavorite: boolean;
  }) => void;
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
          isFavorite,
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
                    acc[cur].isFavorite = isFavorite;
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

  const filterVegetableStocks: VegetableStockActions['filterVegetableStocks'] =
    useRecoilCallback(
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

  const updateIsFavorite: VegetableStockActions['updateIsFavorite'] =
    useRecoilCallback(
      ({ set }) =>
        ({
          id: vegetableId,
          isFavorite,
        }: {
          id: string;
          isFavorite: boolean;
        }) => {
          set(vegetablesStocksState, (prev) => {
            const newStocks: VegetablesStocks = {
              ids: [...prev.ids],
              byId: prev.ids.reduce(
                (acc, cur) => {
                  acc[cur] = { ...prev.byId[cur] };
                  if (cur === vegetableId) {
                    acc[cur].isFavorite = isFavorite;
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

  return {
    increaseVegetableStock,
    decreaseVegetableStock,
    updateVegetableStockDetail,
    filterVegetableStocks,
    updateIsFavorite,
  };
};
