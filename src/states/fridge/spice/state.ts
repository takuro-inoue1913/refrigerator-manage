import { atom, selector } from 'recoil';
import { FridgeStock, NormalizedArray } from '@src/types';

/**
 * 在庫の型
 */
export type SpiceStocks = NormalizedArray<FridgeStock>;

export const spiceStocksState = atom({
  key: 'spiceStocksState',
  default: {
    ids: [],
    byId: {},
  } as SpiceStocks,
});

/**
 * 在庫IDの配列。絞り込みのために使用する想定。
 * spiceStocksState と同時に更新する。
 */
export const spiceStocksIdsState = atom({
  key: 'spiceStocksIdsState',
  default: [] as string[],
});

export const spiceStockById = selector({
  key: 'spiceStockById',
  get: ({ get }) => {
    const spiceStocks = get(spiceStocksState);
    return (spiceId: string) => spiceStocks.byId[spiceId];
  },
});
