import { useRecoilCallback } from 'recoil';
import { MeatStocks, meatStocksState } from '@src/states/fridge/meat/state';

type MeatStockActions = {
  increaseMeatStock: ({
    meatId,
    quantity,
  }: {
    /** 増やす肉ID */
    meatId: number;
    /** 増やす数を指定。 */
    quantity: number;
  }) => void;
  decreaseMeatStock: ({
    meatId,
    quantity,
  }: {
    /** 減らす肉ID */
    meatId: number;
    /** 減らす数を指定。 */
    quantity: number;
  }) => void;
};

export const useMeatStockActions = () => {
  const increaseMeatStock: MeatStockActions['increaseMeatStock'] =
    useRecoilCallback(
      ({ set }) =>
        ({ meatId, quantity }) => {
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
        ({ meatId, quantity }) => {
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

  return {
    increaseMeatStock,
    decreaseMeatStock,
  };
};
