import { atom, selector } from 'recoil';
import { FridgeStock, NormalizedArray } from '@src/types';

/**
 * 在庫の型
 */
export type StapleFoodStocks = NormalizedArray<FridgeStock>;

export const stapleFoodStocksState = atom({
  key: 'stapleFoodStocksState',
  default: {
    ids: [],
    byId: {},
  } as StapleFoodStocks,
});

/**
 * 在庫IDの配列。絞り込みのために使用する想定。
 * stapleFoodStocksState と同時に更新する。
 */
export const stapleFoodStocksIdsState = atom({
  key: 'stapleFoodStocksIdsState',
  default: [] as string[],
});

export const stapleFoodStockById = selector({
  key: 'stapleFoodStockById',
  get: ({ get }) => {
    const stapleFoodStocks = get(stapleFoodStocksState);
    return (stapleFoodId: string) => stapleFoodStocks.byId[stapleFoodId];
  },
});
