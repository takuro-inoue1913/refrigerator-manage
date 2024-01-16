import { GetAllSpiceMasterAndUnitAndStocksQuery } from '@src/interface/__generated__/graphql';
import { SpiceStocks } from '@src/states/fridge/spice';
import { getIncrementalUnit } from '@src/utils/logics/getIncrementalUnit';
import dayjs from 'dayjs';

type CommonSpiceMasterType = Omit<
  GetAllSpiceMasterAndUnitAndStocksQuery['GetSpiceMasterAndUnitAndStocks'][0],
  '__typename'
>;

/**
 * マスタデータと在庫から在庫のオブジェクトを生成する。
 */
export const generateSpiceStocks = (
  data: GetAllSpiceMasterAndUnitAndStocksQuery,
): SpiceStocks => {
  const ids: string[] = [];
  const spiceMasterData = convertSpiceMasterData(
    'spiceMaster',
    data.GetSpiceMasterAndUnitAndStocks,
  );

  const customSpiceMasterData = convertSpiceMasterData(
    'customSpiceMaster',
    data.GetCustomSpiceMasterAndUnitAndStocks,
  );

  ids.push(...Object.keys(spiceMasterData).map((id) => id));
  ids.push(...Object.keys(customSpiceMasterData).map((id) => id));

  const byId = {
    ...spiceMasterData,
    ...customSpiceMasterData,
  };

  return {
    ids,
    byId,
  };
};

const convertSpiceMasterData = (
  __typename: 'spiceMaster' | 'customSpiceMaster',
  masterData:
    | GetAllSpiceMasterAndUnitAndStocksQuery['GetCustomSpiceMasterAndUnitAndStocks']
    | GetAllSpiceMasterAndUnitAndStocksQuery['GetSpiceMasterAndUnitAndStocks'],
): SpiceStocks['byId'] => {
  if (masterData.length === 0) {
    return {} as SpiceStocks['byId'];
  }

  const commonData = [...masterData] as CommonSpiceMasterType[];
  return commonData.reduce(
    (acc, cur) => {
      acc[cur.spice_id] = {
        id: cur.spice_id,
        name: cur.spice_name,
        displayName: cur.display_name,
        imageUri: cur.image_uri,
        // MEMO: 単位は必ず存在するため、! をつけている
        unitId: cur.spice_master_unit_master!.unit_id,
        // MEMO: 単位は必ず存在するため、! をつけている
        unitName: cur.spice_master_unit_master!.unit_name,
        hasStock:
          cur.spice_master_spice_stocks !== undefined &&
          cur.spice_master_spice_stocks !== null &&
          cur.spice_master_spice_stocks.expiration_date !== null &&
          cur.spice_master_spice_stocks.quantity > 0,
        stockId: cur.spice_master_spice_stocks?.stock_id ?? null,
        quantity: cur.spice_master_spice_stocks?.quantity ?? 0,
        incrementalUnit:
          cur.spice_master_spice_stocks?.incremental_unit ??
          getIncrementalUnit(cur.spice_master_unit_master?.unit_name ?? ''),
        expirationDate:
          cur.spice_master_spice_stocks?.expiration_date ??
          dayjs()
            .add(cur.default_expiration_period, 'day')
            .format('YYYY-MM-DD'),
        memo: cur.spice_master_spice_stocks?.memo ?? '',
        isFavorite: cur.spice_master_spice_stocks?.is_favorite ?? false,
        defaultExpirationPeriod: cur.default_expiration_period,
        isCustomMaster: __typename === 'customSpiceMaster',
      };
      return acc;
    },
    {} as SpiceStocks['byId'],
  );
};
