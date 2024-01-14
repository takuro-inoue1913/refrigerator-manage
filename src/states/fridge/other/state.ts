import { atom, selector } from 'recoil';
import { FridgeStock } from '@src/types';

/**
 * 在庫の型
 */
export type OtherStocks = {
  ids: string[];
  byId: {
    [otherId: string]: FridgeStock;
  };
};

export const otherStocksState = atom({
  key: 'otherStocksState',
  default: {
    ids: [],
    byId: {},
  } as OtherStocks,
});

/**
 * 在庫IDの配列。絞り込みのために使用する想定。
 * otherStocksState と同時に更新する。
 */
export const otherStocksIdsState = atom({
  key: 'otherStocksIdsState',
  default: [] as string[],
});

export const otherStockById = selector({
  key: 'otherStockById',
  get: ({ get }) => {
    const otherStocks = get(otherStocksState);
    return (otherId: string) => otherStocks.byId[otherId];
  },
});
