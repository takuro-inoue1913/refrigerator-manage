import { atom, selector } from 'recoil';
import { FridgeStock } from '@src/types';

/**
 * 野菜在庫の型
 */
export type VegetablesStocks = {
  ids: number[];
  byId: {
    [vegetableId: number]: FridgeStock;
  };
};

export const vegetablesStocksState = atom({
  key: 'vegetablesStocksState',
  default: {
    ids: [],
    byId: {},
  } as VegetablesStocks,
});

/**
 * 野菜在庫のIDの配列。絞り込みのために使用する想定。
 * vegetablesStocksState と同時に更新する。
 */
export const vegetablesStocksIdsState = atom({
  key: 'vegetablesStocksIdsState',
  default: [] as number[],
});

export const vegetableStockById = selector({
  key: 'vegetableStockById',
  get: ({ get }) => {
    const vegetablesStocks = get(vegetablesStocksState);
    return (vegetableId: number) => vegetablesStocks.byId[vegetableId];
  },
});
