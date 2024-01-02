import { atom } from 'recoil';

/**
 * 野菜在庫の型
 */
export type VegetablesStocks = {
  ids: number[];
  byId: {
    [vegetableId: number]: {
      /** 野菜ID */
      vegetableId: number;
      /** 野菜名 */
      vegetableName: string;
      /** 野菜表示名 */
      vegetableDisplayName: string;
      /** 野菜画像URI */
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
    };
  };
};

export const vegetablesStocksState = atom({
  key: 'vegetablesStocksState',
  default: {
    ids: [],
    byId: {},
  } as VegetablesStocks,
});
