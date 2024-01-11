import { atom, selector } from 'recoil';
import { FridgeStock } from '@src/types';

/**
 * 肉在庫の型
 */
export type MeatStocks = {
  ids: string[];
  byId: {
    [meatId: string]: FridgeStock;
  };
};

export const meatStocksState = atom({
  key: 'meatStocksState',
  default: {
    ids: [],
    byId: {},
  } as MeatStocks,
});

/**
 * 肉在庫のIDの配列。絞り込みのために使用する想定。
 * meatStocksState と同時に更新する。
 */
export const meatStocksIdsState = atom({
  key: 'meatStocksIdsState',
  default: [] as string[],
});

export const meatStockById = selector({
  key: 'meatStockById',
  get: ({ get }) => {
    const meatStocks = get(meatStocksState);
    return (meatId: string) => meatStocks.byId[meatId];
  },
});
