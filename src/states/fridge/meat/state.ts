import { atom, selector } from 'recoil';

/**
 * 肉在庫の型
 */
export type MeatStocks = {
  ids: number[];
  byId: {
    [meatId: number]: {
      /** 肉ID */
      meatId: number;
      /** 肉名 */
      meatName: string;
      /** 肉表示名 */
      meatDisplayName: string;
      /** 肉画像URI */
      imageUri: string;
      /** 単位ID */
      unitId: number;
      /** 単位名 */
      unitName: string;
      /** 在庫があるかどうか */
      hasStock: boolean;
      /** 在庫ID */
      stockId: number | null;
      /** 在庫数 */
      quantity: number;
      /** 増減単位 */
      incrementalUnit: number;
      /** 賞味期限日 */
      expirationDate: string;
      /** メモ */
      memo: string;
    };
  };
};

export const meatStocksState = atom({
  key: 'meatStocksState',
  default: {
    ids: [],
    byId: {},
  } as MeatStocks,
});

export const meatStockById = selector({
  key: 'meatStockById',
  get: ({ get }) => {
    const meatStocks = get(meatStocksState);
    return (meatId: number) => meatStocks.byId[meatId];
  },
});
