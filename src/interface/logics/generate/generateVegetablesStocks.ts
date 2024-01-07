import { GetVegetableMasterAndUnitAndStocksQuery } from '@src/interface/__generated__/graphql';
import { VegetablesStocks } from '@src/states/fridge/vegetables';
import { getIncrementalUnit } from '@src/utils/logics/getIncrementalUnit';
import dayjs from 'dayjs';

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
        incrementalUnit:
          cur.vegetable_master_vegetable_stocks?.incremental_unit ??
          getIncrementalUnit(cur.vegetable_master_unit_master?.unit_name ?? ''),
        expirationDate:
          cur.vegetable_master_vegetable_stocks?.expiration_date ??
          dayjs()
            .add(cur.default_expiration_period, 'day')
            .format('YYYY-MM-DD'),
        memo: cur.vegetable_master_vegetable_stocks?.memo ?? '',
        isFavorite: cur.vegetable_master_vegetable_stocks?.is_favorite ?? false,
        defaultExpirationPeriod: cur.default_expiration_period,
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
