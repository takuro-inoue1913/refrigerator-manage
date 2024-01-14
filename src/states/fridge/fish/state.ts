import { atom, selector } from 'recoil';
import { FridgeStock } from '@src/types';

/**
 * 在庫の型
 */
export type FishStocks = {
  ids: string[];
  byId: {
    [fishId: string]: FridgeStock;
  };
};

export const fishStocksState = atom({
  key: 'fishStocksState',
  default: {
    ids: [],
    byId: {},
  } as FishStocks,
});

/**
 * 在庫IDの配列。絞り込みのために使用する想定。
 * fishStocksState と同時に更新する。
 */
export const fishStocksIdsState = atom({
  key: 'fishStocksIdsState',
  default: [] as string[],
});

export const fishStockById = selector({
  key: 'fishStockById',
  get: ({ get }) => {
    const fishStocks = get(fishStocksState);
    return (fishId: string) => fishStocks.byId[fishId];
  },
});
