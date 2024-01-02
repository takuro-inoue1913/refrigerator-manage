import { GetVegetableMasterAndUnitAndStocksQuery } from '@src/interface/__generated__/graphql';

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

/**
 * 野菜マスタと野菜在庫から野菜在庫のオブジェクトを生成する。
 * @param {GetVegetableMasterAndUnitAndStocksQuery} data
 */
export const generateVegetablesStocks = (
  data: GetVegetableMasterAndUnitAndStocksQuery,
): VegetablesStocks => {
  const ids: number[] = [];
  const byId = data.vegetable_master.reduce(
    (acc, cur) => {
      acc[cur.vegetable_id] = {
        vegetableId: cur.vegetable_id,
        vegetableName: cur.vegetable_name,
        vegetableDisplayName: cur.display_name,
        imageUri: cur.image_uri,
        // MEMO: 野菜の単位は必ず存在するため、! をつけている
        unitId: cur.vegetable_master_unit_master!.unit_id,
        // MEMO: 野菜の単位は必ず存在するため、! をつけている
        unitName: cur.vegetable_master_unit_master!.unit_name,
        hasStock:
          cur.vegetable_master_vegetable_stocks !== undefined &&
          cur.vegetable_master_vegetable_stocks !== null &&
          cur.vegetable_master_vegetable_stocks.quantity > 0,
        stockId: cur.vegetable_master_vegetable_stocks?.stock_id ?? null,
        quantity: cur.vegetable_master_vegetable_stocks?.quantity ?? 0,
      };
      ids.push(cur.vegetable_id);
      return acc;
    },
    {} as VegetablesStocks['byId'],
  );

  return {
    ids,
    byId,
  };
};
