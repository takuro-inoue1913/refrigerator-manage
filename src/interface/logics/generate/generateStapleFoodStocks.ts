import { GetAllStapleFoodMasterAndUnitAndStocksQuery } from '@src/interface/__generated__/graphql';
import { StapleFoodStocks } from '@src/states/fridge/stapleFood';
import { getIncrementalUnit } from '@src/utils/logics/getIncrementalUnit';
import dayjs from 'dayjs';

type CommonStapleFoodMasterType = Omit<
  GetAllStapleFoodMasterAndUnitAndStocksQuery['GetStapleFoodMasterAndUnitAndStocks'][0],
  '__typename'
>;

/**
 * マスタデータと在庫から在庫のオブジェクトを生成する。
 */
export const generateStapleFoodStocks = (
  data: GetAllStapleFoodMasterAndUnitAndStocksQuery,
): StapleFoodStocks => {
  const ids: string[] = [];
  const stapleFoodMasterData = convertStapleFoodMasterData(
    'stapleFoodMaster',
    data.GetStapleFoodMasterAndUnitAndStocks,
  );

  const customStapleFoodMasterData = convertStapleFoodMasterData(
    'customStapleFoodMaster',
    data.GetCustomStapleFoodMasterAndUnitAndStocks,
  );

  ids.push(...Object.keys(stapleFoodMasterData).map((id) => id));
  ids.push(...Object.keys(customStapleFoodMasterData).map((id) => id));

  const byId = {
    ...stapleFoodMasterData,
    ...customStapleFoodMasterData,
  };

  return {
    ids,
    byId,
  };
};

const convertStapleFoodMasterData = (
  __typename: 'stapleFoodMaster' | 'customStapleFoodMaster',
  masterData:
    | GetAllStapleFoodMasterAndUnitAndStocksQuery['GetCustomStapleFoodMasterAndUnitAndStocks']
    | GetAllStapleFoodMasterAndUnitAndStocksQuery['GetStapleFoodMasterAndUnitAndStocks'],
): StapleFoodStocks['byId'] => {
  if (masterData.length === 0) {
    return {} as StapleFoodStocks['byId'];
  }

  const commonData = [...masterData] as CommonStapleFoodMasterType[];
  return commonData.reduce(
    (acc, cur) => {
      acc[cur.staple_food_id] = {
        id: cur.staple_food_id,
        name: cur.staple_food_name,
        displayName: cur.display_name,
        imageUri: cur.image_uri,
        // MEMO: 単位は必ず存在するため、! をつけている
        unitId: cur.staple_food_master_unit_master!.unit_id,
        // MEMO: 単位は必ず存在するため、! をつけている
        unitName: cur.staple_food_master_unit_master!.unit_name,
        hasStock:
          cur.staple_food_master_staple_food_stocks !== undefined &&
          cur.staple_food_master_staple_food_stocks !== null &&
          cur.staple_food_master_staple_food_stocks.expiration_date !== null &&
          cur.staple_food_master_staple_food_stocks.quantity > 0,
        stockId: cur.staple_food_master_staple_food_stocks?.stock_id ?? null,
        quantity: cur.staple_food_master_staple_food_stocks?.quantity ?? 0,
        incrementalUnit:
          cur.staple_food_master_staple_food_stocks?.incremental_unit ??
          getIncrementalUnit(
            cur.staple_food_master_unit_master?.unit_name ?? '',
          ),
        expirationDate:
          cur.staple_food_master_staple_food_stocks?.expiration_date ??
          dayjs()
            .add(cur.default_expiration_period, 'day')
            .format('YYYY-MM-DD'),
        memo: cur.staple_food_master_staple_food_stocks?.memo ?? '',
        isFavorite:
          cur.staple_food_master_staple_food_stocks?.is_favorite ?? false,
        defaultExpirationPeriod: cur.default_expiration_period,
      };
      return acc;
    },
    {} as StapleFoodStocks['byId'],
  );
};
