import { GetAllOtherMasterAndUnitAndStocksQuery } from '@src/interface/__generated__/graphql';
import { OtherStocks } from '@src/states/fridge/other';
import { getIncrementalUnit } from '@src/utils/logics/getIncrementalUnit';
import dayjs from 'dayjs';

type CommonOtherMasterType = Omit<
  GetAllOtherMasterAndUnitAndStocksQuery['GetOtherMasterAndUnitAndStocks'][0],
  '__typename'
>;

/**
 * マスタデータと在庫から在庫のオブジェクトを生成する。
 */
export const generateOtherStocks = (
  data: GetAllOtherMasterAndUnitAndStocksQuery,
): OtherStocks => {
  const ids: string[] = [];
  const otherMasterData = convertOtherMasterData(
    'otherMaster',
    data.GetOtherMasterAndUnitAndStocks,
  );

  const customOtherMasterData = convertOtherMasterData(
    'customOtherMaster',
    data.GetCustomOtherMasterAndUnitAndStocks,
  );

  ids.push(...Object.keys(otherMasterData).map((id) => id));
  ids.push(...Object.keys(customOtherMasterData).map((id) => id));

  const byId = {
    ...otherMasterData,
    ...customOtherMasterData,
  };

  return {
    ids,
    byId,
  };
};

const convertOtherMasterData = (
  __typename: 'otherMaster' | 'customOtherMaster',
  masterData:
    | GetAllOtherMasterAndUnitAndStocksQuery['GetCustomOtherMasterAndUnitAndStocks']
    | GetAllOtherMasterAndUnitAndStocksQuery['GetOtherMasterAndUnitAndStocks'],
): OtherStocks['byId'] => {
  if (masterData.length === 0) {
    return {} as OtherStocks['byId'];
  }

  const commonData = [...masterData] as CommonOtherMasterType[];
  return commonData.reduce(
    (acc, cur) => {
      acc[cur.other_id] = {
        id: cur.other_id,
        name: cur.other_name,
        displayName: cur.display_name,
        imageUri: cur.image_uri,
        // MEMO: 単位は必ず存在するため、! をつけている
        unitId: cur.other_master_unit_master!.unit_id,
        // MEMO: 単位は必ず存在するため、! をつけている
        unitName: cur.other_master_unit_master!.unit_name,
        hasStock:
          cur.other_master_other_stocks !== undefined &&
          cur.other_master_other_stocks !== null &&
          cur.other_master_other_stocks.expiration_date !== null &&
          cur.other_master_other_stocks.quantity > 0,
        stockId: cur.other_master_other_stocks?.stock_id ?? null,
        quantity: cur.other_master_other_stocks?.quantity ?? 0,
        incrementalUnit:
          cur.other_master_other_stocks?.incremental_unit ??
          getIncrementalUnit(cur.other_master_unit_master?.unit_name ?? ''),
        expirationDate:
          cur.other_master_other_stocks?.expiration_date ??
          dayjs()
            .add(cur.default_expiration_period, 'day')
            .format('YYYY-MM-DD'),
        memo: cur.other_master_other_stocks?.memo ?? '',
        isFavorite: cur.other_master_other_stocks?.is_favorite ?? false,
        defaultExpirationPeriod: cur.default_expiration_period,
      };
      return acc;
    },
    {} as OtherStocks['byId'],
  );
};
