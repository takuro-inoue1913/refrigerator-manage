import { GetAllDessertMasterAndUnitAndStocksQuery } from '@src/interface/__generated__/graphql';
import { DessertStocks } from '@src/states/fridge/dessert';
import { getIncrementalUnit } from '@src/utils/logics/getIncrementalUnit';
import dayjs from 'dayjs';

type CommonDessertMasterType = Omit<
  GetAllDessertMasterAndUnitAndStocksQuery['GetDessertMasterAndUnitAndStocks'][0],
  '__typename'
>;

/**
 * マスタデータと在庫から在庫のオブジェクトを生成する。
 */
export const generateDessertStocks = (
  data: GetAllDessertMasterAndUnitAndStocksQuery,
): DessertStocks => {
  const ids: string[] = [];
  const dessertMasterData = convertDessertMasterData(
    'dessertMaster',
    data.GetDessertMasterAndUnitAndStocks,
  );

  const customDessertMasterData = convertDessertMasterData(
    'customDessertMaster',
    data.GetCustomDessertMasterAndUnitAndStocks,
  );

  ids.push(...Object.keys(dessertMasterData).map((id) => id));
  ids.push(...Object.keys(customDessertMasterData).map((id) => id));

  const byId = {
    ...dessertMasterData,
    ...customDessertMasterData,
  };

  return {
    ids,
    byId,
  };
};

const convertDessertMasterData = (
  __typename: 'dessertMaster' | 'customDessertMaster',
  masterData:
    | GetAllDessertMasterAndUnitAndStocksQuery['GetCustomDessertMasterAndUnitAndStocks']
    | GetAllDessertMasterAndUnitAndStocksQuery['GetDessertMasterAndUnitAndStocks'],
): DessertStocks['byId'] => {
  if (masterData.length === 0) {
    return {} as DessertStocks['byId'];
  }

  const commonData = [...masterData] as CommonDessertMasterType[];
  return commonData.reduce(
    (acc, cur) => {
      acc[cur.dessert_id] = {
        id: cur.dessert_id,
        name: cur.dessert_name,
        displayName: cur.display_name,
        imageUri: cur.image_uri,
        // MEMO: 単位は必ず存在するため、! をつけている
        unitId: cur.dessert_master_unit_master!.unit_id,
        // MEMO: 単位は必ず存在するため、! をつけている
        unitName: cur.dessert_master_unit_master!.unit_name,
        hasStock:
          cur.dessert_master_dessert_stocks !== undefined &&
          cur.dessert_master_dessert_stocks !== null &&
          cur.dessert_master_dessert_stocks.expiration_date !== null &&
          cur.dessert_master_dessert_stocks.quantity > 0,
        stockId: cur.dessert_master_dessert_stocks?.stock_id ?? null,
        quantity: cur.dessert_master_dessert_stocks?.quantity ?? 0,
        incrementalUnit:
          cur.dessert_master_dessert_stocks?.incremental_unit ??
          getIncrementalUnit(cur.dessert_master_unit_master?.unit_name ?? ''),
        expirationDate:
          cur.dessert_master_dessert_stocks?.expiration_date ??
          dayjs()
            .add(cur.default_expiration_period, 'day')
            .format('YYYY-MM-DD'),
        memo: cur.dessert_master_dessert_stocks?.memo ?? '',
        isFavorite: cur.dessert_master_dessert_stocks?.is_favorite ?? false,
        defaultExpirationPeriod: cur.default_expiration_period,
        isCustomMaster: __typename === 'customDessertMaster',
      };
      return acc;
    },
    {} as DessertStocks['byId'],
  );
};
