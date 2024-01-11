import { GetAllMeatMasterAndUnitAndStocksQuery } from '@src/interface/__generated__/graphql';
import { MeatStocks } from '@src/states/fridge/meat';
import { getIncrementalUnit } from '@src/utils/logics/getIncrementalUnit';
import dayjs from 'dayjs';

type CommonMeatMasterType = Omit<
  GetAllMeatMasterAndUnitAndStocksQuery['GetMeatMasterAndUnitAndStocks'][0],
  '__typename'
>;

/**
 * 肉マスタと肉在庫から肉在庫のオブジェクトを生成する。
 */
export const generateMeatStocks = (
  data: GetAllMeatMasterAndUnitAndStocksQuery,
): MeatStocks => {
  const ids: string[] = [];
  const meatMasterData = convertMeatMasterData(
    'meatMaster',
    data.GetMeatMasterAndUnitAndStocks,
  );

  const customMeatMasterData = convertMeatMasterData(
    'customMeatMaster',
    data.GetCustomMeatMasterAndUnitAndStocks,
  );

  ids.push(...Object.keys(meatMasterData).map((id) => id));
  ids.push(...Object.keys(customMeatMasterData).map((id) => id));

  const byId = {
    ...meatMasterData,
    ...customMeatMasterData,
  };

  return {
    ids,
    byId,
  };
};

const convertMeatMasterData = (
  __typename: 'meatMaster' | 'customMeatMaster',
  masterData:
    | GetAllMeatMasterAndUnitAndStocksQuery['GetCustomMeatMasterAndUnitAndStocks']
    | GetAllMeatMasterAndUnitAndStocksQuery['GetMeatMasterAndUnitAndStocks'],
): MeatStocks['byId'] => {
  if (masterData.length === 0) {
    return {} as MeatStocks['byId'];
  }

  const commonData = [...masterData] as CommonMeatMasterType[];
  return commonData.reduce(
    (acc, cur) => {
      acc[cur.meat_id] = {
        id: cur.meat_id,
        name: cur.meat_name,
        displayName: cur.display_name,
        imageUri: cur.image_uri,
        // MEMO: 単位は必ず存在するため、! をつけている
        unitId: cur.meat_master_unit_master!.unit_id,
        // MEMO: 単位は必ず存在するため、! をつけている
        unitName: cur.meat_master_unit_master!.unit_name,
        hasStock:
          cur.meat_master_meat_stocks !== undefined &&
          cur.meat_master_meat_stocks !== null &&
          cur.meat_master_meat_stocks.expiration_date !== null &&
          cur.meat_master_meat_stocks.quantity > 0,
        stockId: cur.meat_master_meat_stocks?.stock_id ?? null,
        quantity: cur.meat_master_meat_stocks?.quantity ?? 0,
        incrementalUnit:
          cur.meat_master_meat_stocks?.incremental_unit ??
          getIncrementalUnit(cur.meat_master_unit_master?.unit_name ?? ''),
        expirationDate:
          cur.meat_master_meat_stocks?.expiration_date ??
          dayjs()
            .add(cur.default_expiration_period, 'day')
            .format('YYYY-MM-DD'),
        memo: cur.meat_master_meat_stocks?.memo ?? '',
        isFavorite: cur.meat_master_meat_stocks?.is_favorite ?? false,
        defaultExpirationPeriod: cur.default_expiration_period,
      };
      return acc;
    },
    {} as MeatStocks['byId'],
  );
};
