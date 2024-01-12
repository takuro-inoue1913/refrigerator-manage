import { GetAllVegetableMasterAndUnitAndStocksQuery } from '@src/interface/__generated__/graphql';
import { VegetablesStocks } from '@src/states/fridge/vegetables';
import { getIncrementalUnit } from '@src/utils/logics/getIncrementalUnit';
import dayjs from 'dayjs';

type CommonVegetableMasterType = Omit<
  GetAllVegetableMasterAndUnitAndStocksQuery['GetVegetableMasterAndUnitAndStocks'][0],
  '__typename'
>;

/**
 * 野菜マスタと野菜在庫から野菜在庫のオブジェクトを生成する。
 * @param {GetAllVegetableMasterAndUnitAndStocksQuery} data
 */
export const generateVegetablesStocks = (
  data: GetAllVegetableMasterAndUnitAndStocksQuery,
): VegetablesStocks => {
  const ids: string[] = [];
  const vegetableMasterData = convertVegetableMasterData(
    'vegetableMaster',
    data.GetVegetableMasterAndUnitAndStocks,
  );
  const customVegetableMasterData = convertVegetableMasterData(
    'customVegetableMaster',
    data.GetCustomVegetableMasterAndUnitAndStocks,
  );
  ids.push(...Object.keys(vegetableMasterData).map((id) => id));
  ids.push(...Object.keys(customVegetableMasterData).map((id) => id));

  const byId = {
    ...vegetableMasterData,
    ...customVegetableMasterData,
  };

  return {
    ids,
    byId,
  };
};

const convertVegetableMasterData = (
  __typename: 'vegetableMaster' | 'customVegetableMaster',
  masterData:
    | GetAllVegetableMasterAndUnitAndStocksQuery['GetVegetableMasterAndUnitAndStocks']
    | GetAllVegetableMasterAndUnitAndStocksQuery['GetCustomVegetableMasterAndUnitAndStocks'],
): VegetablesStocks['byId'] => {
  if (masterData.length === 0) {
    return {} as VegetablesStocks['byId'];
  }

  const commonData = [...masterData] as CommonVegetableMasterType[];
  return commonData.reduce(
    (acc, cur) => {
      acc[cur.vegetable_id] = {
        id: cur.vegetable_id,
        name: cur.vegetable_name,
        displayName: cur.display_name,
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
      return acc;
    },
    {} as VegetablesStocks['byId'],
  );
};
