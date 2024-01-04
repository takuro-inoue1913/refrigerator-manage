import { GetMeatMasterAndUnitAndStocksQuery } from '@src/interface/__generated__/graphql';
import { MeatStocks } from '@src/states/meat';

/**
 * 肉マスタと肉在庫から肉在庫のオブジェクトを生成する。
 */
export const generateMeatStocks = (
  data: GetMeatMasterAndUnitAndStocksQuery,
): MeatStocks => {
  const ids: number[] = [];
  const byId = data.meat_master.reduce(
    (acc, cur) => {
      acc[cur.meat_id] = {
        meatId: cur.meat_id,
        meatName: cur.meat_name,
        meatDisplayName: cur.display_name,
        imageUri: cur.image_uri,
        // MEMO: 単位は必ず存在するため、! をつけている
        unitId: cur.meat_master_unit_master!.unit_id,
        // MEMO: 単位は必ず存在するため、! をつけている
        unitName: cur.meat_master_unit_master!.unit_name,
        hasStock:
          cur.meat_master_meat_stocks !== undefined &&
          cur.meat_master_meat_stocks !== null &&
          cur.meat_master_meat_stocks.quantity > 0,
        stockId: cur.meat_master_meat_stocks?.stock_id ?? null,
        quantity: cur.meat_master_meat_stocks?.quantity ?? 0,
        incrementalUnit: cur.meat_master_meat_stocks?.incremental_unit ?? 1,
      };
      ids.push(cur.meat_id);
      return acc;
    },
    {} as MeatStocks['byId'],
  );

  return {
    ids,
    byId,
  };
};
