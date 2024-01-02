import { atom, selector } from 'recoil';

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

export const vegetableStockSelector = selector({
  key: 'vegetableStockSelector',
  get: ({ get }) => {
    const vegetablesStocks = get(vegetablesStocksState);
    return (vegetableId: number) => {
      return vegetablesStocks.byId[vegetableId];
    };
  },
  set: ({ set }) => {
    return (vegetableId: number, quantity: number) => {
      set(vegetablesStocksState, (prev) => {
        const _vegetablesStocks = { ...prev };
        const _hasStock =
          _vegetablesStocks.byId[vegetableId].quantity + quantity > 0;
        _vegetablesStocks.byId[vegetableId].hasStock = _hasStock;
        // MEMO: 0 以下になる場合は、在庫数を 0 にする。
        _vegetablesStocks.byId[vegetableId].quantity = _hasStock
          ? _vegetablesStocks.byId[vegetableId].quantity + quantity
          : 0;
        return _vegetablesStocks;
      });
    };
  },
});
