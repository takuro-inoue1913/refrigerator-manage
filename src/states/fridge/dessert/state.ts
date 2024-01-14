import { atom, selector } from 'recoil';
import { FridgeStock } from '@src/types';

/**
 * 在庫の型
 */
export type DessertStocks = {
  ids: string[];
  byId: {
    [dessertId: string]: FridgeStock;
  };
};

export const dessertStocksState = atom({
  key: 'dessertStocksState',
  default: {
    ids: [],
    byId: {},
  } as DessertStocks,
});

/**
 * 在庫IDの配列。絞り込みのために使用する想定。
 * dessertStocksState と同時に更新する。
 */
export const dessertStocksIdsState = atom({
  key: 'dessertStocksIdsState',
  default: [] as string[],
});

export const dessertStockById = selector({
  key: 'dessertStockById',
  get: ({ get }) => {
    const dessertStocks = get(dessertStocksState);
    return (dessertId: string) => dessertStocks.byId[dessertId];
  },
});
