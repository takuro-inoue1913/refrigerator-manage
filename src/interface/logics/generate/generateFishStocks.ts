import { GetAllFishMasterAndUnitAndStocksQuery } from '@src/interface/__generated__/graphql';
import { FishStocks } from '@src/states/fridge/fish';
import { getIncrementalUnit } from '@src/utils/logics/getIncrementalUnit';
import dayjs from 'dayjs';

type CommonFishMasterType = Omit<
  GetAllFishMasterAndUnitAndStocksQuery['GetFishMasterAndUnitAndStocks'][0],
  '__typename'
>;

/**
 * マスタデータと在庫から在庫のオブジェクトを生成する。
 */
export const generateFishStocks = (
  data: GetAllFishMasterAndUnitAndStocksQuery,
): FishStocks => {
  const ids: string[] = [];
  const fishMasterData = convertFishMasterData(
    'fishMaster',
    data.GetFishMasterAndUnitAndStocks,
  );

  const customFishMasterData = convertFishMasterData(
    'customFishMaster',
    data.GetCustomFishMasterAndUnitAndStocks,
  );

  ids.push(...Object.keys(fishMasterData).map((id) => id));
  ids.push(...Object.keys(customFishMasterData).map((id) => id));

  const byId = {
    ...fishMasterData,
    ...customFishMasterData,
  };

  return {
    ids,
    byId,
  };
};

const convertFishMasterData = (
  __typename: 'fishMaster' | 'customFishMaster',
  masterData:
    | GetAllFishMasterAndUnitAndStocksQuery['GetCustomFishMasterAndUnitAndStocks']
    | GetAllFishMasterAndUnitAndStocksQuery['GetFishMasterAndUnitAndStocks'],
): FishStocks['byId'] => {
  if (masterData.length === 0) {
    return {} as FishStocks['byId'];
  }

  const commonData = [...masterData] as CommonFishMasterType[];
  return commonData.reduce(
    (acc, cur) => {
      acc[cur.fish_id] = {
        id: cur.fish_id,
        name: cur.fish_name,
        displayName: cur.display_name,
        imageUri: cur.image_uri,
        // MEMO: 単位は必ず存在するため、! をつけている
        unitId: cur.fish_master_unit_master!.unit_id,
        // MEMO: 単位は必ず存在するため、! をつけている
        unitName: cur.fish_master_unit_master!.unit_name,
        hasStock:
          cur.fish_master_fish_stocks !== undefined &&
          cur.fish_master_fish_stocks !== null &&
          cur.fish_master_fish_stocks.expiration_date !== null &&
          cur.fish_master_fish_stocks.quantity > 0,
        stockId: cur.fish_master_fish_stocks?.stock_id ?? null,
        quantity: cur.fish_master_fish_stocks?.quantity ?? 0,
        incrementalUnit:
          cur.fish_master_fish_stocks?.incremental_unit ??
          getIncrementalUnit(cur.fish_master_unit_master?.unit_name ?? ''),
        expirationDate:
          cur.fish_master_fish_stocks?.expiration_date ??
          dayjs()
            .add(cur.default_expiration_period, 'day')
            .format('YYYY-MM-DD'),
        memo: cur.fish_master_fish_stocks?.memo ?? '',
        isFavorite: cur.fish_master_fish_stocks?.is_favorite ?? false,
        defaultExpirationPeriod: cur.default_expiration_period,
      };
      return acc;
    },
    {} as FishStocks['byId'],
  );
};
