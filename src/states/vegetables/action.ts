import { useRecoilCallback } from 'recoil';
import {
  VegetablesStocks,
  vegetablesStocksState,
} from '@src/states/vegetables';

type VegetableStockActions = {
  increaseVegetableStock: ({
    vegetableId,
    quantity,
  }: {
    vegetableId: number;
    quantity: number;
  }) => void;
  decreaseVegetableStock: ({
    vegetableId,
    quantity,
  }: {
    vegetableId: number;
    quantity: number;
  }) => void;
};

export const useVegetablesStockActions = () => {
  const increaseVegetableStock: VegetableStockActions['increaseVegetableStock'] =
    useRecoilCallback(
      ({ set }) =>
        ({
          vegetableId,
          quantity,
        }: {
          vegetableId: number;
          quantity: number;
        }) => {
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
        ({
          vegetableId,
          quantity,
        }: {
          vegetableId: number;
          quantity: number;
        }) => {
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

  return {
    increaseVegetableStock,
    decreaseVegetableStock,
  };
};
