import { atom, selector } from 'recoil';
import { FridgeStock } from '@src/types';

/**
 * 在庫の型
 */
export type ProteinSourceStocks = {
  ids: string[];
  byId: {
    [proteinSourceId: string]: FridgeStock;
  };
};

export const proteinSourceStocksState = atom({
  key: 'proteinSourceStocksState',
  default: {
    ids: [],
    byId: {},
  } as ProteinSourceStocks,
});

/**
 * 在庫IDの配列。絞り込みのために使用する想定。
 * proteinSourceStocksState と同時に更新する。
 */
export const proteinSourceStocksIdsState = atom({
  key: 'proteinSourceStocksIdsState',
  default: [] as string[],
});

export const proteinSourceStockById = selector({
  key: 'proteinSourceStockById',
  get: ({ get }) => {
    const proteinSourceStocks = get(proteinSourceStocksState);
    return (proteinSourceId: string) =>
      proteinSourceStocks.byId[proteinSourceId];
  },
});
