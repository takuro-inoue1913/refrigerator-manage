import { GetAllSeasoningMasterAndUnitAndStocksQuery } from '@src/interface/__generated__/graphql';
import { SeasoningStocks } from '@src/states/fridge/seasoning';
import { getIncrementalUnit } from '@src/utils/logics/getIncrementalUnit';
import dayjs from 'dayjs';

type CommonSeasoningMasterType = Omit<
  GetAllSeasoningMasterAndUnitAndStocksQuery['GetSeasoningMasterAndUnitAndStocks'][0],
  '__typename'
>;

/**
 * マスタデータと在庫から在庫のオブジェクトを生成する。
 */
export const generateSeasoningStocks = (
  data: GetAllSeasoningMasterAndUnitAndStocksQuery,
): SeasoningStocks => {
  const ids: string[] = [];
  const seasoningMasterData = convertSeasoningMasterData(
    'seasoningMaster',
    data.GetSeasoningMasterAndUnitAndStocks,
  );

  const customSeasoningMasterData = convertSeasoningMasterData(
    'customSeasoningMaster',
    data.GetCustomSeasoningMasterAndUnitAndStocks,
  );

  ids.push(...Object.keys(seasoningMasterData).map((id) => id));
  ids.push(...Object.keys(customSeasoningMasterData).map((id) => id));

  const byId = {
    ...seasoningMasterData,
    ...customSeasoningMasterData,
  };

  return {
    ids,
    byId,
  };
};

const convertSeasoningMasterData = (
  __typename: 'seasoningMaster' | 'customSeasoningMaster',
  masterData:
    | GetAllSeasoningMasterAndUnitAndStocksQuery['GetCustomSeasoningMasterAndUnitAndStocks']
    | GetAllSeasoningMasterAndUnitAndStocksQuery['GetSeasoningMasterAndUnitAndStocks'],
): SeasoningStocks['byId'] => {
  if (masterData.length === 0) {
    return {} as SeasoningStocks['byId'];
  }

  const commonData = [...masterData] as CommonSeasoningMasterType[];
  return commonData.reduce(
    (acc, cur) => {
      acc[cur.seasoning_id] = {
        id: cur.seasoning_id,
        name: cur.seasoning_name,
        displayName: cur.display_name,
        imageUri: cur.image_uri,
        // MEMO: 単位は必ず存在するため、! をつけている
        unitId: cur.seasoning_master_unit_master!.unit_id,
        // MEMO: 単位は必ず存在するため、! をつけている
        unitName: cur.seasoning_master_unit_master!.unit_name,
        hasStock:
          cur.seasoning_master_seasoning_stocks !== undefined &&
          cur.seasoning_master_seasoning_stocks !== null &&
          cur.seasoning_master_seasoning_stocks.expiration_date !== null &&
          cur.seasoning_master_seasoning_stocks.quantity > 0,
        stockId: cur.seasoning_master_seasoning_stocks?.stock_id ?? null,
        quantity: cur.seasoning_master_seasoning_stocks?.quantity ?? 0,
        incrementalUnit:
          cur.seasoning_master_seasoning_stocks?.incremental_unit ??
          getIncrementalUnit(cur.seasoning_master_unit_master?.unit_name ?? ''),
        expirationDate:
          cur.seasoning_master_seasoning_stocks?.expiration_date ??
          dayjs()
            .add(cur.default_expiration_period, 'day')
            .format('YYYY-MM-DD'),
        memo: cur.seasoning_master_seasoning_stocks?.memo ?? '',
        isFavorite: cur.seasoning_master_seasoning_stocks?.is_favorite ?? false,
        defaultExpirationPeriod: cur.default_expiration_period,
      };
      return acc;
    },
    {} as SeasoningStocks['byId'],
  );
};
