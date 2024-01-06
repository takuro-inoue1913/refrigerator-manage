import { useRecoilCallback } from 'recoil';
import { MeatStocks, meatStocksState } from '@src/states/fridge/meat/state';

type MeatStockActions = {
  increaseMeatStock: ({
    id,
    quantity,
  }: {
    /** 増やす肉ID */
    id: number;
    /** 増やす数を指定。 */
    quantity: number;
  }) => void;
  decreaseMeatStock: ({
    id,
    quantity,
  }: {
    /** 減らす肉ID */
    id: number;
    /** 減らす数を指定。 */
    quantity: number;
  }) => void;
  updateMeatStockDetail: ({
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
        ({ id: meatId, quantity, incrementalUnit, expirationDate, memo }) => {
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

  return {
    increaseMeatStock,
    decreaseMeatStock,
    updateMeatStockDetail,
  };
};
