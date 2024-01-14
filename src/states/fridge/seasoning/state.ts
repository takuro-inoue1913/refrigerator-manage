import { atom, selector } from 'recoil';
import { FridgeStock } from '@src/types';

/**
 * 在庫の型
 */
export type SeasoningStocks = {
  ids: string[];
  byId: {
    [seasoningId: string]: FridgeStock;
  };
};

export const seasoningStocksState = atom({
  key: 'seasoningStocksState',
  default: {
    ids: [],
    byId: {},
  } as SeasoningStocks,
});

/**
 * 在庫IDの配列。絞り込みのために使用する想定。
 * seasoningStocksState と同時に更新する。
 */
export const seasoningStocksIdsState = atom({
  key: 'seasoningStocksIdsState',
  default: [] as string[],
});

export const seasoningStockById = selector({
  key: 'seasoningStockById',
  get: ({ get }) => {
    const seasoningStocks = get(seasoningStocksState);
    return (seasoningId: string) => seasoningStocks.byId[seasoningId];
  },
});
